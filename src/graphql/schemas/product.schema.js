import { gql } from 'apollo-server-express'

export default gql`
   type Query {
      getProducts: ProductQR!
   }

   type Mutation {
      createProduct(product: ProductInput!): ProductMR!
      updateProduct(productId: ID!, product: ProductInput!): ProductMR!
      deleteProduct(productId: ID!): ProductMR!
   }

   type Product {
      id: ID!
      name: String!
      stock: Int
      price: Float!
   }

   input ProductInput {
      name: String!
      stock: Int
      price: Float!
   }

   type ProductQR implements QueryResponse {
      code: String!
      success: Boolean!
      message: String!
      products: [Product]!
   }

   type ProductMR implements MutationResponse {
      code: String!
      success: Boolean!
      message: String!
      product: Product
   }
`
