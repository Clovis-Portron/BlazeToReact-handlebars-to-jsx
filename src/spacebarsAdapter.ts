import { AST as Glimmer } from '@glimmer/syntax';
import '@glimmer/syntax';
import { visitorKeys } from '@glimmer/syntax';

export const adaptForSpacebars = (program :  Glimmer.Program) => {
  const convert = (statements: Glimmer.Statement[]) => statements.map((statement: Glimmer.Statement) => {
    if(statement == null) return statement;
    const keys = visitorKeys[statement.type];

    // Gestion du tag template
    /*if(statement.type == 'ElementNode' && statement.tag === 'template') {
      statement.tag = 'div';
    }*/
    
    keys.forEach((key: string) => {
      if(Array.isArray((<any>statement)[key])) {
        (<any>statement)[key] = convert((<any>statement)[key]);
      } else {
        (<any>statement)[key] = convert([(<any>statement)[key]])[0];
      }
    });
    return statement;
  });
  program.body = convert(program.body);
    //console.log(JSON.stringify(program.body, null, 2));
  return program;
};