import { Schema, model } from 'mongoose'

const ClientSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      company: {
         type: String,
      },
      phone: {
         type: String,
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

export default model('Client', ClientSchema, 'Clients')
