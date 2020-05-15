
/* eslint-disable import/export */
import { AST as Glimmer } from '@synapse-medicine/syntax'

/*
 * Converts Handlebars code to JSX code
 * @param hbsCode Handlebars code to JSX
 * @param options Compilation options
 * @param [options.isComponent] Should return JSX code wrapped as a function component
 * @param [options.isModule] Should return generated code exported as default
 * @param [options.includeImport] Should include react import
 * @param [options.onlyAST] Should only return JSX AST, not JSX
 * @returns JSX code or JSX AST tree
 */
export function compile(hbsCode: Glimmer.Program, options?: {
  isComponent?: boolean;
  isModule?: boolean,
  includeImport?: boolean,
  onlyAST?: boolean }): string | object

export function extractData(program: Glimmer.Program): string[]
