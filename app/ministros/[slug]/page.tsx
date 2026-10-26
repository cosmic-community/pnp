// app/ministros/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getMinistroBySlug, getMateriasByMinistro, getMetafieldValue } from '@/lib/cosmic'
import MateriaCard from '@/components/MateriaCard'

export default async function MinistroPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const ministro = await getMinistroBySlug(slug)

  if (!ministro) {
    notFound()
  }

  const materias = await getMateriasByMinistro(ministro.id)
  const foto = ministro.metadata?.foto
  const nome = getMetafieldValue(ministro.metadata?.nome_completo) || ministro.title
  const cargo = getMetafieldValue(ministro.metadata?.cargo)
  const indicadoPor = getMetafieldValue(ministro.metadata?.indicado_por)
  const biografia = getMetafieldValue(ministro.metadata?.biografia)
  const dataPosseRaw = getMetafieldValue(ministro.metadata?.data_posse)
  const dataPosse = dataPosseRaw
    ? new Date(dataPosseRaw).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row gap-6 mb-10 pb-8 border-b border-gray-200">
        {foto ? (
          <img
            src={`${foto.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
            alt={nome}
            width={160}
            height={160}
            className="w-40 h-40 rounded-full object-cover flex-shrink-0 mx-auto sm:mx-0"
          />
        ) : (
          <div className="w-40 h-40 rounded-full bg-gray-200 flex-shrink-0 mx-auto sm:mx-0" />
        )}
        <div>
          <h1 className="font-serif text-3xl font-bold mb-1 text-gray-900">
            {nome}
          </h1>
          {cargo && (
            <p className="text-red-800 font-semibold mb-3">{cargo}</p>
          )}
          <dl className="text-sm text-gray-600 space-y-1">
            {indicadoPor && (
              <div>
                <dt className="inline font-medium text-gray-700">
                  Indicado por:{' '}
                </dt>
                <dd className="inline">{indicadoPor}</dd>
              </div>
            )}
            {dataPosse && (
              <div>
                <dt className="inline font-medium text-gray-700">
                  Data de posse:{' '}
                </dt>
                <dd className="inline">{dataPosse}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {biografia && (
        <div className="prose max-w-none mb-12 prose-headings:font-serif">
          <h2 className="font-serif text-xl font-bold text-gray-900">
            Biografia
          </h2>
          <p>{biografia}</p>
        </div>
      )}

      <section>
        <h2 className="font-serif text-xl font-bold mb-4 text-gray-900">
          Matérias relacionadas
        </h2>
        {materias.length === 0 ? (
          <p className="text-gray-500">
            Nenhuma matéria relacionada encontrada.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {materias.map((materia) => (
              <MateriaCard key={materia.id} materia={materia} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}