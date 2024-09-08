import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/authSlice'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

const persistConfig = {
  key: 'auth',
  storage
}

const rootReducer = combineReducers({
  auth: authReducer
})

const appReducer = (state: any, action: any) => {
  if (action.type === REHYDRATE) {
    localStorage.setItem('isPageRefreshed', '1')
  }
  return rootReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = configureStore({
  reducer: {
    reducer: persistedReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
