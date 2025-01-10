'ues client'

import { Node } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type FormState = {
  addForm: boolean
  updateForm: boolean
  node: Node | undefined
}

const initialState: FormState = {
  addForm: false,
  updateForm: false,
  node: undefined,
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
    setNode: (state, action: PayloadAction<Node>) => {
      state.node = action.payload
    },
  },
})

export const { setAddForm, setUpdateForm, closeForm, setNode } = formSlice.actions
export default formSlice.reducer
