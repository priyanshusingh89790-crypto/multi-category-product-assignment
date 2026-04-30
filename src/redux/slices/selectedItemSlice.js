import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  item: null,
}

const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.item = action.payload
    },
    clearSelectedItem: (state) => {
      state.item = null
    },
  },
})

export const { setSelectedItem, clearSelectedItem } = selectedItemSlice.actions
export default selectedItemSlice.reducer
