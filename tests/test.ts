/* eslint-disable max-len */
import { compile, extractData } from '../'
import generate    from '@babel/generator'
import { preprocess } from '@synapse-medicine/syntax'

describe('each', () => {
  test('should convert to map', () => {
    const program: any = preprocess('{{#each entries}}{{ test }}{{/each}}')
    const a = generate(<any>compile(program, { isJSX: true }))
    expect(a.code).toBe('entries.map((item, i) => <React.Fragment key={i}>{item.test}</React.Fragment>);')
  })
})

describe('each in', () => {
  test('should convert to map', () => {
    const program: any = preprocess('{{#each entry in entries}}{{ test }}{{/each}}')
    const a = generate(<any>compile(program, { isJSX: true }))
    expect(a.code).toBe('entries.map((entry, i) => <React.Fragment key={i}>{test}</React.Fragment>);')
  })

  test('should convert to map', () => {
    const program: any = preprocess('{{#each entry in entries}}{{ entry.test }}{{/each}}')
    const a = generate(<any>compile(program, { isJSX: true }))
    expect(a.code).toBe('entries.map((entry, i) => <React.Fragment key={i}>{entry.test}</React.Fragment>);')
  })
})

describe('dataExtractor', () => {
  test('should not contain entry', () => {
    const program: any = preprocess('{{#each entry in entries}}{{ entry.test }}{{/each}}')
    const a = extractData(program)
    expect(a.length).toBe(2)
  })
})
