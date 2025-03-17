import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '../../test/test-utils'
import { AddProduct } from './AddProduct'
import * as productService from '../../services/api/productService'
import { toast } from 'react-toastify'


vi.mock('../services/api/productService', () => ({
  createProduct: vi.fn()
}))

// Mock do react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock do react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

describe('AddProduct Component', () => {
  const mockProductResponse = {
    id: 1,
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
    categoryId: 1,
    images: ['https://example.com/image.jpg'],
    category: {
      id: 1,
      name: 'Test Category',
      image: 'category.jpg'
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the form with all fields', async () => {
    await act(async () => {
      render(<AddProduct />)
    })

    expect(screen.getByText('Nome do Produto*')).toBeInTheDocument()
    expect(screen.getByText('Descrição do Produto*')).toBeInTheDocument()
    expect(screen.getByText('Preço do Produto*')).toBeInTheDocument()
    expect(screen.getByText('Id da categoria do Produto*')).toBeInTheDocument()
    expect(screen.getByText('URL do Produto*')).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: 'title' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /price/i })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /categoryId/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /images/i })).toBeInTheDocument()
  })

  it('should show validation errors when submitting empty form', async () => {
    await act(async () => {
      render(<AddProduct />)
    })

    const submitButton = screen.getByText('Cadastrar')

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(screen.getByText('Nome é um campo obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Preço é campo obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Descrição é um campo obrigatório')).toBeInTheDocument()
    expect(screen.getByText('Informe um valor númerico não vazio')).toBeInTheDocument()
    expect(screen.getByText('Link da imagem do produto é obrigatório.')).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    vi.mocked(productService.createProduct).mockResolvedValueOnce(mockProductResponse)

    await act(async () => {
      render(<AddProduct />)
    })

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: /title/i }), {
        target: { value: 'Test Product' }
      })
      fireEvent.change(screen.getByRole('textbox', { name: /description/i }), {
        target: { value: 'Test Description' }
      })
      fireEvent.change(screen.getByRole('spinbutton', { name: /price/i }), {
        target: { value: '100' }
      })
      fireEvent.change(screen.getByRole('spinbutton', { name: /categoryId/i }), {
        target: { value: '1' }
      })
      fireEvent.change(screen.getByRole('textbox', { name: /images/i }), {
        target: { value: 'https://example.com/image.jpg' }
      })
    })

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(productService.createProduct).toHaveBeenCalledWith({
      title: 'Test Product',
      description: 'Test Description',
      price: 100,
      categoryId: 1,
      images: ['https://example.com/image.jpg']
    })
    expect(toast.success).toHaveBeenCalledWith('Produto criado com sucesso!')
  })

  it('should show error message when product creation fails', async () => {
    const errorMessage = 'Erro na API: Produto inválido'
    vi.mocked(productService.createProduct).mockRejectedValueOnce(
      new Error(errorMessage)
    )

    await act(async () => {
      render(<AddProduct />)
    })

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: /title/i }), {
        target: { value: 'Test Product' }
      })
      fireEvent.change(screen.getByRole('textbox', { name: /description/i }), {
        target: { value: 'Test Description' }
      })
      fireEvent.change(screen.getByRole('spinbutton', { name: /price/i }), {
        target: { value: '100' }
      })
      fireEvent.change(screen.getByRole('spinbutton', { name: /categoryId/i }), {
        target: { value: '1' }
      })
      fireEvent.change(screen.getByRole('textbox', { name: /images/i }), {
        target: { value: 'https://example.com/image.jpg' }
      })
    })

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(toast.error).toHaveBeenCalledWith('um erro inesperado acontece, tente novamente em alguns minutos')
  })

  it('should show loading spinner when submitting', async () => {
    let resolvePromise: (value: unknown) => void
    const promise = new Promise(resolve => {
      resolvePromise = resolve
    })
    vi.mocked(productService.createProduct).mockReturnValueOnce(promise)

    await act(async () => {
      render(<AddProduct />)
    })

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox', { name: /title/i }), {
        target: { value: 'Test Product' }
      })
      fireEvent.change(screen.getByRole('textbox', { name: /description/i }), {
        target: { value: 'Test Description' }
      })
      fireEvent.change(screen.getByRole('spinbutton', { name: /price/i }), {
        target: { value: '100' }
      })
      fireEvent.change(screen.getByRole('spinbutton', { name: /categoryId/i }), {
        target: { value: '1' }
      })
      fireEvent.change(screen.getByRole('textbox', { name: /images/i }), {
        target: { value: 'https://example.com/image.jpg' }
      })
    })

    const submitButton = screen.getByRole('button', { name: /Cadastrar/i })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(screen.queryByText('Cadastrar')).not.toBeInTheDocument()

    await act(async () => {
      resolvePromise(undefined)
    })
  })
})