import { SourceLocation } from "@glimmer/syntax/dist/types/lib/types/handlebars-ast";
import { AST as Glimmer }                 from '@glimmer/syntax'
import { statement } from "@babel/template";


export interface FunctionExpression {
  type: string,
  parts: Glimmer.Expression[],
  loc: SourceLocation,
  data: boolean,
  original: string, 
  this: boolean,
};

export const convertMultiplePathExpressionToFunctionExpression = (statement: Glimmer.BlockStatement, expressions : Glimmer.Expression[]): any => {
  // Each ne peut pas être une fonction
  if(statement.path.original === 'each') return expressions;
  // Seul la forme correspondant à une liste de pathExpression peut être une fonction
  if(expressions.length <= 1 || expressions.filter(e => e.type != "PathExpression").length > 0) return expressions;
  const fun: FunctionExpression = {
    type: "FunctionExpression", 
    parts: expressions,
    loc: <any>expressions[0].loc,
    data: false, 
    original: '',
    this: false,
  };
  const result: Glimmer.Expression[] = [<any>fun];
  return result;
}

export const convertPathWithParamsToFunctionExpression = (statement: Glimmer.MustacheStatement) => {
  if(statement.params.length == 0) return statement.path;

  const fun: FunctionExpression = {
    type: "FunctionExpression", 
    parts: [JSON.parse(JSON.stringify(statement.path)), ...statement.params],
    loc: <any>statement.loc,
    data: false, 
    original: '',
    this: false,
  };

  return fun;
}
