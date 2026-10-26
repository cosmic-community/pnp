// app/materias/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMateriaBySlug, getMetafieldValue } from '@/lib/cosmic'
import MinistroCard from '@/components/MinistroCard'

export default async function MateriaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const materia = await getMateriaBySlug(slug)

  if (!materia) {
    notFound()
  }

  const categoria = materia.metadata?.categoria
  const ministros = materia.metadata?.ministros_relacionados || []
  const imagem = materia.metadata?.imagem_destaque
  const subtitulo = getMetafieldValue(materia.metadata?.subtitulo)
  const autor = getMetafieldValue(materia.metadata?.autor)
  const numeroProcesso = getMetafieldValue(materia.metadata?.numero_processo)
  const conteudo = getMetafieldValue(materia.metadata?.conteudo)
  const categoriaNome = categoria
    ? getMetafieldValue(categoria.metadata?.nome) || categoria.title
    : ''

  const dataPublicacao = materia.published_at || materia.created_at
  const dataFormatada = dataPublicacao
    ? new Date(dataPublicacao).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {categoria && (
        <Link
          href={`/categorias/${categoria.slug}`}
          className="inline-block text-xs uppercase tracking-widest font-semibold text-red-800 mb-3 hover:underline"
        >
          {categoriaNome}
        </Link>
      )}

      <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-3 text-gray-900">
        {materia.title}
      </h1>

      {subtitulo && (
        <p className="text-lg text-gray-600 mb-4 leading-relaxed">
          {subtitulo}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 border-y border-gray-200 py-3 mb-6">
        {autor && (
          <span>
            Por <strong className="text-gray-700">{autor}</strong>
          </span>
        )}
        {dataFormatada && <span>{dataFormatada}</span>}
        {numeroProcesso && (
          <span>
            Processo:{' '}
            <strong className="text-gray-700">{numeroProcesso}</strong>
          </span>
        )}
      </div>

      {imagem && (
        <img
          src={`${imagem.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={materia.title}
          width={800}
          height={450}
          className="w-full h-auto rounded-md mb-8 object-cover"
        />
      )}

      {conteudo && (
        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-a:text-red-800"
          dangerouslySetInnerHTML={{ __html: conteudo }}
        />
      )}

      {ministros.length > 0 && (
        <section className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="font-serif text-xl font-bold mb-4 text-gray-900">
            Ministros relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ministros.map((ministro) => (
              <MinistroCard key={ministro.id} ministro={ministro} compact />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}