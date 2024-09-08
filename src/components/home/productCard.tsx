import { useNavigate } from "react-router-dom";
import { Product } from "../../types/product"
import { MdAddShoppingCart } from "react-icons/md";
import { urlsExtractor } from "../../utils/urlExtractor";

interface ProductProps {
  product: Product
}

export const ProductCard = ({ product }: ProductProps) => {
  const navigate = useNavigate()

  return (
    <div className="md:p-4 lg:p-7 p-3 border border-grayshade-50 dark:border-grayshade-300 rounded-xl dark:bg-grayshade-500 w-full justify-center justify-items-center justify-self-center max-w-96 bg-white">
      <img src={urlsExtractor(product?.images?.[0])[0]} alt="" className="w-full rounded-lg self-stretch h-72 min-h-52 mb-7 object-cover cursor-pointer" onClick={() => navigate(`/product/${product.id}`, { state: product })} />
      <div>
        <p className="font-semibold text-xl mb-2 h-auto truncate">{product?.title}</p>
        <p className="text-xs flex">
          <span className="truncate inline-block max-w-32">{product?.description}</span>
          <span className="font-semibold text-xs ml-2 cursor-pointer" onClick={() => navigate(`/product/${product.id}`, { state: product })}>Veja mais</span>
        </p>
        <span className="my-4 inline-block rounded-full border-[1px] border-[#999999] bg-zinc-200 py-2 px-3 text-xs font-semibold text-neutral-900">{product?.category?.name}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs">Preço</p>
          <p className="font-semibold text-lg">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(product?.price)}
          </p>
        </div>
        <div className="flex text-white justify-between items-center">
          <button type="button" className="h-8 px-4 rounded-lg bg-blue-dark text-center text-lg flex items-center gap-x-2"><MdAddShoppingCart />Carrinho</button>
        </div>
      </div>
    </div>
  )
}