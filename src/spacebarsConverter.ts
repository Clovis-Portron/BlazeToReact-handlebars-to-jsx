import {
  Program,
  forOfStatement
} from "@babel/types";
import {
  AST as Glimmer
} from "@glimmer/syntax";
import {
  AdaptCustomMustacheStatement
} from "./blockInAttributeStatement";

import { convertMultiplePathExpressionToFunctionExpression, convertPathWithParamsToFunctionExpression, FunctionExpression } from './FunctionExpression';

export const convertToSpacebars = (program: Glimmer.Program): Glimmer.Program => {
    const convert = (statements: Glimmer.Statement[]) => statements.map((statement: FunctionExpression | Glimmer.Statement | Glimmer.ConcatStatement) => {
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
            blockStatement.params = convertMultiplePathExpressionToFunctionExpression(blockStatement, blockStatement.params);
            if(blockStatement.inverse) {
              blockStatement.inverse.body = convert(blockStatement.inverse.body);
            }
            return blockStatement;
          }
          case "MustacheStatement": {
            const mustacheStatement = <Glimmer.MustacheStatement>statement;
            // Gestion particulière des Blocks dans Attributs
            if ((<any>mustacheStatement).custom) {
              const custom = <Glimmer.BlockStatement>statement;
              custom.params = convertMultiplePathExpressionToFunctionExpression(custom, custom.params);
              custom.program.body = custom.program.body.map((e: Glimmer.Statement) => AdaptCustomMustacheStatement(e));
              custom.program.body = convert(custom.program.body);
              if(custom.inverse) {
                custom.inverse.body = convert(custom.inverse.body);
              }
              return custom;
            }
            // Gestion des paths avec params (fonctions)
            mustacheStatement.path = <any>convertPathWithParamsToFunctionExpression(mustacheStatement);
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