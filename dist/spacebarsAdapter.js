"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var syntax_1 = require("@synapse-medicine/syntax");
exports.adaptForSpacebars = function (program) {
    var convert = function (statements) { return statements.map(function (statement) {
        if (statement == null)
            return statement;
        var keys = syntax_1.visitorKeys[statement.type];
        // Gestion du "." pour passer l'ensemble des datas à l'enfant
        if (statement.type === 'PathExpression' && statement.parts.length === 0) {
            statement.original = 'props';
            statement.parts = ['props'];
        }
        keys.forEach(function (key) {
            if (Array.isArray(statement[key])) {
                statement[key] = convert(statement[key]);
            }
            else {
                statement[key] = convert([statement[key]])[0];
            }
        });
        return statement;
    }); };
    program.body = convert(program.body);
    return program;
};
