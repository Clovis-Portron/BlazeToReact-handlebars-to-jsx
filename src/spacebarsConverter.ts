import {
  Program,
  forOfStatement
} from "@babel/types";
import {
  AST as Glimmer
} from "@glimmer/syntax";


export const convertToSpacebars = (program: Glimmer.Program): Glimmer.Program => {
    const convert = (statements: Glimmer.Statement[]) => statements.map((statement: Glimmer.Statement | Glimmer.ConcatStatement) => {
      switch (statement.type) {
          case "ElementNode": {
            const elementNode = <Glimmer.ElementNode>statement;
            elementNode.children = convert(elementNode.children);
            elementNode.attributes.forEach((attrNode) => {
              attrNode.value = convert([<any>attrNode.value])[0];
            });
            return elementNode;
          }
          case "BlockStatement": {
            const blockStatement = <Glimmer.BlockStatement>statement;
            blockStatement.program.body = convert(blockStatement.program.body);
            console.log(blockStatement);
            //blockStatement.params = convertMultiplePathExpressionToFunctionExpression(blockStatement, blockStatement.params);
            if(blockStatement.inverse) {
              blockStatement.inverse.body = convert(blockStatement.inverse.body);
            }
            return blockStatement;
          }
          case "MustacheStatement": {
            const mustacheStatement = <Glimmer.MustacheStatement>statement;
            // Gestion des paths avec params (fonctions)
            //mustacheStatement.path = <any>convertPathWithParamsToFunctionExpression(mustacheStatement);
            return mustacheStatement;
          }
          case "ConcatStatement": {
            const concatStatement = <Glimmer.ConcatStatement>statement;
            //console.log(statement);
            concatStatement.parts = convert(concatStatement.parts);
            break;
          }
        }
        return <any>statement;
      });
      program.body = convert(program.body);
      //console.log(JSON.stringify(program.body, null, 2));
      return program;
    };