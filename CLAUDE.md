# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses **pnpm** as the package manager. Common commands:

- `pnpm dev` - Start development server (http://localhost:4321)
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm devdeploy` - Build and deploy to Cloudflare

## Architecture Overview

This is an **Astro + Starlight** website for Hackheim, a makerspace in Trondheim. The site combines a public landing page with documentation using Starlight.

### Tech Stack
- **Framework**: Astro 5+ with static output
- **Documentation**: Starlight integration for wiki/docs
- **UI Components**: Svelte 5 components
- **Styling**: TailwindCSS 4
- **Deployment**: Cloudflare Pages via Wrangler
- **Content**: Markdown with content collections

### Key Architecture Patterns

**Hybrid Site Structure**: The site serves both as a public website (`/`) and documentation platform (`/wiki/*`):
- Landing page: `src/pages/index.astro` with modular landing components
- Documentation: Handled by Starlight integration in `astro.config.mjs`
- Content collections: Defined in `src/content.config.ts`

**Content Collections**:
- `docs/` - Starlight documentation (Norwegian with English translation)
- `projects/` - Project showcases with rich metadata (difficulty, tools, materials)
- `news/` - News articles and announcements
- `pages/` - General content pages

**Component Organization**:
- `src/components/landing/` - Landing page sections (Hero, About, Equipment, etc.)
- `src/components/starlight/` - Custom Starlight component overrides
- `src/components/svelte/` - Interactive Svelte components

**Internationalization**:
- Default locale: Norwegian (`nb-NO`)
- Secondary: English (`en`)
- Configured in Starlight for documentation sections

### Deployment

- **Development**: `pnpm devdeploy` builds and deploys to Cloudflare
- **Production**: Auto-deployment via GitHub integration
- Static build output deployed to Cloudflare Pages
- Configuration in `wrangler.toml`

### Path Aliases

TypeScript path alias configured: `@components/*` maps to `src/components/*`