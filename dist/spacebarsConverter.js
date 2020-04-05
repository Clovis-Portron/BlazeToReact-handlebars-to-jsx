"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                console.log(blockStatement);
                //blockStatement.params = convertMultiplePathExpressionToFunctionExpression(blockStatement, blockStatement.params);
                if (blockStatement.inverse) {
                    blockStatement.inverse.body = convert(blockStatement.inverse.body);
                }
                return blockStatement;
            }
            case "MustacheStatement": {
                var mustacheStatement = statement;
                // Gestion des paths avec params (fonctions)
                //mustacheStatement.path = <any>convertPathWithParamsToFunctionExpression(mustacheStatement);
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
