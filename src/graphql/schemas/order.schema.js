import { gql } from 'apollo-server-express'

export default gql`
   type Query {
      getOrders: OrdersQR!
   }

   type Mutation {
      createOrder(order: OrderInput!): OrderMR!
      dispatchOrder(orderId: ID!): OrderMR!
      cancelOrder(orderId: ID!): OrderMR!
   }

   type Order {
      id: ID!
      clientId: ID!
      client: Client
      orderDetail: [OrderDetail]!
      orderStatus: StatusOrderType!
      totalPay: Float!
   }

   type OrderDetail {
      productId: ID!
      productName: String!
      productQuantity: Int!
      productPrice: Float!
   }

   input OrderInput {
      clientId: ID!
      orderDetail: [OrderDetailInput!]!
      orderStatus: StatusOrderType!
      totalPay: Float!
   }

   input OrderDetailInput {
      productId: ID!
      productName: String!
      productQuantity: Int!
      productPrice: Float!
   }

   type OrdersQR implements QueryResponse {
      code: String!
      success: Boolean!
      message: String!
      orders: [Order]!
   }

   type OrderMR implements MutationResponse {
      code: String!
      success: Boolean!
      message: String!
      order: Order
   }
`
