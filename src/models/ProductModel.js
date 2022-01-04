import { Schema, model } from 'mongoose'

const ProductSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      stock: {
         type: Number,
         default: 0,
      },
      price: {
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

export default model('Product', ProductSchema, 'Products')
