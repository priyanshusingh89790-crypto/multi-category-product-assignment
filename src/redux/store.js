import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './slices/catalogSlice'
import cartReducer, { saveCartItems } from './slices/cartSlice'
import selectedItemReducer from './slices/selectedItemSlice'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
    selectedItem: selectedItemReducer,
  },
})

let previousCartItems = store.getState().cart.items

store.subscribe(() => {
  const currentCartItems = store.getState().cart.items

  if (currentCartItems !== previousCartItems) {
    previousCartItems = currentCartItems
    saveCartItems(currentCartItems)
  }
})
