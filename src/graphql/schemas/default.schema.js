import { gql } from 'apollo-server-core'

export default gql`
   interface QueryResponse {
      code: String!
      success: Boolean!
      message: String!
   }
   interface MutationResponse {
      code: String!
      success: Boolean!
      message: String!
   }
   enum StatusOrderType {
      PENDING
      CANCELED
      DELIVERED
   }
`
