import Client from '../../models/ClientModel'
import Order from '../../models/OrderModel'
import Product from '../../models/ProductModel'

export default {
   Query: {
      async getOrders() {
         const orders = await Order.find(
            {},
            {},
            { populate: { path: 'client' } }
         ).sort({ createdAt: 'desc' })

         return {
            code: '200',
            success: true,
            message: 'Consultando pedidos',
            orders,
         }
      },
   },
   Mutation: {
      async createOrder(_, args) {
         const { order } = args

         const newOrder = new Order(order)

         const orderSaved = await newOrder.save()

         const { orderDetail } = order

         await Promise.all(
            orderDetail.map(async product => {
               const { productId, productQuantity } = product

               await Product.updateOne(
                  { _id: productId },
                  {
                     $inc: { stock: -Math.abs(productQuantity) },
                  }
               )
            })
         )

         const client = await Client.findById(order.clientId)

         return {
            code: '200',
            success: true,
            message: 'Pedido creado con éxito',
            order: {
               ...orderSaved.toObject(),
               client,
            },
         }
      },

      async dispatchOrder(_, args) {
         const { orderId } = args

         await Order.updateOne(
            { _id: orderId },
            {
               orderStatus: 'DELIVERED',
            }
         )

         const orderUpdated = await Order.findById(
            orderId,
            {},
            { populate: { path: 'client' } }
         )

         return {
            code: '200',
            success: true,
            message: 'Orden despachada con éxito',
            order: orderUpdated,
         }
      },
      async cancelOrder(_, args) {
         const { orderId } = args

         const orderUpdated = await Order.findById(
            orderId,
            {},
            { populate: { path: 'client' } }
         )

         const { orderDetail } = orderUpdated

         await Promise.all(
            orderDetail.map(async product => {
               const { productId, productQuantity } = product

               await Product.updateOne(
                  { _id: productId },
                  {
                     $inc: { stock: productQuantity },
                  }
               )
            })
         )
         await Order.updateOne(
            { _id: orderId },
            {
               orderStatus: 'CANCELED',
            }
         )

         orderUpdated.orderStatus = 'CANCELED'

         return {
            code: '200',
            success: true,
            message: 'Orden cancelada con éxito',
            order: orderUpdated,
         }
      },
   },
}
