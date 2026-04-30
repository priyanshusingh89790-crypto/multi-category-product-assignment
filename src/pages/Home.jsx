import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategorySection from '../components/CategorySection'
import catalogData from '../data/data.json'
import {
  loadCatalogStart,
  setCatalogData,
} from '../redux/slices/catalogSlice'

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        >
          <div className="h-44 animate-pulse bg-slate-200" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
            <div className="h-6 w-4/5 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Home() {
  const dispatch = useDispatch()
  const { items, searchQuery, status } = useSelector((state) => state.catalog)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    if (items.length > 0) return undefined

    dispatch(loadCatalogStart())
    const timer = window.setTimeout(() => {
      dispatch(setCatalogData(catalogData))
    }, 250)

    return () => window.clearTimeout(timer)
  }, [dispatch, items.length])

  const categories = useMemo(
    () => ['All', ...new Set(items.map((item) => item.category))],
    [items],
  )

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory
      const matchesSearch =
        !query ||
        item.itemname.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
  }, [items, searchQuery, selectedCategory])

  const visibleCategories = useMemo(
    () =>
      filteredItems.reduce((groups, item) => {
        const category = item.category || 'Uncategorized'
        return {
          ...groups,
          [category]: [...(groups[category] || []), item],
        }
      }, {}),
    [filteredItems],
  )

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                Product catalog
              </p>
              <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">
                Browse products by category
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-600">
                A responsive catalog powered by local JSON, Redux Toolkit, and
                dynamic item properties.
              </p>
            </div>

            <div className="w-full lg:max-w-xs">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">
                  Category
                </span>
                <select
                  value={selectedCategory}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                  className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </header>

        {status === 'loading' ? (
          <SkeletonGrid />
        ) : (
          <div className="space-y-8">
            {Object.entries(visibleCategories).map(([category, categoryItems]) => (
              <CategorySection
                key={category}
                category={category}
                items={categoryItems}
              />
            ))}

            {filteredItems.length === 0 && (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-xl font-semibold text-slate-950">
                  No items found
                </h2>
                <p className="mt-2 text-slate-600">
                  Try a different global search term or category.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
