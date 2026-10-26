import Link from 'next/link'
import type { Materia } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function MateriaCard({ materia }: { materia: Materia }) {
  const imagem = materia.metadata?.imagem_destaque
  const categoria = materia.metadata?.categoria
  const subtitulo = getMetafieldValue(materia.metadata?.subtitulo)
  const categoriaNome = categoria
    ? getMetafieldValue(categoria.metadata?.nome) || categoria.title
    : ''
  const data = materia.published_at || materia.created_at
  const dataFormatada = data
    ? new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : ''

  return (
    <article className="group">
      <Link href={`/materias/${materia.slug}`}>
        {imagem && (
          <img
            src={`${imagem.imgix_url}?w=600&h=340&fit=crop&auto=format,compress`}
            alt={materia.title}
            width={300}
            height={170}
            className="w-full h-44 object-cover rounded-md mb-3"
          />
        )}
        {categoriaNome && (
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-red-800 mb-1">
            {categoriaNome}
          </span>
        )}
        <h3 className="font-serif text-lg font-bold leading-snug mb-1 text-gray-900 group-hover:text-red-800 transition-colors">
          {materia.title}
        </h3>
        {subtitulo && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {subtitulo}
          </p>
        )}
        {dataFormatada && (
          <span className="text-xs text-gray-400">{dataFormatada}</span>
        )}
      </Link>
    </article>
  )
}