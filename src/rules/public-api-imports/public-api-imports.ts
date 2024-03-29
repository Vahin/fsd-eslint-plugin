import { ESLintUtils } from "@typescript-eslint/utils";
import { isPathRelative } from "../../helpers";
const micromatch = require('micromatch');

type publicAPIImportsOptions = {
  alias: string
  testFilesPatterns?: unknown[]
}

type MessageIds = 'publicApiImports'

export const publicAPIImports = ESLintUtils.RuleCreator.withoutDocs<publicAPIImportsOptions[], MessageIds>({
  meta: {
    messages: {
      'publicApiImports': 'Абсолютный импорт разрешен только из Public API (index.ts).',
    },
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          testFilesPatterns: {
            type: 'array'
          }
        }
      }
    ],
    type: 'problem',
    fixable: 'code'
  },
  defaultOptions: [],
  create (context) {
    const { alias = '', testFilesPatterns = [] } = context.options[0] || {};
    const checkingLayers: Record<string, string> = {
      'entities': 'entities',
      'features': 'features',
      'pages': 'pages',
      'widgets': 'widgets',
    }

    return {
      ImportDeclaration(node) {
        const currenFilepath = context.filename;
        const isCurrentFileTesting = testFilesPatterns.some(
          pattern => micromatch.isMatch(currenFilepath, pattern)
        )

        if (isCurrentFileTesting) return;

        const value = node.source.value;
        
        if (isPathRelative(value)) {
          return;
        }

        const importFrom = alias ? value.replace(`${alias}/`, '') : value;
        const segments = importFrom.split('/');
        const layer = segments[0] || '';
        const slice = segments[1] || '';

        if(!checkingLayers[layer]) {
          return;
        }
        
        if (segments.length > 2) {
          context.report({
            node,
            messageId: 'publicApiImports',
            fix: (fixer) => {
              return fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`)
            }
          })
        }
      }
    }
  }
})