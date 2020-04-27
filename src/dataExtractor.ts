import { AST as Glimmer, visitorKeys } from '@synapse-medicine/syntax'

export const extractData = (program : Glimmer.Program) => {
  const props: string[] = []
  const stack: string[] = []
  const convert = (statements: Glimmer.Node[]) => statements.map((statement: Glimmer.Node) => {
    if (statement == null) return statement

    if (statement.type === 'PathExpression' && stack.indexOf(statement.parts[0]) === -1) {
      props.push(statement.parts[0])
    }

    const keys = visitorKeys[statement.type]
    if (statement.type === 'BlockStatement') {
      const pathIndex = keys.findIndex((k: string) => k === 'path')
      if (pathIndex !== -1) keys.splice(pathIndex, 1)

      if (statement.path.parts[0] === 'each') stack.push((<Glimmer.PathExpression>statement.params[0]).parts[0])
    }

    keys.forEach((key: string) => {
      if (Array.isArray((<any>statement)[key])) {
        (<any>statement)[key] = convert((<any>statement)[key])
      } else {
        (<any>statement)[key] = convert([(<any>statement)[key]])[0]
      }
    })

    if (statement.type === 'BlockStatement' && statement.path.parts[0] === 'each') stack.pop()
    return statement
  })
  program.body = <Glimmer.Statement[]>convert(program.body)
  return props
}
