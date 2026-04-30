import ItemCard from './ItemCard'

function CategorySection({ category, items }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <p className="text-sm font-medium text-cyan-700">Category</p>
          <h2 className="text-2xl font-bold text-slate-950">{category}</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          {items.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <ItemCard key={item.itemname} item={item} />
        ))}
      </div>
    </section>
  )
}

export default CategorySection
