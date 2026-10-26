import { createBucketClient } from '@cosmicjs/sdk'
import type { Categoria, Ministro, Materia } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function getDateValue(item: {
  published_at?: string | null
  modified_at?: string | null
  created_at?: string | null
}): number {
  const raw = item.published_at || item.modified_at || item.created_at
  const time = raw ? Date.parse(raw) : NaN
  return Number.isNaN(time) ? 0 : time
}

// ---------------- Matérias ----------------

export async function getFeaturedMaterias(limit = 3): Promise<Materia[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'materias', 'metadata.destaque': true })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'published_at'])
      .depth(1)
    const materias = response.objects as Materia[]
    return materias.sort((a, b) => getDateValue(b) - getDateValue(a)).slice(0, limit)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Falha ao buscar matérias em destaque')
  }
}

export async function getRecentMaterias(limit = 12): Promise<Materia[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'materias' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'published_at'])
      .depth(1)
    const materias = response.objects as Materia[]
    return materias.sort((a, b) => getDateValue(b) - getDateValue(a)).slice(0, limit)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Falha ao buscar matérias recentes')
  }
}

export async function getMateriaBySlug(slug: string): Promise<Materia | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'materias', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'published_at'])
      .depth(1)
    return response.object as Materia
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Falha ao buscar matéria')
  }
}

export async function getMateriasByCategoria(categoriaId: string, limit = 50): Promise<Materia[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'materias', 'metadata.categoria': categoriaId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'published_at'])
      .depth(1)
    const materias = response.objects as Materia[]
    return materias.sort((a, b) => getDateValue(b) - getDateValue(a)).slice(0, limit)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Falha ao buscar matérias por categoria')
  }
}

export async function getMateriasByMinistro(ministroId: string, limit = 50): Promise<Materia[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'materias', 'metadata.ministros_relacionados': ministroId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'published_at'])
      .depth(1)
    const materias = response.objects as Materia[]
    return materias.sort((a, b) => getDateValue(b) - getDateValue(a)).slice(0, limit)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Falha ao buscar matérias relacionadas ao ministro')
  }
}

// ---------------- Categorias ----------------

export async function getCategorias(): Promise<Categoria[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categorias' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    return response.objects as Categoria[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Falha ao buscar categorias')
  }
}

export async function getCategoriaBySlug(slug: string): Promise<Categoria | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categorias', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    return response.object as Categoria
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Falha ao buscar categoria')
  }
}

// ---------------- Ministros ----------------

function getCargoPeso(cargo: string): number {
  const normalized = cargo.toLowerCase()
  if (normalized.includes('vice')) return 1
  if (normalized.includes('presidente')) return 0
  return 2
}

export async function getMinistros(): Promise<Ministro[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'ministros' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    const ministros = response.objects as Ministro[]
    return ministros.sort((a, b) => {
      const cargoA = getMetafieldValue(a.metadata?.cargo)
      const cargoB = getMetafieldValue(b.metadata?.cargo)
      const pesoDiff = getCargoPeso(cargoA) - getCargoPeso(cargoB)
      if (pesoDiff !== 0) return pesoDiff
      return a.title.localeCompare(b.title, 'pt-BR')
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Falha ao buscar ministros')
  }
}

export async function getMinistroBySlug(slug: string): Promise<Ministro | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'ministros', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)
    return response.object as Ministro
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Falha ao buscar ministro')
  }
}