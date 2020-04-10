import { AST as Glimmer, visitorKeys } from '@synapse-medicine/syntax'

export const adaptForSpacebars = (program : Glimmer.Program) => {
  const convert = (statements: Glimmer.Node[]) => statements.map((statement: Glimmer.Node) => {
    if (statement == null) return statement
    const keys = visitorKeys[statement.type]

    // Gestion du "." pour passer l'ensemble des datas à l'enfant
    if (statement.type === 'PathExpression' && statement.parts.length === 0) {
      statement.original = 'props'
      statement.parts = ['props']
    }
    keys.forEach((key: string) => {
      if (Array.isArray((<any>statement)[key])) {
        (<any>statement)[key] = convert((<any>statement)[key])
      } else {
        (<any>statement)[key] = convert([(<any>statement)[key]])[0]
      }
    })
    return statement
  })
  program.body = <Glimmer.Statement[]>convert(program.body)
  return program
}
