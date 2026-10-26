export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-serif text-lg font-bold text-gray-800">PnP</p>
        <p>
          &copy; {new Date().getFullYear()} PnP — Jornalismo sobre o Supremo
          Tribunal Federal.
        </p>
      </div>
    </footer>
  )
}