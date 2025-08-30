// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Hackheim",
      logo: {
        src: "./src/assets/logo.png",
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
                  label: "Materialer for Laserkutter",
                  slug: "wiki/welcome/equipment/laser-materials",
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
  ],

  adapter: cloudflare(),
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
