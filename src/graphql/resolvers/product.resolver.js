import Product from '../../models/ProductModel'

export default {
   Query: {
      async getProducts() {
         const products = await Product.find().sort({ createdAt: 'desc' })
         return {
            code: '200',
            success: true,
            message: 'Consultando productos',
            products,
         }
      },
   },
   Mutation: {
      async createProduct(_, args) {
         const { product } = args

         const newProduct = new Product(product)

         const productSaved = await newProduct.save()

         return {
            code: '200',
            success: true,
            message: '',
            product: productSaved,
         }
      },
      async updateProduct(_, args) {
         try {
            const { productId, product } = args

            const updatedProduct = await Product.findOneAndUpdate(
               { _id: productId },
               { ...product },
               { new: true }
            )

            return {
               code: '200',
               success: true,
               message: 'Producto actualizado',
               product: updatedProduct,
            }
         } catch (error) {
            console.log(error)
         }
      },
      async deleteProduct(_, args) {
         const { productId } = args

         await Product.deleteOne({ _id: productId })

         return {
            code: '200',
            success: true,
            message: 'Producto eliminado con éxito',
            product: { id: productId },
         }
      },
   },
}
