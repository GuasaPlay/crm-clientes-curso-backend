import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   stock: {
      type: Number,
      default: 0,
   },
   price: {
      type: Schema.Types.Decimal128,
      required: true,
   },
})

export default model('Product', ProductSchema, 'Products')
