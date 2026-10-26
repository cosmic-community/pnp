import Link from 'next/link'
import { getCategorias, getMetafieldValue } from '@/lib/cosmic'

export default async function Header() {
  const categorias = await getCategorias()

  return (
    <header className="border-b border-gray-300 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <Link
            href="/"
            className="font-serif text-2xl font-extrabold tracking-tight text-gray-900"
          >
            PnP
          </Link>
          <p className="hidden sm:block text-xs uppercase tracking-widest text-gray-500">
            Notícias e análise sobre o STF
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-sm font-medium">
          <Link
            href="/"
            className="text-gray-700 hover:text-red-800 transition-colors"
          >
            Home
          </Link>
          {categorias.map((categoria) => (
            <Link
              key={categoria.id}
              href={`/categorias/${categoria.slug}`}
              className="text-gray-700 hover:text-red-800 transition-colors"
            >
              {getMetafieldValue(categoria.metadata?.nome) || categoria.title}
            </Link>
          ))}
          <Link
            href="/ministros"
            className="text-gray-700 hover:text-red-800 transition-colors"
          >
            A Corte
          </Link>
        </nav>
      </div>
    </header>
  )
}