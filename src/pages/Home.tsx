import { useEffect, useState } from "react"
import { ProductCard } from "../components/home/productCard"
import { Product } from "../types/product"
import { getProdutcs } from "../services/api/productService"
import InfiniteScroll from "react-infinite-scroll-component"
import { Spinner } from "../components/spinner"
import { Searchbar } from "../components/home/searchBar"

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");

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

  const renderProducts = () => {
    return (
      products
        .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())) // filtra os produtos cujo o searchTerm esteja contino nos seus title 
        .map((product, index) => <ProductCard key={`${product.id} + ${index}`} product={product} />)
    )
  }

  return (
    <>
      <div className="w-full flex flex-col justify-center pb-14 px-4 pt-7 bg-[#f3f3f3]">
        <div className="mx-auto mb-6">
          <Searchbar onSearchChange={setSearchTerm} searchTerm={searchTerm} />
        </div>
        <div className="w-full flex flex-col-reverse max-w-7xl mx-auto">
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
            {products.length > 0 && renderProducts()}
          </InfiniteScroll>
        </div>
      </div>
    </>
  )
}