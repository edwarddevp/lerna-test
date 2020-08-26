import gql from 'graphql-tag'

export const ACCESS_USER_REQUEST = gql`
    mutation S_setAccessRequest($key: String) {
        S_setAccessRequest(key: $key)
    }
`
