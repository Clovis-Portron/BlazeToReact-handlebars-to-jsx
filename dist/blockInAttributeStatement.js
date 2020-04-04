"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blockStatements_1 = require("./blockStatements");
var AdaptStatement = function (statement) {
    if (statement.type === 'ContentStatement') {
        return convertContentStatementToTextNode(statement);
    }
    if (statement.type === 'BlockStatement') {
        statement.program.body = statement.program.body.map(function (stat) { return AdaptStatement(stat); });
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
exports.resolveBlockInAttributeStatement = function (statement) {
    // Conversion de ContentStatement vers TextNode étant donné que dans notre cas cela semble 
    // être toujours compatible 
    statement.program.body = statement.program.body.map(function (stat) { return AdaptStatement(stat); });
    var res = blockStatements_1.resolveBlockStatement(statement);
    return res;
};
