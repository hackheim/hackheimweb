// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Hackheim",
      logo: {
        light: "./src/assets/logo.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: true,
      },
      sidebar: [
        {
          label: "Intro",
          translations: {
            en: "Intro",
          },
          items: [
            {
              label: "Bli med i Hackheim",
              translations: {
                en: "Join Hackheim",
              },
              slug: "wiki/welcome/join",
            },
            {
              label: "Regler",
              translations: {
                en: "Rules",
              },
              slug: "wiki/welcome/rules",
            },
            {
              label: "Utstyr",
              items: [
                {
                  label: "3D Printer",
                  slug: "wiki/welcome/equipment/3d-printer",
                },
                {
                  label: "Laserkutter",
                  slug: "wiki/welcome/equipment/laser",
                },
                {
                  label: "Trygge/Utrygge Materialer for Laser",
                  slug: "wiki/welcome/equipment/laser-materials",
                },
                {
                  label: "Våre materialer for laserkutting",
                  slug: "wiki/welcome/equipment/materialer",
                },
              ],
            },
            {
              label: "Kontakt oss",
              slug: "wiki/welcome/contact",
            },
          ],
        },
        // {
        //   label: "Dokumentasjon",
        //   autogenerate: { directory: "reference" },
        // },
      ],
      components: {
        Sidebar: "./src/components/starlight/Sidebar.astro",
        //Hero: "./src/components/starlight/Hero.astro",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/hackheim/hackheimweb",
        },
      ],
      defaultLocale: "root",
      locales: {
        root: {
          label: "Norsk",
          lang: "nb-NO",
        },
        en: {
          label: "English",
          lang: "en",
        },
      },
      editLink: {
        baseUrl: "https://github.com/hackheim/hackheimweb/edit/new/",
      },
      customCss: ["./src/styles/global.css"],
    }),
    svelte(),
    favicons({
      input: {
        favicons: ["public/favicon.svg"],
      },
      name: "Hackheim - Makerspace i Trondheim",
      short_name: "Hackheim",
    }),
  ],

  adapter: cloudflare(),
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    syntaxHighlight: "prism",
  },
});
