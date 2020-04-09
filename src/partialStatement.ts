import * as Babel                                          from '@babel/types'
import { AST } from '@synapse-medicine/syntax';
import { resolveExpression } from './expressions'; 

const createAttribute = (pair: AST.HashPair): Babel.JSXAttribute | null => {
  const name = Babel.jsxIdentifier(pair.key);
  const value = Babel.jsxExpressionContainer(resolveExpression(pair.value));
  return Babel.jsxAttribute(name, value);
}

/**
 * Converts partialStatement to JSXElement (call to component)
 */
export const convertToComponentCall = (statement : AST.PartialStatement): Babel.JSXElement => {
  const tagName = Babel.jsxIdentifier((<any>statement.name).original);
  const attributes = statement.hash.pairs.map((item: AST.HashPair) => createAttribute(item)).filter(Boolean) as Babel.JSXAttribute[]
  const isElementSelfClosing = true;

  return Babel.jsxElement(
    Babel.jsxOpeningElement(tagName, attributes, isElementSelfClosing),
    Babel.jsxClosingElement(tagName),
    [],
    isElementSelfClosing
  )
};

