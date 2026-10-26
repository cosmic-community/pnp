export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  published_at?: string
}

export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface Categoria extends CosmicObject {
  type: 'categorias'
  metadata: {
    nome?: string
    descricao?: string
  }
}

export interface Ministro extends CosmicObject {
  type: 'ministros'
  metadata: {
    nome_completo?: string
    foto?: CosmicFile
    cargo?: string
    indicado_por?: string
    data_posse?: string
    biografia?: string
  }
}

export interface Materia extends CosmicObject {
  type: 'materias'
  metadata: {
    subtitulo?: string
    conteudo?: string
    imagem_destaque?: CosmicFile
    numero_processo?: string
    autor?: string
    categoria?: Categoria
    ministros_relacionados?: Ministro[]
    destaque?: boolean
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit: number
  skip: number
}