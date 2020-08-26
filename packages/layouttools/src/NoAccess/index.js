import React, { useState } from 'react'
import { Button, Grid, Text } from '@chakra-ui/core'
// import { Animation } from '@test-code-1/core'
import { useToasts } from 'react-toast-notifications'
import { useMutation } from '@apollo/client'
import { ACCESS_USER_REQUEST } from './graphql/access'
import Lottie from 'react-lottie-wrapper';
import * as yoga from './animation/office-yoga/data.json'

export const NoAccess = ({ isHorizontal }) => {
  const { addToast } = useToasts()
  const [loading, setLoading] = useState(false)
  const [sendRequest] = useMutation(ACCESS_USER_REQUEST, {
    onCompleted: data => {
      setLoading(false)
      addToast('Request Send Successfully', { appearance: 'success', autoDismiss: true })
    }
  })

  const handleRequest = async () => {
    setLoading(true)
    await sendRequest({
      variables: {
        key: process.env.NEXT_PUBLIC_MODULE_KEY
      }
    })
  }

  const TextLayout = ({ children }) => {
    return <Grid>
      <Grid gap='2' textAlign='center'>
        <Text fontSize='3xl'>Oops.....</Text>
        <Text fontSize='2xl'>Sorry, It seems you don't have access to this page :(</Text>
      </Grid>
      {children}
      <Grid gap='2' textAlign='center'>
        <Text fontSize='1xl'>But don't worry, luckily you can ask for access by clicking the button bellow</Text>
        <Grid justifyContent='center'>
          <Button isLoading={loading} onClick={() => handleRequest()}>Request Access</Button>
        </Grid>
        <Text fontSize='1xl'>See you later :)</Text>
      </Grid>
    </Grid>
  }

  const AnimationLayout = () => {
    return <Grid justifyContent='center' alignItems='center'>
      {/*<Animation autoplay loop name='office-yoga' height={400} width={400}/>*/}
      <Lottie
        height={400}
        width={400}
        isClickToPauseDisabled
        options={{
          loop: true,
          autoplay: true,
          animationData: yoga.default,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
      />
    </Grid>
  }

  return !isHorizontal ?
    <Grid h='calc(100vh - 56px)' justifyContent='center' alignItems='center'>
    <TextLayout>
      <AnimationLayout />
    </TextLayout>
    </Grid>:
    <Grid templateColumns={`1fr 2fr`} h='calc(100vh - 56px)' justifyContent='center' alignItems='center'>
      <AnimationLayout />
      <TextLayout/>
    </Grid>
}
