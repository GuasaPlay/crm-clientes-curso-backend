import Client from '../../models/ClientModel'

export default {
   Query: {
      async getClients() {
         const clients = await Client.find().sort({ createdAt: 'desc' })
         return {
            code: '200',
            success: true,
            message: 'Consultando clientes',
            clients,
         }
      },
   },
   Mutation: {
      async createClient(_, args) {
         const { client } = args

         const newClient = new Client(client)

         const clientSaved = await newClient.save()

         return {
            code: '200',
            success: true,
            message: '',
            client: clientSaved,
         }
      },
      async updateClient(_, args) {
         const { clientId, client } = args

         const updatedClient = await Client.findOneAndUpdate(
            { _id: clientId },
            { ...client },
            { new: true }
         )

         return {
            code: '200',
            success: true,
            message: 'Cliente actualizado',
            client: updatedClient,
         }
      },
      async deleteClient(_, args) {
         const { clientId } = args

         await Client.deleteOne({ _id: clientId })

         return {
            code: '200',
            success: true,
            message: 'Cliente eliminado con éxito',
            client: { id: clientId },
         }
      },
   },
}
