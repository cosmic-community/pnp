import Link from 'next/link'
import type { Materia } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function FeaturedMateria({
  materia,
  primary = false,
}: {
  materia: Materia
  primary?: boolean
}) {
  const imagem = materia.metadata?.imagem_destaque
  const categoria = materia.metadata?.categoria
  const subtitulo = getMetafieldValue(materia.metadata?.subtitulo)
  const categoriaNome = categoria
    ? getMetafieldValue(categoria.metadata?.nome) || categoria.title
    : ''

  return (
    <article className={primary ? 'md:col-span-3' : ''}>
      <Link href={`/materias/${materia.slug}`} className="group block">
        {imagem && (
          <img
            src={`${imagem.imgix_url}?w=${primary ? 1600 : 800}&h=${
              primary ? 700 : 450
            }&fit=crop&auto=format,compress`}
            alt={materia.title}
            width={primary ? 1200 : 400}
            height={primary ? 525 : 225}
            className={`w-full object-cover rounded-md mb-4 ${
              primary ? 'h-80 md:h-96' : 'h-48'
            }`}
          />
        )}
        {categoriaNome && (
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-red-800 mb-2">
            {categoriaNome}
          </span>
        )}
        <h2
          className={`font-serif font-bold leading-tight text-gray-900 group-hover:text-red-800 transition-colors ${
            primary ? 'text-3xl md:text-4xl mb-3' : 'text-xl mb-2'
          }`}
        >
          {materia.title}
        </h2>
        {subtitulo && (
          <p
            className={`text-gray-600 ${
              primary ? 'text-lg max-w-3xl' : 'text-sm line-clamp-2'
            }`}
          >
            {subtitulo}
          </p>
        )}
      </Link>
    </article>
  )
}