import { AST as Glimmer } from '@glimmer/syntax';
import { resolveExpression, resolveStatementParametersExpression } from './expressions';

export const resolveMustacheStatement = (statement: Glimmer.MustacheStatement | Glimmer.SubExpression) => {
  if(statement.params.length > 0) {
    return resolveStatementParametersExpression([statement.path, ...statement.params]);
  }
  return resolveExpression(statement.path);
};