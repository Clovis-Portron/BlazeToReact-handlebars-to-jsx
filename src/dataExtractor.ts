import { AST as Glimmer, visitorKeys } from '@glimmer/syntax'

export const extractData = (program : Glimmer.Program) => {
  const props: string[] = []
  const convert = (statements: Glimmer.Node[]) => statements.map((statement: Glimmer.Node) => {
    if (statement == null) return statement

    if (statement.type === 'PathExpression') {
      props.push(statement.parts[0])
    }

    const keys = visitorKeys[statement.type]
    const pathIndex = keys.findIndex((k: string) => k === 'path')
    if (pathIndex !== -1) keys.splice(pathIndex, 1)

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
  return props
}
