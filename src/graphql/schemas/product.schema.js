import { gql } from 'apollo-server-express'

export default gql`
   type Query {
      getProduct: String
   }
   type Product {
      name: String
   }
`
