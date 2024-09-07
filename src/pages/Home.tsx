import { useEffect, useState } from "react"
import { Header } from "../components/header/header"
import { ProductCard } from "../components/home/productCard"
import { Product } from "../types/product"
import { getProdutcs } from "../services/api/productService"



export const Home = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const getAllProducts = async () => {
      return await getProdutcs()
    }

    try {
      getAllProducts()
        .then(products => {
          setProducts(products)
        })
    } catch (error) { }

  }, [])

  const renderProducts = () => {
    return products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))
  }

  return (
    <>
      <Header />
      <div className="w-full flex justify-center mb-14">
        <div className="w-full flex lg:flex-row flex-col-reverse max-w-7xl ">
          <div className="lg:w-10/12 md:w-10/12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 lg:gap-7 gap-4 m-auto">
            {products.length > 0 && renderProducts()}
          </div>
        </div>
      </div>
    </>
  )
}