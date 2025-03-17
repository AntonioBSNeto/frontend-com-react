import { describe, it, vi, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '../../test/test-utils'
import { Home } from './Home'
import * as productService from '../../services/api/productService'

// Mock do serviço de produtos
vi.mock('../../services/api/productService', () => ({
  getProdutcs: vi.fn()
}))

describe('Home Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Description 1',
      price: 100,
      images: ['image1.jpg'],
      category: { name: 'Category 1', id: 1, image: 'image1.jpg' }
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Description 2',
      price: 200,
      images: ['image2.jpg'],
      category: { name: 'Category 2', id: 2, image: 'image2.jpg' }
    }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock da resposta da API
    vi.mocked(productService.getProdutcs).mockResolvedValue(mockProducts)
  })

  it('should render search bar', async () => {
    await act(async () => {
      render(<Home />)
    })
    expect(screen.getByPlaceholderText('Buscar produto')).toBeInTheDocument()
  })

  it('should render products after loading', async () => {
    await act(async () => {
      render(<Home />)
    })

    // Espera os produtos serem carregados
    const product1 = await screen.findByText('Product 1')
    const product2 = await screen.findByText('Product 2')

    expect(product1).toBeInTheDocument()
    expect(product2).toBeInTheDocument()
  })

  it('should filter products when searching', async () => {
    await act(async () => {
      render(<Home />)
    })

    // Espera os produtos serem carregados
    await screen.findByText('Product 1')

    // Digita no campo de busca
    const searchInput = screen.getByPlaceholderText('Buscar produto')
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'Product 1' } })
    })

    // Verifica se apenas o produto filtrado está visível
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument()
  })

  it('should load more products when scrolling', async () => {
    const { container } = await act(async () => {
      return render(<Home />)
    })

    // Espera os produtos iniciais serem carregados
    await screen.findByText('Product 1')

    // Mock da próxima página de produtos
    const nextPageProducts = [
      {
        id: 3,
        title: 'Product 3',
        description: 'Description 3',
        price: 300,
        images: ['image3.jpg'],
        category: { name: 'Category 3', id: 3, image: 'image3.jpg' }
      }
    ]
    vi.mocked(productService.getProdutcs).mockResolvedValueOnce(nextPageProducts)

    // Encontra o componente InfiniteScroll
    const infiniteScroll = container.querySelector('.infinite-scroll-component')
    expect(infiniteScroll).toBeTruthy()

    // Chama a função next do InfiniteScroll
    const nextButton = container.querySelector('[data-testid="infinite-scroll-next"]')
    if (nextButton) {
      await act(async () => {
        fireEvent.click(nextButton)
      })
    }

    // Verifica se os novos produtos foram carregados
    const product3 = await screen.findByText('Product 3')
    expect(product3).toBeInTheDocument()
  })
})