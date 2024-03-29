const { RuleTester } = require("@typescript-eslint/utils/ts-eslint")
import { testingAPIImports } from './testing-api-imports';

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

ruleTester.run('testing-api-imports', testingAPIImports, {
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
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/features/showArticle/ui/ArticleShow/ArticleShow.stories.ts',
      options
    },
    {
      code: `import { AppLink } from '@/entities/Article/testing';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/shared/config/storybook/StoreDecorator/StoreDecorator.tsx',
      options
    },
    {
      code: `import { React } from 'react';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/shared/config/storybook/StoreDecorator/StoreDecorator.tsx',
      options
    },
  ],
  invalid: [
    {
      code: `import { AppLink } from '@/entities/Article';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/features/showArticle/ui/ArticleShow/ArticleShow.test.ts',
      options,
      errors: [{
        messageId: 'testingApiImports'
      }]
    },
    {
      code: `import { AppLink } from '@/entities/Article';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/features/showArticle/ui/ArticleShow/ArticleShow.stories.ts',
      options,
      errors: [{
        messageId: 'testingApiImports'
      }]
    },
    {
      code: `import { AppLink } from '@/entities/Article';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/shared/config/storybook/StoreDecorator/StoreDecorator.tsx',
      options,
      errors: [{
        messageId: 'testingApiImports'
      }]
    },
    {
      code: `import { AppLink } from '@/entities/Article/model/Article';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/shared/config/storybook/StoreDecorator/StoreDecorator.tsx',
      options,
      errors: [{
        messageId: 'testingApiImports'
      }]
    },
  ]
});
