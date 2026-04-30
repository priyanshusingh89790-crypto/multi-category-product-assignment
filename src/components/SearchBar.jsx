import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../redux/slices/catalogSlice'

function SearchBar() {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state) => state.catalog.searchQuery)

  return (
    <label className="relative block w-full">
      <span className="sr-only">Search products</span>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m21 21-4.3-4.3" />
          <circle cx="11" cy="11" r="7" />
        </svg>
      </span>
      <input
        type="search"
        value={searchQuery}
        onChange={(event) => dispatch(setSearchQuery(event.target.value))}
        placeholder="Search products or categories"
        className="h-11 w-full rounded-md border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
      />
    </label>
  )
}

export default SearchBar
