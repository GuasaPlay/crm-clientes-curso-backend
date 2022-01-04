import { mergeSchemas } from 'graphql-tools'

import defaultSchema from './schemas/default.schema'
import productSchema from './schemas/product.schema'
import productResolver from './resolvers/product.resolver'

export default mergeSchemas({
   mergeDirectives: true,
   schemas: [defaultSchema, productSchema],
   resolvers: [productResolver],
})
