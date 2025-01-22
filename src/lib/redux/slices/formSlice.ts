'ues client'

import { FormError, MenuNode } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FormState = {
  addForm: boolean
  updateForm: boolean
  node: MenuNode | undefined
  error: FormError
}

const initialState: FormState = {
  addForm: false,
  updateForm: false,
  node: undefined,
  error: null,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setAddForm: (state, action: PayloadAction<boolean>) => {
      state.addForm = action.payload
    },
    setUpdateForm: (state, action: PayloadAction<boolean>) => {
      state.updateForm = action.payload
    },
    closeForm: (state) => {
      state.addForm = false
      state.updateForm = false
    },
    setNode: (state, action: PayloadAction<MenuNode>) => {
      state.node = action.payload
    },
    setFormError: (state, action: PayloadAction<FormError>) => {
      state.error = action.payload
    },
  },
})

export const { setAddForm, setUpdateForm, closeForm, setNode, setFormError } =
  formSlice.actions
export default formSlice.reducer
