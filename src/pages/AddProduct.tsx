import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { InferType, number, object, string } from "yup"
import { Spinner } from "../components/spinner"
import { createProduct, getProdutcById, updateProduct } from "../services/api/productService"
import { toast } from "react-toastify"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { urlsExtractor } from "../utils/urlExtractor"
import { Product } from "../types/product"

const validationSchema = object({
  title: string()
    .required('Nome é um campo obrigatório'),
  price: number()
    .typeError('Informe um valor númerico não vazio')
    .positive('Preço precisa ser um valor positivo')
    .required('Preço é campo obrigatório'),
  description: string()
    .required('Descrição é um campo obrigatório'),
  categoryId: number()
    .typeError('Informe um valor númerico não vazio')
    .required('Id da categoria é um campo obrigatório')
    .integer(),
  images: string()
    .url('Formato URL inválido')
    .required('Link da imagem do produto é obrigatório.')
})

interface ProductInput extends InferType<typeof validationSchema> { }

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<ProductInput>({ resolver: yupResolver(validationSchema) })

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { productId } = useParams()

  const setFormvalues = (product: any) => {
    const { title, price, description, category, images } = product
    setValue('title', title)
    setValue('price', price)
    setValue('description', description)
    setValue('categoryId', category?.id)
    const imgUrl = urlsExtractor(images?.[0])?.[0]
    setValue('images', imgUrl)
  }

  useEffect(() => {
    if (!productId) {
      return
    }

    if (location.state) {
      setFormvalues(location.state?.product)
      return
    }

    const getProduct = async () => {
      return await getProdutcById(productId)
    }

    try {
      getProduct()
        .then(product => {
          console.log(product)
          setFormvalues(product)
        })
    } catch (error) { }

  }, [])

  const handleProduct: SubmitHandler<ProductInput> = async (data) => {
    try {
      setIsLoading(true)
      const { title, price, description, categoryId, images } = data
      const productData = {
        title,
        price,
        description,
        categoryId,
        images: [images]
      };
      const response = productId
        ? await updateProduct(productData, parseInt(productId))
        : await createProduct(productData)
      toast.success(`Produto ${productId ? 'salvo' : 'criado'} com sucesso!`)
      navigate(`/product/${response?.id}`)
    } catch (error) {
      if (error instanceof Error) {
        toast.error("um erro inesperado acontece, tente novamente em alguns minutos")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#f3f3f3] flex flex-grow py-8 px-6 sm:px-14">
      <div className="flex flex-col bg-white border border-grayshade-300 rounded-xl md:p-4 max-md:p-4 lg:p-10 w-full max-w-7xl mx-auto">
        <h1 className="text-center text-xl font-semibold my-4">{productId ? 'Editar Produto' : 'Adicionar Produto'}</h1>
        <form className="flex flex-col w-full gap-y-2" onSubmit={handleSubmit(handleProduct)}>
          <div className="flex flex-col">
            <label className="text-[#161616]">
              Nome do Produto*
            </label>
            <input type="text" className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]" {...register('title')} autoComplete="true" />
            <span className="h-5 text-[#F29494]">{errors?.title?.message}</span>
          </div>
          <div className="flex flex-col">
            <label className="text-[#161616]">
              Preço do Produto*
            </label>
            <input type="number" className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]" {...register('price')} autoComplete="true" />
            <span className="h-5 text-[#F29494]">{errors?.price?.message}</span>
          </div>
          <div className="flex flex-col">
            <label className="text-[#161616]">
              Descrição do Produto*
            </label>
            <textarea rows={4} className="resize-none px-4 py-2  min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]" {...register('description')} autoComplete="true" />
            <span className="h-5 text-[#F29494]">{errors?.description?.message}</span>
          </div>
          <div className="flex flex-col">
            <label className="text-[#161616]">
              Id da categoria do Produto*
            </label>
            <input type="number" className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]" {...register('categoryId')} autoComplete="true" />
            <span className="h-5 text-[#F29494]">{errors?.categoryId?.message}</span>
          </div>
          <div className="flex flex-col">
            <label className="text-[#161616]">
              URL do Produto*
            </label>
            <input type="text" className="px-4 min-w-full bg-[#F7F7F8] rounded-lg h-14 border-black border-[1px]" {...register('images')} autoComplete="true" />
            <span className="h-5 text-[#F29494]">{errors?.images?.message}</span>
          </div>

          <button className="bg-blue-regular text-white w-full h-10 rounded-lg flex justify-center items-center max-w-96 mx-auto mt-4">{isLoading ? <Spinner /> : `${productId ? 'Salvar' : 'Cadastrar'}`}</button>
        </form>
      </div>
    </div>
  )
}