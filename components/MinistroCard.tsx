import Link from 'next/link'
import type { Ministro } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function MinistroCard({
  ministro,
  compact = false,
}: {
  ministro: Ministro
  compact?: boolean
}) {
  const foto = ministro.metadata?.foto
  const nome = getMetafieldValue(ministro.metadata?.nome_completo) || ministro.title
  const cargo = getMetafieldValue(ministro.metadata?.cargo)
  const sizeClass = compact ? 'w-14 h-14' : 'w-16 h-16'
  const pixelSize = compact ? 56 : 64

  return (
    <Link
      href={`/ministros/${ministro.slug}`}
      className={`flex items-center gap-4 border border-gray-200 rounded-md hover:border-red-800 transition-colors ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      {foto ? (
        <img
          src={`${foto.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
          alt={nome}
          width={pixelSize}
          height={pixelSize}
          className={`rounded-full object-cover flex-shrink-0 ${sizeClass}`}
        />
      ) : (
        <div
          className={`rounded-full bg-gray-200 flex-shrink-0 ${sizeClass}`}
        />
      )}
      <div>
        <h3 className="font-serif font-bold text-gray-900 leading-snug">
          {nome}
        </h3>
        {cargo && <p className="text-sm text-red-800 font-medium">{cargo}</p>}
      </div>
    </Link>
  )
}