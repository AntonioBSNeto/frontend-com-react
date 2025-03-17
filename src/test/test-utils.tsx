import { ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { BrowserRouter } from 'react-router-dom'

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  )
}

const customRender = (ui: ReactNode, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  })

export * from '@testing-library/react'
export { customRender as render }