import { getFeaturedMaterias, getRecentMaterias } from '@/lib/cosmic'
import FeaturedMateria from '@/components/FeaturedMateria'
import MateriaCard from '@/components/MateriaCard'

export default async function HomePage() {
  const [destaques, recentes] = await Promise.all([
    getFeaturedMaterias(3),
    getRecentMaterias(12),
  ])

  const destaqueIds = new Set(destaques.map((m) => m.id))
  const listaRecentes = recentes.filter((m) => !destaqueIds.has(m.id))

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {destaques.length > 0 && (
        <section className="mb-14">
          <h2 className="font-serif text-sm uppercase tracking-widest text-red-800 font-semibold mb-4 border-b border-gray-200 pb-2">
            Destaques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destaques.map((materia, index) => (
              <FeaturedMateria
                key={materia.id}
                materia={materia}
                primary={index === 0}
              />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-serif text-sm uppercase tracking-widest text-gray-600 font-semibold mb-4 border-b border-gray-200 pb-2">
          Últimas Notícias
        </h2>
        {listaRecentes.length === 0 ? (
          <p className="text-gray-500">
            Nenhuma matéria publicada no momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listaRecentes.map((materia) => (
              <MateriaCard key={materia.id} materia={materia} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}