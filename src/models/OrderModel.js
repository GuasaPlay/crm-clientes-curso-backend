import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
   {
      client: {
         type: Schema.Types.ObjectId,
         ref: 'Client',
         required: true,
      },

      orderDetail: [
         {
            productId: {
               type: Schema.Types.ObjectId,
               required: true,
            },
            productName: {
               type: String,
               required: true,
            },
            productQuantity: {
               type: Schema.Types.Number,
               required: true,
            },
            productPrice: {
               type: Schema.Types.Decimal128,
               required: true,
            },
         },
      ],
      orderStatus: {
         type: String,
         required: true,
         enum: ['PENDING', 'CANCELED', 'DELIVERED'],
      },
   },
   {
      timestamps: true,
      versionKey: false,
      toJSON: {
         getters: true,
         virtuals: true,
      },
      toObject: {
         getters: true,
         virtuals: true,
      },
   }
)

export default model('Order', OrderSchema, 'Orders')
