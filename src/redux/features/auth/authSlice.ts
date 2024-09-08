import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface AuthState {
  user: {
    id?: number,
    email: string,
    name: string,
    role: string,
    avatar: string
  },
  access_token: string,
  refresh_token: string
}

const initialState: AuthState = {
  user: { id: undefined, email: '', name: '', role: '', avatar: '' }, access_token: '', refresh_token: ''
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      const { user, access_token, refresh_token } = action.payload
      state.user = user
      state.access_token = access_token
      state.refresh_token = refresh_token
    },
    logOut: state => {
      state.user = { id: undefined, email: '', name: '', role: '', avatar: '' }
      state.access_token = ''
      state.refresh_token = ''
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.reducer.auth.user
export const selectCurrentAccessToken = (state: RootState) => state.reducer.auth.access_token
export const selectCurrentRefreshToken = (state: RootState) => state.reducer.auth.refresh_token