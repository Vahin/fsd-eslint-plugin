import { ESLintUtils } from "@typescript-eslint/utils";
import {  getRelativePath, shouldBeRelative } from "../../helpers";

type PathCheckerOptions = {
  alias: string
}

type MessageIds = 'pathShouldBeRelative'

export const pathChecker = ESLintUtils.RuleCreator.withoutDocs<PathCheckerOptions[], MessageIds>({
  meta: {
    messages: {
      'pathShouldBeRelative': 'В рамках одного слайса пути должны быть относительными.'
    },
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ],
    type: 'problem',
    fixable: "code"
  },
  defaultOptions: [],
  create (context) {
    const alias = context.options[0]?.alias || '';

    return {
      ImportDeclaration(node) {

        const toFilename = context.filename;
        const value = node.source.value;
        const importFrom = alias ? value.replace(`${alias}/`, '') : value;

        if (shouldBeRelative(importFrom, toFilename)) {
          context.report({
            node,
            messageId: 'pathShouldBeRelative',
            fix: (fixer) => {
              
              return fixer.replaceText(node.source, `'${getRelativePath(toFilename, importFrom)}'`)
            }
          })
        }
      }
    }
  }
})