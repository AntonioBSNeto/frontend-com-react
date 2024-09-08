import { Product } from '../../types/product';
import API from './API'

export const getProdutcs = async (offset: number = 0, limit: number = 12) => {
  try {
    const response = await API.get(`/products?offset=${12*offset}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

export const getProdutcById = async (id: string = '') => {
  try {
    const response = await API.get(`/products/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

export const createProduct = async (product: Product) => {
  try {
    console.log(product)
    const response = await API.post(`/products`, product)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

export const updateProduct = async (product: Product, productId: number) => {
  try {
    console.log(product)
    const response = await API.put(`/products/${productId}`, product)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}