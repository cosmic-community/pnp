import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-serif text-4xl font-bold mb-4 text-gray-900">
        Página não encontrada
      </h1>
      <p className="text-gray-600 mb-8">
        O conteúdo que você procura não existe ou foi removido.
      </p>
      <Link
        href="/"
        className="inline-block bg-red-800 text-white px-6 py-3 rounded-md font-medium hover:bg-red-900 transition-colors"
      >
        Voltar para a home
      </Link>
    </div>
  )
}