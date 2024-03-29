import { ESLintUtils } from "@typescript-eslint/utils";
import { isPathRelative } from "../../helpers";
const micromatch = require('micromatch');

type testingApiImportsOptions = {
  alias: string
  testFilesPatterns?: unknown[]
}

type MessageIds = 'testingApiImports'

export const testingAPIImports = ESLintUtils.RuleCreator.withoutDocs<testingApiImportsOptions[], MessageIds>({
  meta: {
    messages: {
      'testingApiImports': 'Тестовые данные необходимо импортировать из publicApi/testing.ts'
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
    type: 'problem'
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

        if (!isCurrentFileTesting) return;

        const value = node.source.value;
        
        if (isPathRelative(value)) {
          return;
        }

        const importFrom = alias ? value.replace(`${alias}/`, '') : value;
        const segments = importFrom.split('/');
        const layer = segments[0] || '';

        if(!checkingLayers[layer]) {
          return;
        }

        const isTestingApi = segments.length === 3 && segments[2] === 'testing';
        
        if (!isTestingApi) {
          context.report({
            node,
            messageId: "testingApiImports"
          })
        }
      }
    }
  }
})