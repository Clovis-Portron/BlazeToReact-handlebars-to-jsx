"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
exports.convertMultiplePathExpressionToFunctionExpression = function (expressions) {
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
