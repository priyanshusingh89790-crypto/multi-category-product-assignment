import { createSlice } from '@reduxjs/toolkit'

const groupItemsByCategory = (items) =>
  items.reduce((groups, item) => {
    const category = item.category || 'Uncategorized'
    return {
      ...groups,
      [category]: [...(groups[category] || []), item],
    }
  }, {})

const initialState = {
  items: [],
  groupedCategories: {},
  searchQuery: '',
  status: 'idle',
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    loadCatalogStart: (state) => {
      state.status = 'loading'
    },
    setCatalogData: (state, action) => {
      state.items = action.payload
      state.groupedCategories = groupItemsByCategory(action.payload)
      state.status = 'ready'
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
  },
})

export const { loadCatalogStart, setCatalogData, setSearchQuery } =
  catalogSlice.actions
export default catalogSlice.reducer
