import { configureStore } from '@reduxjs/toolkit'
import formReducer from '@/lib/redux/slices/formSlice'
import menuReducer from '@/lib/redux/slices/menuSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      form: formReducer,
      menu: menuReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
