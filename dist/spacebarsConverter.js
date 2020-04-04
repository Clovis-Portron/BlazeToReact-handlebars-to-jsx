"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blockInAttributeStatement_1 = require("./blockInAttributeStatement");
var FunctionExpression_1 = require("./FunctionExpression");
exports.convertToSpacebars = function (program) {
    var convert = function (statements) { return statements.map(function (statement) {
        switch (statement.type) {
            case "ElementNode": {
                var elementNode = statement;
                elementNode.children = convert(elementNode.children);
                elementNode.attributes.forEach(function (attrNode) {
                    attrNode.value = convert([attrNode.value])[0];
                });
                return elementNode;
            }
            case "BlockStatement": {
                var blockStatement = statement;
                blockStatement.program.body = convert(blockStatement.program.body);
                blockStatement.params = FunctionExpression_1.convertMultiplePathExpressionToFunctionExpression(blockStatement, blockStatement.params);
                if (blockStatement.inverse) {
                    blockStatement.inverse.body = convert(blockStatement.inverse.body);
                }
                return blockStatement;
            }
            case "MustacheStatement": {
                var mustacheStatement = statement;
                // Gestion particulière des Blocks dans Attributs
                if (mustacheStatement.custom) {
                    var custom = statement;
                    custom.params = FunctionExpression_1.convertMultiplePathExpressionToFunctionExpression(custom, custom.params);
                    custom.program.body = custom.program.body.map(function (e) { return blockInAttributeStatement_1.AdaptCustomMustacheStatement(e); });
                    custom.program.body = convert(custom.program.body);
                    if (custom.inverse) {
                        custom.inverse.body = custom.inverse.body.map(function (e) { return blockInAttributeStatement_1.AdaptCustomMustacheStatement(e); });
                        custom.inverse.body = convert(custom.inverse.body);
                    }
                    console.log(custom.inverse);
                    return custom;
                }
                // Gestion des paths avec params (fonctions)
                mustacheStatement.path = FunctionExpression_1.convertPathWithParamsToFunctionExpression(mustacheStatement);
                return mustacheStatement;
            }
            case "ConcatStatement": {
                var concatStatement = statement;
                //console.log(statement);
                concatStatement.parts = convert(concatStatement.parts);
                break;
            }
        }
        return statement;
    }); };
    program.body = convert(program.body);
    //console.log(JSON.stringify(program.body, null, 2));
    return program;
};
