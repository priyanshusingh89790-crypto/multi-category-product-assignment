import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import catalogData from '../data/data.json'
import { addToCart } from '../redux/slices/cartSlice'
import { setCatalogData } from '../redux/slices/catalogSlice'
import { setSelectedItem } from '../redux/slices/selectedItemSlice'

function ItemDetail() {
  const { itemname } = useParams()
  const dispatch = useDispatch()
  const decodedItemName = decodeURIComponent(itemname || '')
  const { items } = useSelector((state) => state.catalog)
  const selectedItem = useSelector((state) => state.selectedItem.item)

  useEffect(() => {
    if (items.length === 0) {
      dispatch(setCatalogData(catalogData))
    }
  }, [dispatch, items.length])

  const item = useMemo(() => {
    if (selectedItem?.itemname === decodedItemName) return selectedItem

    return items.find((product) => product.itemname === decodedItemName)
  }, [decodedItemName, items, selectedItem])

  useEffect(() => {
    if (item) {
      dispatch(setSelectedItem(item))
    }
  }, [dispatch, item])

  if (!item) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-slate-900">
        <div className="max-w-md rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
            Item detail
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">
            Item not found
          </h1>
          <p className="mt-3 text-slate-600">
            The selected product is not available in the local catalog.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            Back to catalog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex h-10 items-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:border-cyan-400 hover:text-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        >
          Back to catalog
        </Link>

        <section className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
            <div className="bg-slate-100">
              <img
                src={item.image}
                alt={item.itemname}
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-8 p-5 sm:p-8">
              <div>
                <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700 ring-1 ring-cyan-100">
                  {item.category}
                </span>
                <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-950 sm:text-5xl">
                  {item.itemname}
                </h1>
                <button
                  type="button"
                  onClick={() => dispatch(addToCart(item))}
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-cyan-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                >
                  Add to Cart
                </button>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Specifications
                </h2>
                <dl className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200">
                  {item.itemprops?.map((prop) => (
                    <div
                      key={`${item.itemname}-${prop.label}`}
                      className="grid gap-1 px-4 py-3 sm:grid-cols-[160px_1fr] sm:gap-4"
                    >
                      <dt className="text-sm font-medium text-slate-500">
                        {prop.label}
                      </dt>
                      <dd className="text-base font-semibold text-slate-900">
                        {prop.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ItemDetail
