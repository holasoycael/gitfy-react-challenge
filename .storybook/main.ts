/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/postcss'

// types and interfaces
import type { StorybookConfig } from '@storybook/react-webpack5'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-a11y'],
  staticDirs: ['../public'],
  framework: '@storybook/react-webpack5',
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.modules = [...(config.resolve.modules || []), path.resolve(__dirname, '../src')]
    }

    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin) => plugin?.constructor?.name !== 'ProgressPlugin')
    }

    if (config.module) {
      config.module.exprContextCritical = false
    }

    if (config.module?.rules) {
      // Find the rule that handles CSS files and configure css-loader and postcss-loader
      const findAndConfigureCSSLoader = (rules: any[]) => {
        rules.forEach((rule) => {
          if (!rule) return
          if (rule.oneOf) {
            findAndConfigureCSSLoader(rule.oneOf)
          }
          if (rule.use && Array.isArray(rule.use)) {
            let hasPostCSSLoader = false
            rule.use.forEach((useItem: any) => {
              const loaderName = typeof useItem === 'string' ? useItem : useItem.loader
              if (loaderName && loaderName.includes('postcss-loader')) {
                hasPostCSSLoader = true
              }
            })

            let cssLoaderIndex = -1
            rule.use = rule.use.map((useItem: any, idx: number) => {
              const loaderName = typeof useItem === 'string' ? useItem : useItem.loader
              if (loaderName && loaderName.includes('css-loader')) {
                cssLoaderIndex = idx
                const options = typeof useItem === 'object' ? useItem.options || {} : {}
                return {
                  loader: loaderName,
                  options: {
                    ...options,
                    url: {
                      filter: (url: string) => !url.startsWith('/')
                    }
                  }
                }
              }
              return useItem
            })

            // If css-loader is found and postcss-loader is not present, add it
            if (cssLoaderIndex !== -1 && !hasPostCSSLoader) {
              rule.use.splice(cssLoaderIndex + 1, 0, {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [tailwindcss]
                  }
                }
              })
            }
          }
        })
      }

      findAndConfigureCSSLoader(config.module.rules)
    }

    return config
  }
}
export default config
