import { useState } from 'react'
import { Comet } from '@codecraftkit/helpers'
import { useQuery } from '@apollo/client'

export const useTypeAHead = ({path, field, getAllCometData, QUERY, collection, customGet, customSend}) => {
  const { refetch } = QUERY? useQuery(QUERY, { ssr: false, skip: true, fetchPolicy: 'network-only' }):{}
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])

  const callTypeAHead = async (search, itemId) => {
    return QUERY ? getCallGQl(search, itemId) : getCallComet(search, itemId)
  }

  /**            With Comet              **/
  const getCallComet = async (search, userId) => {
    try {
      setLoading(true)
      const params = customSend? customSend(search, userId) : { fields: [], search: userId || search }
      const res = await Comet.call(path, params)
      setLoading(false)
      if (res) {
        if (customGet) {
          return customGet(res)
        } else if (getAllCometData) {
          return res.data
        } else {
          if (field) {
            const isArray = Array.isArray(res?.[field])
            if (isArray) {
              return res?.[field]
            } else {
              const isArrayData = Array.isArray(res?.data?.[field])
              return isArrayData ? res?.data?.[field] : []
            }
          } else {
            const isArray = Array.isArray(res)
            if (isArray) {
              return res
            } else {
              const isArrayData = Array.isArray(res?.data)
              return isArrayData? res.data : []
            }
          }
        }
      }
    } catch
      (e) {
      setLoading(false)
      setError(e)
    }
  }

  /**              with Gql                  **/
  const getCallGQl = async (search, userId) => {
    try {
      setLoading(true)
      const params = customSend? customSend(search, userId) : { search, _id: userId }
      const res = await refetch(params)
      setLoading(false)

      return customGet? customGet(res) : res?.data?.[collection]
    } catch (e) {
      setLoading(false)
      setError(e)
    }
  }

  return [
    callTypeAHead,
    loading,
    error
  ]
}