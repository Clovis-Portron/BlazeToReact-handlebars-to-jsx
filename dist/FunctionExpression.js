"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.convertMultiplePathExpressionToFunctionExpression = function (statement, expressions) {
    // Each ne peut pas être une fonction
    if (statement.path.original === 'each')
        return expressions;
    // Seul la forme correspondant à une liste de pathExpression peut être une fonction
    if (expressions.length <= 1 || expressions.filter(function (e) { return e.type != "PathExpression"; }).length > 0)
        return expressions;
    var fun = {
        type: "FunctionExpression",
        parts: expressions,
        loc: expressions[0].loc,
        data: false,
        original: '',
        this: false,
    };
    var result = [fun];
    return result;
};
exports.convertPathWithParamsToFunctionExpression = function (statement) {
    if (statement.params.length == 0)
        return statement.path;
    var fun = {
        type: "FunctionExpression",
        parts: __spreadArrays([JSON.parse(JSON.stringify(statement.path))], statement.params),
        loc: statement.loc,
        data: false,
        original: '',
        this: false,
    };
    return fun;
};
