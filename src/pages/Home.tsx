import { useEffect, useState } from "react"
import { Header } from "../components/header/header"
import { ProductCard } from "../components/home/productCard"
import { Product } from "../types/product"
import { getProdutcs } from "../services/api/productService"
import InfiniteScroll from "react-infinite-scroll-component"
import { Spinner } from "../components/spinner"



export const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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

  const fetchMoreProducts = async () => {
    await getProdutcs(currentPage)
      .then(products => {
        setProducts(prevProducts => [...prevProducts, ...products])
        products.length > 0 ? setHasMore(true) : setHasMore(false)
      })
      .catch((err) => console.log(err));

    setCurrentPage(prevCurrentPage => prevCurrentPage + 1)
  }

  return (
    <>
      <Header />
      <div className="w-full flex justify-center mb-14 px-4">
        <div className="w-full flex lg:flex-row flex-col-reverse max-w-7xl">
          <InfiniteScroll
            className="lg:w-10/12 md:w-10/12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 lg:gap-7 gap-4 m-auto !overflow-x-hidden !overflow-y-hidden"
            dataLength={products.length}
            next={fetchMoreProducts}
            hasMore={hasMore}
            loader={<Spinner />}
            scrollThreshold={0.9}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Não há mais itens</b>
              </p>
            }
          >
            {products.length > 0 && products.map((product, index) => <ProductCard key={`${product.id} + ${index}`} product={product} />)}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}