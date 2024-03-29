import { layersImports } from './layers-imports';
const { RuleTester } = require("@typescript-eslint/utils/ts-eslint")

const options = [
  { 
    alias: '@',
    ignoreImportPatterns: [
      '**/StoreProvider'
    ]
  }
]

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
});

ruleTester.run('layers-imports', layersImports, {
  valid: [
    {
      // Относительный путь
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/entities/Article/ui/ArticlesListItem/ArticlesListItem.tsx',
      code: `import { ArticleBlockType, ArticleView } from '../../model/consts/consts';`,
      options
    },
    {
      // Импорт из слоя pages в слой app
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/app/App.tsx',
      code: `import { ArticleViewPage } from '@/pages/ArticleViewPage';`,
      options
    },
    {
      // Импорт из слоя shared в слой pages
      filename: '/Users/danil/Desktop/development/ulbiapp/app/pages/ui/Page.tsx',
      code: `import { simpleFunc } from '@/shared/libs/simpleFunc';`,
      options
    },
    {
      // Импорт из слоя entities в слой widgets
      filename: '/Users/danil/Desktop/development/ulbiapp/app/widjets/MegaWidjet/ui/Widjet.tsx',
      code: `import { Entity } from '@/entities/Entity';`,
      options
    },
    {
      // Импорт из слоя entities в слой features
      filename: '/Users/danil/Desktop/development/ulbiapp/app/features/simpleFeature/ui/feature.tsx',
      code: `import { Entity } from '@/entities/Entity';`,
      options
    },
    {
      // Импорт из слоя entities в слой entities
      filename: '/Users/danil/Desktop/development/ulbiapp/app/entities/SecondEntity/ui/SecondEntity.tsx',
      code: `import { Entity } from '@/entities/Entity';`,
      options
    },
    {
      // Импорт из вышележащего слоя с учетом исключений ignoreImportPatterns
      filename: '/Users/danil/Desktop/development/ulbiapp/app/entities/StoreDecorator/ui/StoreDecorator.tsx',
      code: `import { StateSchema } from '@/app/providers/StoreProvider.ts';`,
      options
    },
    {
      // Импорт из node_module
      filename: '/Users/danil/Desktop/development/ulbiapp/app/entities/Entity/ui/Entity.tsx',
      code: `import { canEverything } from 'super-functions';`,
      options
    },
    {
      // Импорт из node_module
      filename: '/Users/danil/Desktop/development/ulbiapp/app/index.ts',
      code: `import { Page } from '@/pages/Page';`,
      options
    },
  ],
  invalid: [
    {
      // Импорт из слоя app в слой pages
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/pages/ArticleViewPage/ui/ArticleViewPage.tsx',
      code: `import { App } from '@/app/App';`,
      options,
      errors: [{ messageId: 'layersImports'}]
    },
    {
      // Импорт из слоя features в слой entities
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/entities/Entity/ui/Entity.tsx',
      code: `import { feature } from '@/features/awesomeFeature';`,
      options,
      errors: [{ messageId: 'layersImports'}]
    },
    {
      // Импорт из слоя entities в слой shared
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/shared/ui/Block/Block.tsx',
      code: `import { Entity } from '@/entities/Entity';`,
      options,
      errors: [{ messageId: 'layersImports'}]
    },
  ]
});
