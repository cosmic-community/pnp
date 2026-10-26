# PnP — Notícias e Análise sobre o STF
![App Preview](https://imgix.cosmicjs.com/b135a9b0-d17c-11f1-bbc7-29a5ddb2d15a-pnp-logo.svg?w=1200&h=630&fit=crop&auto=format,compress)

Site de jornalismo e análise em português do Brasil sobre o Supremo Tribunal Federal (STF) e o Judiciário, construído com Next.js 16 e Cosmic.

## Funcionalidades

- 🏠 Home com matérias em destaque e últimas notícias
- 📰 Página completa de matéria com ministros relacionados
- 🏷️ Listagem de matérias por categoria
- ⚖️ Composição da Corte com ordenação por cargo
- 👤 Perfil de ministros com biografia e matérias
- 📱 Totalmente responsivo e em português (pt-BR)

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6adfb8a616f02035ccd18784&clone_repository=6adfba2216f02035ccd187d0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Site de jornalismo sobre STF"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "PnP". The content is managed in Cosmic CMS with the following object types: categorias, ministros, materias. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: Site de notícias e análise em português do Brasil sobre o Supremo Tribunal Federal (STF) e o Judiciário. Todo o texto da interface deve estar em português (pt-BR). Usa os tipos de conteúdo existentes: Matérias (subtítulo, conteúdo rich-text, imagem de destaque, número do processo, autor, categoria, ministros relacionados, destaque na home), Ministros (nome completo, foto, cargo, indicado por, data de posse, biografia) e Categorias (nome, descrição). Páginas: Home com matérias em destaque (campo destaque) no topo e lista das matérias mais recentes; página de cada matéria com imagem, subtítulo, autor, data, número do processo, categoria e cards dos ministros relacionados; página de listagem por categoria (Julgamentos, Bastidores, Análise); página com a composição da Corte listando os ministros (Presidente e Vice-Presidente primeiro) e página de perfil de cada ministro com biografia e as matérias que o mencionam. Visual jornalístico, sóbrio e confiável: tipografia serifada para títulos, layout limpo, responsivo, cabeçalho com navegação por categorias e rodapé simples.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router)
- [Cosmic](https://www.cosmicjs.com) como CMS headless
- TypeScript
- Tailwind CSS

## Primeiros Passos

### Pré-requisitos

- Bun instalado
- Uma conta no [Cosmic](https://www.cosmicjs.com) com um bucket configurado

### Instalação

```bash
bun install
```

Configure as variáveis de ambiente (veja seção de ambiente abaixo) e rode:

```bash
bun run dev
```

## Exemplos de uso da SDK do Cosmic

```typescript
import { cosmic } from '@/lib/cosmic'

// Buscar matérias em destaque
const { objects } = await cosmic.objects
  .find({ type: 'materias', 'metadata.destaque': true })
  .depth(1)

// Buscar um ministro pelo slug
const { object } = await cosmic.objects
  .findOne({ type: 'ministros', slug: 'ministro-exemplo' })
  .depth(1)
```

## Integração com o Cosmic CMS

Este projeto consome os tipos de conteúdo `materias`, `ministros` e `categorias` diretamente do seu bucket Cosmic, usando o parâmetro `depth` para resolver automaticamente os relacionamentos entre matérias, categorias e ministros. Saiba mais na [documentação do Cosmic](https://www.cosmicjs.com/docs).

## Opções de Deploy

### Vercel

1. Conecte seu repositório na [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY` e `COSMIC_WRITE_KEY`
3. Deploy automático a cada push

### Netlify

1. Conecte seu repositório na [Netlify](https://www.netlify.com)
2. Configure o comando de build: `bun run build`
3. Configure as mesmas variáveis de ambiente
<!-- README_END -->