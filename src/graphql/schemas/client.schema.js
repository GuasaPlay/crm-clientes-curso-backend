import { gql } from 'apollo-server-express'

export default gql`
   type Query {
      getClients(search: String): ClientQR!
   }

   type Mutation {
      createClient(client: ClientInput!): ClientMR!
      updateClient(clientId: ID!, client: ClientInput!): ClientMR!
      deleteClient(clientId: ID!): ClientMR!
   }

   type Client {
      id: ID!
      name: String!
      email: String
      company: String
      phone: String
   }

   input ClientInput {
      name: String!
      email: String
      company: String
      phone: String
   }

   type ClientQR implements QueryResponse {
      code: String!
      success: Boolean!
      message: String!
      clients: [Client]!
   }

   type ClientMR implements MutationResponse {
      code: String!
      success: Boolean!
      message: String!
      client: Client
   }
`
