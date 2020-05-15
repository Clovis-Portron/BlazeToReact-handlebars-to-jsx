"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generator_1 = require("@babel/generator");
var program_1 = require("./program");
var spacebarsAdapter_1 = require("./spacebarsAdapter");
/**
 * Converts Handlebars code to JSX code
 * @param hbsCode Handlebars code to convert
 * @param [options] Compilation options
 * @param [options.isComponent] Should return JSX code wrapped as a function component
 * @param [options.isModule] Should return generated code exported as default
 * @param [options.includeImport] Should include react import
 */
function compile(hbsCode, options) {
    var isComponent = !!options.isComponent;
    var isModule = !!options.isModule;
    var includeImport = !!options.includeImport && isModule;
    // const code = preprocess(hbsCode)
    // console.log(JSON.stringify(code, null, 2));
    // return;
    var glimmerProgram = spacebarsAdapter_1.adaptForSpacebars(hbsCode);
    // return JSON.stringify(glimmerProgram);
    var babelProgram = program_1.createProgram(glimmerProgram, isComponent, isModule, includeImport);
    if (options.onlyAST)
        return babelProgram;
    return generator_1.default(babelProgram).code;
}
exports.compile = compile;
var dataExtractor_1 = require("./dataExtractor");
exports.extractData = dataExtractor_1.extractData;
