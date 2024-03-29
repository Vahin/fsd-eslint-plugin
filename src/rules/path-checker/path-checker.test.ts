const { RuleTester } = require("@typescript-eslint/utils/ts-eslint")
import { pathChecker } from "./path-checker";

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
});

ruleTester.run('path-checker', pathChecker, {
  valid: [
    {
      code: `import { ArticleBlockType, ArticleView } from '../../model/consts/consts';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/entities/Article/ui/ArticlesListItem/ArticlesListItem.tsx'
    },
    {
      code: `import { AppLink } from '@/shared/ui/AppLink/AppLink';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/entities/Article/ui/ArticlesListItem/ArticlesListItem.tsx',
      options: [
        { alias: '@'}
      ]
    },
  ],
  invalid: [
    {
      code: `import { AppLink } from '@/entities/Article/ui/ArticleList/ArticleList.tsx';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/entities/Article/ui/ArticlesListItem/ArticlesListItem.tsx',
      options: [
        { alias: '@'}
      ],
      errors: [{
        messageId: 'pathShouldBeRelative'
      }],
      output: `import { AppLink } from '../ArticleList/ArticleList.tsx';`
    },
    {
      code: `import { AppLink } from 'entities/Article/ui/ArticleList/ArticleList.tsx';`,
      filename: '/Users/danil/Desktop/development/ulbiapp/app/src/entities/Article/ui/ArticlesListItem/ArticlesListItem.tsx',
      options: [
        { alias: '@'}
      ],
      errors: [{
        messageId: 'pathShouldBeRelative'
      }],
      output: `import { AppLink } from '../ArticleList/ArticleList.tsx';`
    },
  ]
});
