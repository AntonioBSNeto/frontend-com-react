import API from './API'

export const getProdutcs = async (offset: number = 0, limit: number = 12) => {
  try {
    const response = await API.get(`/products?offset=${12*offset}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}