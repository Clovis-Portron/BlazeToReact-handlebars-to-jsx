/* eslint-disable import/export */
import { preprocess }    from '@glimmer/syntax'
import generate          from '@babel/generator'
import * as Babel        from '@babel/types'
import { createProgram } from './program'
import { adaptForSpacebars } from './spacebarsAdapter'; 

/**
 * Converts Handlebars code to JSX code
 * @param hbsCode Handlebars code to convert
 * @param [options] Compilation options
 * @param [options.isComponent] Should return JSX code wrapped as a function component
 * @param [options.isModule] Should return generated code exported as default
 * @param [options.includeImport] Should include react import
 */
export function compile(hbsCode: string, isComponent?: boolean): string
export function compile(
  hbsCode: string,
  options?: {
    isComponent?: boolean
    isModule?: boolean
    includeImport?: boolean
    isJSX?: boolean
  }
): string
export function compile(
  hbsCode: string,
  options: boolean | { isComponent?: boolean; isModule?: boolean; includeImport?: boolean; isJSX?: boolean } = true
): string | any {
  if (typeof options === 'boolean') {
    return compile(hbsCode, { isComponent: options })
  }

  const isComponent = !!options.isComponent
  const isModule = !!options.isModule
  const includeImport = !!options.includeImport && isModule
  //const code = preprocess(hbsCode)
  //console.log(JSON.stringify(code, null, 2));
  //return;

  const glimmerProgram = adaptForSpacebars(preprocess(hbsCode))
  //return JSON.stringify(glimmerProgram);
  const babelProgram: Babel.Program = createProgram(glimmerProgram, isComponent, isModule, includeImport)

  if(options.isJSX) return babelProgram


  return generate(babelProgram).code
}
