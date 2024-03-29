import { ESLintUtils } from "@typescript-eslint/utils";
import { isPathRelative } from "../../helpers";
const micromatch = require('micromatch');

type layersImportsOptions = {
  alias: string
  ignoreImportPatterns?: unknown[]
}

type MessageIds = 'layersImports'

const availableLayers: Record<string, string> = {
  'shared': 'shared',
  'entities': 'entities',
  'features': 'features',
  'widjets': 'widjets',
  'pages': 'pages',
  'app': 'app'
}

const layers: Record<string, string[]> = {
  'shared': ['shared'],
  'entities': ['entities', 'shared'],
  'features': ['entities', 'shared'],
  'widjets': ['features', 'entities', 'shared'],
  'pages': ['widjets', 'features', 'entities', 'shared'],
  'app': ['pages', 'widjets', 'features', 'entities', 'shared'],
}



export const layersImports = ESLintUtils.RuleCreator.withoutDocs<layersImportsOptions[], MessageIds>({
  meta: {
    messages: {
      'layersImports': 'Абсолютный импорт разрешен только из нижележащего слоя.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          ignoreImportPatterns: {
            type: 'array'
          }
        }
      }
    ],
    type: 'problem'
  },
  defaultOptions: [],
  create (context) {
    const { alias = '', ignoreImportPatterns = [] } = context.options[0] || {};
    

    const getCurrentFileLayer = () => {
      const filename = context.filename;
      const projectPath = filename.split('src')[1];
      const segments = projectPath?.split('/');

      return segments?.[1]
    }

    const getImportLayer = (value: string) => {
      const importFrom = alias ? value.replace(`${alias}/`, '') : value;

      return importFrom.split('/')[0]
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;

        if (isPathRelative(importPath)) return;

        const fileLayer = getCurrentFileLayer() ?? '';
        const importLayer = getImportLayer(importPath) ?? '';

        if (!availableLayers[fileLayer] || !availableLayers[importLayer]) return;

        const isIgnored = ignoreImportPatterns.some(pattern => {
          return micromatch.isMatch(importPath, pattern)
        })

        if (isIgnored) return;

        if (!layers[fileLayer]?.includes(importLayer)) {
          context.report({
            node,
            messageId: 'layersImports'
          })
        }
      }
    }
  }
})