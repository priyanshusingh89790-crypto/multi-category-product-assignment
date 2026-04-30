import { createSlice } from '@reduxjs/toolkit'

const CART_STORAGE_KEY = 'multi-category-cart'

const loadStoredCart = () => {
  if (typeof window === 'undefined') return []

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)
    return storedCart ? JSON.parse(storedCart) : []
  } catch {
    return []
  }
}

const findItemIndex = (items, itemname) =>
  items.findIndex((item) => item.itemname === itemname)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadStoredCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const existingItemIndex = findItemIndex(state.items, item.itemname)

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += 1
      } else {
        state.items.push({
          itemname: item.itemname,
          category: item.category,
          image: item.image,
          itemprops: item.itemprops,
          quantity: 1,
        })
      }

    },
    increaseQuantity: (state, action) => {
      const existingItemIndex = findItemIndex(state.items, action.payload)

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += 1
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItemIndex = findItemIndex(state.items, action.payload)

      if (existingItemIndex < 0) return

      state.items[existingItemIndex].quantity -= 1

      if (state.items[existingItemIndex].quantity <= 0) {
        state.items.splice(existingItemIndex, 1)
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.itemname !== action.payload,
      )
    },
  },
})

export const saveCartItems = (items) => {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions
export default cartSlice.reducer
