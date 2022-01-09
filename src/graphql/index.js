import { mergeSchemas } from 'graphql-tools'

import defaultSchema from './schemas/default.schema'
import productSchema from './schemas/product.schema'
import clientSchema from './schemas/client.schema'
import orderSchema from './schemas/order.schema'

import productResolver from './resolvers/product.resolver'
import clientResolver from './resolvers/client.resolver'
import orderResolver from './resolvers/order.resolver'

export default mergeSchemas({
   mergeDirectives: true,
   schemas: [defaultSchema, productSchema, clientSchema, orderSchema],
   resolvers: [productResolver, clientResolver, orderResolver],
})
