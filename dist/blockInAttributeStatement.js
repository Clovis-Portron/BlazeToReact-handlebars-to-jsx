"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptCustomMustacheStatement = function (statement) {
    if (statement.type === 'ContentStatement') {
        return convertContentStatementToTextNode(statement);
    }
    if (statement.type === 'BlockStatement') {
        statement.program.body = statement.program.body.map(function (stat) { return exports.AdaptCustomMustacheStatement(stat); });
    }
    return statement;
};
var convertContentStatementToTextNode = function (contentStatement) {
    var node = {
        type: 'TextNode',
        chars: contentStatement.value,
        loc: contentStatement.loc,
    };
    return node;
};
