import { Navigate, Outlet } from "react-router-dom"
import { selectCurrentAccessToken } from "../redux/features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"

export const RequireAuth = () => {
  const token = useAppSelector(selectCurrentAccessToken)

  return token ? <Outlet /> : <Navigate to='/' /> 
}

export const NoAuthRequired = () => {
  const token = useAppSelector(selectCurrentAccessToken)

  return token ? <Navigate to='/home' /> : <Outlet /> 
}



