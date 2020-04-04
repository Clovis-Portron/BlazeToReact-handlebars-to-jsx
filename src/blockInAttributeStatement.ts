import { AST as Glimmer }                                                  from '@glimmer/syntax'
import { resolveBlockStatement } from './blockStatements';
import { TextNode } from '@glimmer/syntax/dist/types/lib/types/nodes';
import { ContentStatement } from '@glimmer/syntax/dist/types/lib/types/handlebars-ast';


const AdaptStatement = (statement: Glimmer.Statement) : Glimmer.Statement => {
  if((<any>statement).type === 'ContentStatement') {
    return convertContentStatementToTextNode(<ContentStatement>statement);
  }
  if (statement.type === 'BlockStatement') {
    statement.program.body = statement.program.body.map(stat => AdaptStatement(stat));
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

export const resolveBlockInAttributeStatement = (statement: Glimmer.BlockStatement) => {
  // Conversion de ContentStatement vers TextNode étant donné que dans notre cas cela semble 
  // être toujours compatible 
  statement.program.body = statement.program.body.map(stat => AdaptStatement(stat));
  const res = resolveBlockStatement(statement);
  return res;
};
