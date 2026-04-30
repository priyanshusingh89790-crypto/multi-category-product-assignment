function ProfileMenu() {
  return (
    <details className="group relative">
      <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-md border border-slate-200 bg-white px-2 text-left transition hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-700 text-sm font-bold text-white">
          PV
        </span>
        <span className="hidden min-w-0 sm:block">
          <span className="block truncate text-sm font-semibold text-slate-950">
            Priyanshu
          </span>
          <span className="block truncate text-xs text-slate-500">
            Demo user
          </span>
        </span>
        <svg
          aria-hidden="true"
          className="hidden h-4 w-4 text-slate-400 transition group-open:rotate-180 sm:block"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>

      <div className="absolute right-0 z-30 mt-3 w-52 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
        <div className="border-b border-slate-100 px-4 py-3">
          <p className="text-sm font-semibold text-slate-950">Priyanshu</p>
          <p className="text-xs text-slate-500">Catalog manager</p>
        </div>
        <button
          type="button"
          className="block w-full px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Profile
        </button>
        <button
          type="button"
          className="block w-full px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Preferences
        </button>
      </div>
    </details>
  )
}

export default ProfileMenu
