import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { Product } from "../types/product"
import { getProdutcById } from "../services/api/productService"
import { MdAddShoppingCart } from "react-icons/md"
import { urlsExtractor } from "../utils/urlExtractor"

export const ProductPage = () => {
  const location = useLocation()
  const { productId } = useParams()

  const [product, setProduct] = useState<Product>()

  useEffect(() => {
    const getProduct = async () => {
      return await getProdutcById(productId)
    }

    if (location.state) {
      setProduct(location.state)
    } else {
      try {
        getProduct()
          .then(product => {
            setProduct(product)
          })
      } catch (error) { }
    }
  }, [])

  const renderProduct = () => (
    <div className="px-14 my-6">
      <div className="flex items-center justify-center max-w-7xl m-auto ">
        <div className="relative flex lg:flex-row flex-col bg-zinc-100 border border-grayshade-300 rounded-xl md:p-4 max-md:p-4 lg:p-10">
          <Link to={'/home'} className="absolute text-xs lg:text-base flex items-center text-grayshade-300 bg-blue-regular border border-grayshade-50 px-4 py-2 top-[1%] right-[2%] rounded-full text-white" >
            Voltar
          </Link>
          <Link to={`/product/edit/${product?.id}`} state={{ product }} className="absolute text-xs lg:text-base flex items-center text-grayshade-300 bg-[#EFE090] border border-grayshade-50 px-4 py-2 top-11 sm:top-14 right-[2%] rounded-full text-[#222222]">
            Editar
          </Link>
          <div className="flex lg:flex-row flex-col-reverse justify-around items-center">
            <img className="lg:w-4/6 max-sm:w-full rounded-xl object-cover" src={urlsExtractor(product?.images?.[0])[0]} alt="" />
          </div>
          <div className="lg:p-8 max-md:p-0 flex lg:min-w-96 flex-col justify-center md:pt-3">
            <p className="text-4xl max-sm:text-2xl font-semibold">{product?.title}</p>
            <span className="lable w-max">{product?.category?.name}</span>
            <p className="text-xl max-sm:text-base font-medium text-grayshade-50 my-10">{product?.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-grayshade-100 text-lg">Preço</p>
                <p className="font-bold text-grayshade-300  text-2xl">{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(product?.price || 0)}
                </p>
              </div>
              <div className="flex text-white justify-between items-center">
                <button type="button" className="h-8 px-4 rounded-lg bg-blue-dark text-center text-lg flex items-center gap-x-2"><MdAddShoppingCart />Carrinho</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    product ? renderProduct() : <p className="mt-6 text-center">Produto não encontrado</p>
  )
}