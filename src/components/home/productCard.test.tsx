import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '../../test/test-utils'
import { ProductCard } from './productCard'
import { toast } from 'react-toastify'


// Mock do react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn()
  }
}))

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    description: 'Test Description',
    price: 100,
    images: ['https://example.com/test-image.jpg'],
    category: { name: 'Test Category', id: 1, image: 'test-image.jpg' }
  }

  it('should render product information correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Category')).toBeInTheDocument()
    expect(screen.getByText(/R\$\s*100,00/)).toBeInTheDocument()
  })

  it('should show "Veja mais" link', () => {
    render(<ProductCard product={mockProduct} />)

    const vejaMaisLink = screen.getByText('Veja mais')
    expect(vejaMaisLink).toBeInTheDocument()
  })

  it('should add product to cart when clicking cart button', async () => {
    render(<ProductCard product={mockProduct} />)

    const cartButton = screen.getByText('Carrinho')
    await act(async () => {
      fireEvent.click(cartButton)
    })

    // Verifica se o toast de sucesso foi chamado
    expect(toast.success).toHaveBeenCalledWith('Produto adicionado ao carrinho')
  })

  it('should render product image', () => {
    render(<ProductCard product={mockProduct} />)

    const image = screen.getByAltText('Product image')
    expect(image).toHaveAttribute('src', mockProduct.images[0])
  })

  it('should format price correctly', () => {
    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText(/R\$\s*100,00/)).toBeInTheDocument()
  })
})