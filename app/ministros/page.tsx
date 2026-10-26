import { getMinistros } from '@/lib/cosmic'
import MinistroCard from '@/components/MinistroCard'

export default async function MinistrosPage() {
  const ministros = await getMinistros()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-10 border-b border-gray-200 pb-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-gray-900">
          Composição da Corte
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Conheça os ministros que atualmente integram o Supremo Tribunal
          Federal.
        </p>
      </header>

      {ministros.length === 0 ? (
        <p className="text-gray-500">Nenhum ministro cadastrado no momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministros.map((ministro) => (
            <MinistroCard key={ministro.id} ministro={ministro} />
          ))}
        </div>
      )}
    </div>
  )
}