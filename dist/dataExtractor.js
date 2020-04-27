"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var syntax_1 = require("@synapse-medicine/syntax");
exports.extractData = function (program) {
    var props = [];
    var stack = [];
    var convert = function (statements) { return statements.map(function (statement) {
        if (statement == null)
            return statement;
        if (statement.type === 'PathExpression' && stack.indexOf(statement.parts[0]) === -1) {
            props.push(statement.parts[0]);
        }
        var keys = syntax_1.visitorKeys[statement.type];
        if (statement.type === 'BlockStatement') {
            var pathIndex = keys.findIndex(function (k) { return k === 'path'; });
            if (pathIndex !== -1)
                keys.splice(pathIndex, 1);
            if (statement.path.parts[0] === 'each')
                stack.push(statement.params[0].parts[0]);
        }
        keys.forEach(function (key) {
            if (Array.isArray(statement[key])) {
                statement[key] = convert(statement[key]);
            }
            else {
                statement[key] = convert([statement[key]])[0];
            }
        });
        if (statement.type === 'BlockStatement' && statement.path.parts[0] === 'each')
            stack.pop();
        return statement;
    }); };
    program.body = convert(program.body);
    return props;
};
