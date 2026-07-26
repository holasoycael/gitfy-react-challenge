import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Meu Storybook',
    brandImage: '/brandtext__gb.svg',

    // 🎯 cores principais
    colorPrimary: '#1FB76B',

    // fundo geral da UI
    appBg: '#f7f9f0',
    appContentBg: '#ffffff',

    // toolbar / sidebar
    barBg: '#ffffff',
    barSelectedColor: '#1FB76B',

    // texto
    textColor: '#1a1a1a',
    textInverseColor: '#ffffff',

    // UI estados
    inputBg: '#ffffff',
    inputBorder: '#1FB76B',
    inputTextColor: '#1a1a1a'
  })
})
