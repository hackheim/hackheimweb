# Hackheim Web

The official website for Hackheim. This site serves as both a public-facing website and documentation platform, built with Astro and Starlight.

## 🏗️ Tech Stack

- **Framework**: [Astro](https://astro.build/) with Starlight for documentation
- **UI Components**: [Svelte](https://svelte.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Content**: Markdown/MDX with content collections
- **Deployment**: Cloudflare Pages
- **Package Manager**: pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hackheim/hackheimweb.git
   cd hackheim-web
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

The site will be available at `http://localhost:4321`

## 📁 Project Structure

```
.
├── public/                 # Static assets (favicons, images, etc.)
├── src/
│   ├── assets/            # Build-time assets (logos, etc.)
│   ├── components/        # Reusable components
│   │   └── starlight/     # Custom Starlight components
│   ├── content/           # Content collections
│   │   ├── docs/          # Documentation pages
│   │   ├── news/          # News articles
│   │   ├── pages/         # General pages
│   │   └── projects/      # Project showcases
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages
│   │   ├── index.astro    # Homepage
│   │   ├── news/          # News listing pages
│   │   └── projects/      # Project listing pages
│   ├── styles/            # Global styles
│   └── content.config.ts  # Content collection schemas
├── astro.config.mjs       # Astro configuration
├── wrangler.toml          # Cloudflare deployment config
└── package.json
```

## 📝 Content Management

Content is organized into collections defined in `src/content.config.ts`:

- **docs**: Documentation pages (Starlight integration)
- **news**: News articles and announcements
- **projects**: Project showcases and tutorials
- **pages**: General website pages

### Adding Content

1. **Documentation**: Add `.md` files to `src/content/docs/`
2. **News**: Add `.md` files to `src/content/news/` with frontmatter
3. **Projects**: Add `.md` files to `src/content/projects/` with required schema
4. **Pages**: Add `.md` files to `src/content/pages/`

## 🛠️ Development Commands

| Command                | Description                                    |
| :--------------------- | :--------------------------------------------- |
| `pnpm dev`            | Start development server                        |
| `pnpm build`          | Build for production                           |
| `pnpm preview`        | Preview production build locally               |
| `pnpm devdeploy`      | Build and deploy to Cloudflare                |
| `pnpm astro ...`      | Run Astro CLI commands                         |

## 🌍 Internationalization

The site supports both Norwegian (default) and English:

- Default locale: Norwegian (`nb-NO`)
- Alternate locale: English (`en`)

Content can be localized by adding language suffixes to files or using Starlight's built-in i18n features.

## 🚀 Deployment

The site is deployed to Cloudflare Pages using Wrangler:

1. **Development deployment**: `pnpm devdeploy`
2. **Production**: Automatic deployment via GitHub integration

Configuration is managed through `wrangler.toml`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `pnpm dev`
5. Build to ensure no errors: `pnpm build`
6. Submit a pull request

## 📞 Contact

- GitHub: [hackheim/hackheimweb](https://github.com/hackheim/hackheimweb)
- Website: [hackheim.no](https://hackheim.no)
