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

export const convertToSpacebars = (program: Glimmer.Program): Glimmer.Program => {
    const convert = (statements: Glimmer.Statement[]) => statements.map((statement: Glimmer.Statement | Glimmer.ConcatStatement) => {
      switch (statement.type) {
          case "ElementNode": {
            statement.children = convert(statement.children);
            statement.attributes.forEach((attrNode) => {
              attrNode.value = convert([<any>attrNode.value])[0];
            });
            break;
          }
          case "BlockStatement": {
            statement.program.body = convert(statement.program.body);
            break;
          }
          case "MustacheStatement": {
            if ((<any>statement).custom) {
              const custom = < any > statement;
              custom.program.body = custom.program.body.map((e: Glimmer.Statement) => AdaptCustomMustacheStatement(e));
              return custom;
            }
            break;
          }
          case "ConcatStatement": {
            //console.log(statement);
            statement.parts = convert(statement.parts);
            break;
          }
        }
        return statement;
      });
      program.body = convert(program.body);
      //console.log(JSON.stringify(program.body, null, 2));
      return program;
    };