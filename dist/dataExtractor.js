"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var syntax_1 = require("@synapse-medicine/syntax");
exports.extractData = function (program) {
    var props = [];
    var convert = function (statements) { return statements.map(function (statement) {
        if (statement == null)
            return statement;
        if (statement.type === 'PathExpression') {
            props.push(statement.parts[0]);
        }
        var keys = syntax_1.visitorKeys[statement.type];
        if (statement.type === 'BlockStatement') {
            var pathIndex = keys.findIndex(function (k) { return k === 'path'; });
            if (pathIndex !== -1)
                keys.splice(pathIndex, 1);
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
    return props;
};
