import { IoMdLock, IoMdMail } from 'react-icons/io'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoURL from '../assets/logo-white.svg'
import imgLogin from '../assets/images/img-login.png'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getUser, login } from '../services/api/authService'
import { Spinner } from '../components/spinner'
import { useAppDispatch } from '../redux/hooks'
import { setCredentials } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

const validationSchema = object({
  email: string()
    .email('Formato incorreto de email!')
    .required('E-mail é campo obrigatório'),
  password: string().required('Senha é campo obrigatório')
})

type LoginInput = {
  email: string,
  password: string
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({ resolver: yupResolver(validationSchema) })

  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogin: SubmitHandler<LoginInput> = async (data) => {
    try {
      setIsLoading(true)
      const loginResponse = await login(data.email, data.password)
      const userResponse = await getUser(loginResponse.access_token)

      const user = {
        id: userResponse.id,
        email: userResponse.email,
        name: userResponse.name,
        role: userResponse.role,
        avatar: userResponse.avatar
      }

      dispatch(setCredentials({ user, access_token: loginResponse?.access_token, refresh_token: loginResponse?.refresh_token }))
      toast.success('Login bem sucedido!')
      navigate('/home')
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Unauthorized") {
          toast.error('Email ou senha incorretos.')
        }
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
          <h1 className='text-3xl font-semibold text-gray-800'>Bem-vindo!</h1>
          <p className='text-gray-500 text-sm'>
            Faça login na sua conta e aproveito o app
          </p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className='w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-3/5  space-y-3'>
          <div className='relative rounded-lg' {...(errors.email && { style: { border: '2px solid  rgb(242 148 148)' } })}>
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
          <div className='flex justify-end items-center'>
            <a href='#' className='text-blue-regular text-sm'>
              Esqueceu a senha?
            </a>
          </div>

          <button className='bg-blue-regular text-white w-full h-10 rounded-lg flex justify-center items-center'>
            { isLoading ? <Spinner /> : 'Entrar' }
          </button>

          <div className='flex items-center gap-2'>
            <p className='text-sm'>Seu primeiro acesso na plataforma?</p>
            <Link to='/signup' className='text-blue-regular text-sm'>
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
