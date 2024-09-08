import { IoMdLock, IoMdMail, IoMdPerson } from "react-icons/io"
import logoURL from '../assets/logo-white.svg'
import imgLogin from '../assets/images/img-login.png'
import { Spinner } from "../components/spinner"
import { useState } from "react"
import { object, ref, string } from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { signup } from "../services/api/authService"
import { useNavigate } from "react-router-dom"

const validationSchema = object({
  name: string()
    .required('Nome é um campo obrigatório'),
  email: string()
    .email('Formato incorreto de email!')
    .required('E-mail é campo obrigatório'),
  password: string().required('Senha é campo obrigatório')
    .min(6, 'A senha precisa ter ao menos 6 caracteres'),
  passwordConfirmation: string()
    .oneOf([ref('password'), ''], 'Senhas precisam ser iguais')
    .required('Confirmar Senha é um campo obrigatório')
})

type SignupInput = {
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
}

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupInput>({ resolver: yupResolver(validationSchema) })

  const [isLoading, setIsLoading] = useState(false)

  // verifica se os termos de uso foram aceitos
  const [useAndTerms, setUseAndTerms] = useState(false)

  const navigate = useNavigate()

  const handleSignup: SubmitHandler<SignupInput> = async (data) => {
    if (!useAndTerms) {
      toast.info('Aceite os termos de uso')
      return
    }
    try {
      setIsLoading(true)
      const { name, email, password } = data
      await signup(name, email, password)
      toast.success('Usuário criado com sucesso!')
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        toast.error("um erro inesperado acontece, tente novamente em alguns minutos")
      }
    } finally {
      setIsLoading(false)
    }
  }

 
  return (
    <div className='flex flex-col md:flex-row h-screen'>
      <div
        className='md:w-2/5 bg-blue-regular flex-col justify-between md:h-full bg-cover bg-center relative p-20 hidden sm:block'
        style={{ backgroundImage: `url(${imgLogin})` }}
      >
        <div>
          <img src={logoURL} alt='V-Projects' className='w-60' />
        </div>
        <div className='relative z-10'>
          <h3 className='lg:text-3xl sm:text-2xl font-semibold text-white mt-5 sm:w-auto lg:w-96'>
            Faça compras e cadastre produtos
          </h3>
        </div>
      </div>
      <div className='md:w-3/5 bg-white flex justify-center flex-col gap-5 items-center p-6 flex-grow'>
        <div className='flex flex-col w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-3/5 space-y-2'>
          <h1 className='text-3xl font-semibold text-gray-800'>Crie seu cadastro</h1>
        </div>
        <form onSubmit={handleSubmit(handleSignup)} className='w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-3/5  space-y-3'>
          <div className='relative rounded-lg' {...(errors?.name && { style: { border: '2px solid  rgb(242 148 148)' } })}>
            <span className='absolute border-r-2 px-2 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <IoMdPerson className='text-blue-regular w-5 h-5' />
            </span>
            <input
              type='text'
              className='h-12 rounded-lg bg-gray-light w-full pl-14'
              placeholder='Nome'
              autoComplete='true'
             {...register('name')}
            />
          </div>
          <span className="text-red text-sm">{errors.name?.message}</span>
          <div className='relative rounded-lg' {...(errors?.email && { style: { border: '2px solid  rgb(242 148 148)' } })}>
            <span className='absolute border-r-2 px-2 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <IoMdMail className='text-blue-regular w-5 h-5' />
            </span>
            <input
              type='text'
              className='h-12 rounded-lg bg-gray-light w-full pl-14'
              placeholder='Email'
              autoComplete='true'
             {...register('email')}
            />
          </div>
          <span className="text-red text-sm">{errors.email?.message}</span>
          <div className='relative rounded-lg' {...(errors.password && { style: { border: '2px solid  rgb(242 148 148)' } })}>
            <span className='absolute  border-r-2 px-2 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <IoMdLock className='text-blue-regular w-5 h-5' />
            </span>
            <input
              type='password'
              className='h-12 rounded-lg bg-gray-light w-full pl-14'
              placeholder='Senha'
              autoComplete='true'
             {...register('password')}
            />
          </div>
          <span className="text-red text-sm">{errors.password?.message}</span>
          <div className='relative rounded-lg' {...(errors.passwordConfirmation && { style: { border: '2px solid  rgb(242 148 148)' } })}>
            <span className='absolute  border-r-2 px-2 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <IoMdLock className='text-blue-regular w-5 h-5' />
            </span>
            <input
              type='password'
              className='h-12 rounded-lg bg-gray-light w-full pl-14'
              placeholder='Confirmar senha'
              autoComplete='true'
             {...register('passwordConfirmation')}
            />
          </div>
          <span className="text-red text-sm">{errors.passwordConfirmation?.message}</span>
          <div className='flex text-left items-start'>
            <input type="checkbox" name="terms" id="terms" className="mt-[6px] mr-[6px]" onChange={(e) => setUseAndTerms(e.target.checked)} />
            <p className="text-gray-800">
              Li e aceito os <a href='#' className="underline">Termos de Uso</a> e a{' '}
              <a href='#' className="underline">Política de Privacidade</a>
            </p>
          </div>

          <button className='bg-blue-regular text-white w-full h-10 rounded-lg flex justify-center items-center'>
            {isLoading ? <Spinner /> : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}