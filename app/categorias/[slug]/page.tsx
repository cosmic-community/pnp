// app/categorias/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCategoriaBySlug, getMateriasByCategoria, getMetafieldValue } from '@/lib/cosmic'
import MateriaCard from '@/components/MateriaCard'

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const categoria = await getCategoriaBySlug(slug)

  if (!categoria) {
    notFound()
  }

  const materias = await getMateriasByCategoria(categoria.id)
  const nome = getMetafieldValue(categoria.metadata?.nome) || categoria.title
  const descricao = getMetafieldValue(categoria.metadata?.descricao)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-gray-900">
          {nome}
        </h1>
        {descricao && (
          <p className="text-gray-600 max-w-2xl">{descricao}</p>
        )}
      </header>

      {materias.length === 0 ? (
        <p className="text-gray-500">
          Nenhuma matéria encontrada nesta categoria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {materias.map((materia) => (
            <MateriaCard key={materia.id} materia={materia} />
          ))}
        </div>
      )}
    </div>
  )
}