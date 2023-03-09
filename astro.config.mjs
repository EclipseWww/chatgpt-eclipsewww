import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import { presetUno } from 'unocss'
import presetAttributify from '@unocss/preset-attributify'
import presetTypography from '@unocss/preset-typography'
import presetIcons from '@unocss/preset-icons'
import solidJs from '@astrojs/solid-js'
import vercelDisableBlocks from './plugins/vercelDisableBlocks'

import node from '@astrojs/node'
import vercel from '@astrojs/vercel/edge'

const envAdapter = () => {
  if (process.env.OUTPUT == 'vercel') {
    return vercel()
  } else {
    return node({
      mode: 'standalone'
    })
  }
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    unocss({
      presets: [
        presetAttributify(),
        presetUno(),
        presetTypography({
          cssExtend: {
            "ul,ol": {
              "padding-left": "2em"
            }
          }
        }),
        presetIcons(),
      ]
    }),
    solidJs()
  ],
  output: 'server',
  server: { 
    port: 3000,
    host:true
    },
  adapter: envAdapter(),
  vite: {
    plugins: [
      process.env.OUTPUT == 'vercel' && vercelDisableBlocks(),
    ]
  },
});