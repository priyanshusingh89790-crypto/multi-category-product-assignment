import { useDispatch, useSelector } from 'react-redux'
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../redux/slices/cartSlice'

function CartDropdown({ isOpen }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div
      className={`absolute right-0 z-30 mt-3 w-[min(92vw,24rem)] origin-top-right rounded-lg border border-slate-200 bg-white shadow-2xl transition duration-200 ${
        isOpen
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <h2 className="text-base font-bold text-slate-950">Cart</h2>
          <p className="text-sm text-slate-500">{totalQuantity} items selected</p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-400">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h8.9a2 2 0 0 0 2-1.58L21 8H5.12" />
            </svg>
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-950">
            Your cart is empty
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Add catalog items to see them here.
          </p>
        </div>
      ) : (
        <div className="max-h-96 overflow-y-auto p-3">
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.itemname}
                className="grid grid-cols-[64px_1fr] gap-3 rounded-lg border border-slate-100 p-2 transition hover:border-cyan-100 hover:bg-cyan-50/40"
              >
                <img
                  src={item.image}
                  alt={item.itemname}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">
                        {item.itemname}
                      </p>
                      <p className="text-xs font-medium text-cyan-700">
                        {item.category}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item.itemname))}
                      aria-label={`Remove ${item.itemname}`}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-md border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => dispatch(decreaseQuantity(item.itemname))}
                        aria-label={`Decrease ${item.itemname} quantity`}
                        className="grid h-8 w-8 place-items-center text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                      >
                        -
                      </button>
                      <span className="min-w-8 px-2 text-center text-sm font-semibold text-slate-950">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => dispatch(increaseQuantity(item.itemname))}
                        aria-label={`Increase ${item.itemname} quantity`}
                        className="grid h-8 w-8 place-items-center text-slate-700 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs font-medium text-slate-500">
                      Qty {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CartDropdown
