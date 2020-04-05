"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/export */
var syntax_1 = require("@glimmer/syntax");
var generator_1 = require("@babel/generator");
var program_1 = require("./program");
var spacebarsAdapter_1 = require("./spacebarsAdapter");
function compile(hbsCode, options) {
    if (options === void 0) { options = true; }
    if (typeof options === 'boolean') {
        return compile(hbsCode, { isComponent: options });
    }
    var isComponent = !!options.isComponent;
    var isModule = !!options.isModule;
    var includeImport = !!options.includeImport && isModule;
    //const code = preprocess(hbsCode)
    //console.log(JSON.stringify(code, null, 2));
    //return;
    var glimmerProgram = spacebarsAdapter_1.adaptForSpacebars(syntax_1.preprocess(hbsCode));
    //return JSON.stringify(glimmerProgram);
    var babelProgram = program_1.createProgram(glimmerProgram, isComponent, isModule, includeImport);
    return generator_1.default(babelProgram).code;
}
exports.compile = compile;
