import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSelectedItem } from '../redux/slices/selectedItemSlice'

function ItemCard({ item }) {
  const dispatch = useDispatch()
  const previewProps = item.itemprops?.slice(0, 2) || []

  return (
    <Link
      to={`/item/${encodeURIComponent(item.itemname)}`}
      onClick={() => dispatch(setSelectedItem(item))}
      className="group block overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.itemname}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-4 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
            {item.category}
          </p>
          <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug text-slate-950">
            {item.itemname}
          </h3>
        </div>

        <div className="space-y-2">
          {previewProps.map((prop) => (
            <div
              key={`${item.itemname}-${prop.label}`}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="truncate text-slate-500">{prop.label}</span>
              <span className="max-w-[58%] truncate font-medium text-slate-800">
                {prop.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}

export default ItemCard
