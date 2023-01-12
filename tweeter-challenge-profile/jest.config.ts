 import { pathsToModuleNameMapper } from 'ts-jest'
 import { compilerOptions } from './tsconfig.json'
 import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [compilerOptions.baseUrl],
  roots: [
    "<rootDir>"
  ],
  testRegex: ".*\\..*spec\\.ts$",
  transform: {
    "^.+\\.ts?$": ["ts-jest", { compiler: "ttypescript" }]
  },
  testEnvironment: "node"
};

export default jestConfig;
