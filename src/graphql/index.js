import { mergeSchemas } from 'graphql-tools'

import productSchema from './schemas/product.schema'
import productResolver from './resolvers/prodcut.resolver'

export default mergeSchemas({
   mergeDirectives: true,
   schemas: [productSchema],
   resolvers: [productResolver],
})
