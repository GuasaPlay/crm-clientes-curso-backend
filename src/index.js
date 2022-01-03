import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { createServer } from 'http'

import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import DBConnection from './database/DBConnection'
import config from './config'
import schema from './graphql'

async function startApolloServer() {
   const app = express()
   app.use(morgan('dev'))
   app.use(cors())
   app.use(express.json())

   // const baseURL = '/api/v1'

   app.get('/', (_res, req) => {
      req.json({ message: 'HOLA DESDE EL SERVIDOR' })
   })

   const httpServer = createServer(app)

   const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
   })

   await server.start()

   server.applyMiddleware({ app })

   await DBConnection()

   httpServer.listen(config.port, () => {
      console.log(
         `🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`
      )
   })
}

startApolloServer()
