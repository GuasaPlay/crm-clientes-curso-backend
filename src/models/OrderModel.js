import { Schema, model } from 'mongoose'

const OrderSchema = new Schema(
   {
      clientId: {
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
               type: Schema.Types.Number,
               required: true,
            },
         },
      ],
      orderStatus: {
         type: String,
         default: 'PENDING',
         enum: ['PENDING', 'CANCELED', 'DELIVERED'],
      },
      totalPay: {
         type: Number,
         required: true,
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

OrderSchema.virtual('client', {
   ref: 'Client',
   localField: 'clientId',
   foreignField: '_id',
   justOne: true,
})

export default model('Order', OrderSchema, 'Orders')
