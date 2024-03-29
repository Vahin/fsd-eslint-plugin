import { layersImports } from "./rules/layers-imports/layers-imports";
import { pathChecker } from "./rules/path-checker/path-checker";
import { publicAPIImports } from "./rules/public-api-imports/public-api-imports";
import { testingAPIImports } from "./rules/testing-api-imports/testing-api-imports";

export = {
  rules: {
    'path-checker': pathChecker,
    'public-api-imports': publicAPIImports,
    'testing-api-imports': testingAPIImports,
    'layers-imports': layersImports
  }
}