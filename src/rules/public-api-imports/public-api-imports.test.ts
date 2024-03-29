const { RuleTester } = require("@typescript-eslint/utils/ts-eslint")
// TODO: Выяснить, как сделать import * from *


import { publicAPIImports } from './public-api-imports';

const options = [
  { 
    alias: '@',
    testFilesPatterns: [
      '**/*.test.*', '**/*.stories.*', '**/StoreDecorator.ts*'
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

ruleTester.run('public-api-imports', publicAPIImports, {
  valid: [
    {
      code: `import { AppLink } from '@/entities/Article';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/features/showArticle/ui/ArticleShow/ArticleShow.tsx',
      options
    },
    {
      code: `import { AppLink } from '../../ArticleView/ArticleView';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/features/showArticle/ui/ArticleShow/ArticleShow.tsx',
      options
    },
    {
      code: `import { AppLink } from '@/entities/Article/testing';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/features/showArticle/ui/ArticleShow/ArticleShow.test.ts',
      options
    },
    {
      code: `import { AppLink } from '@/entities/Article/testing';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/shared/config/storybook/StoreDecorator/StoreDecorator.tsx',
      options
    },
  ],
  invalid: [
    {
      code: `import { AppLink } from '@/entities/Article/ui/Article/Article.tsx';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/features/showArticle/ui/ArticleShow/ArticleShow.tsx',
      options,
      output: `import { AppLink } from '@/entities/Article';`,
      errors: [{
        messageId: 'publicApiImports'
      }]
    },
  ]
});
