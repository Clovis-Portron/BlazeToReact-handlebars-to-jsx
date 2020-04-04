import { AST as Glimmer }                                                  from '@glimmer/syntax'
import { TextNode } from '@glimmer/syntax/dist/types/lib/types/nodes';
import { ContentStatement } from '@glimmer/syntax/dist/types/lib/types/handlebars-ast';


export const AdaptCustomMustacheStatement = (statement: Glimmer.Statement) : Glimmer.Statement => {
  if((<any>statement).type === 'ContentStatement') {
    return convertContentStatementToTextNode(<ContentStatement>statement);
  }
  if (statement.type === 'BlockStatement') {
    statement.program.body = statement.program.body.map(stat => AdaptCustomMustacheStatement(stat));
  }
  return statement;
} 

const convertContentStatementToTextNode = (contentStatement: ContentStatement ) => {
  const node: TextNode = {
    type: 'TextNode',
    chars: contentStatement.value,
    loc: contentStatement.loc,
  };
  return node;
}