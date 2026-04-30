import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartDropdown from './CartDropdown'
import ProfileMenu from './ProfileMenu'
import SearchBar from './SearchBar'

function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartRef = useRef(null)
  const totalQuantity = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  )

  useEffect(() => {
    const closeCart = (event) => {
      if (!cartRef.current?.contains(event.target)) {
        setIsCartOpen(false)
      }
    }

    document.addEventListener('mousedown', closeCart)
    return () => document.removeEventListener('mousedown', closeCart)
  }, [])

  return (
    <div className="relative" ref={cartRef}>
      <button
        type="button"
        onClick={() => setIsCartOpen((isOpen) => !isOpen)}
        aria-label="Open cart"
        className="relative grid h-11 w-11 place-items-center rounded-md border border-slate-200 bg-white text-slate-800 transition hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h8.9a2 2 0 0 0 2-1.58L21 8H5.12" />
        </svg>
        {totalQuantity > 0 && (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-cyan-600 px-1.5 py-0.5 text-xs font-bold text-white">
            {totalQuantity}
          </span>
        )}
      </button>
      <CartDropdown isOpen={isCartOpen} />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <span className="grid h-10 w-10 place-items-center rounded-md bg-slate-950 text-lg font-black text-white">
              MC
            </span>
            <span className="min-w-0">
              <span className="block text-base font-black text-slate-950">
                MultiCart
              </span>
              <span className="hidden text-xs font-medium text-slate-500 sm:block">
                Category catalog
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 lg:hidden">
            <CartButton />
            <ProfileMenu />
          </div>
        </div>

        <div className="w-full lg:mx-8">
          <SearchBar />
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <CartButton />
          <ProfileMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
