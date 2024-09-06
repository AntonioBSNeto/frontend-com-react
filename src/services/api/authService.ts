import API from './API'

export const login = async (email: string, password: string) => {
  try {
    const response = await API.post(`/auth/login`, { email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}

export const signup = async (name: string, email: string, password: string) => {
  try{
    const response = await API.post(`/users`, { name, email, password, avatar: 'https://picsum.photos/800' });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
}