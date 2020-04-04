"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blockInAttributeStatement_1 = require("./blockInAttributeStatement");
exports.convertToSpacebars = function (program) {
    var convert = function (statements) { return statements.map(function (statement) {
        switch (statement.type) {
            case "ElementNode": {
                statement.children = convert(statement.children);
                statement.attributes.forEach(function (attrNode) {
                    attrNode.value = convert([attrNode.value])[0];
                });
                break;
            }
            case "BlockStatement": {
                statement.program.body = convert(statement.program.body);
                break;
            }
            case "MustacheStatement": {
                if (statement.custom) {
                    var custom = statement;
                    custom.program.body = custom.program.body.map(function (e) { return blockInAttributeStatement_1.AdaptCustomMustacheStatement(e); });
                    return custom;
                }
                break;
            }
            case "ConcatStatement": {
                //console.log(statement);
                statement.parts = convert(statement.parts);
                break;
            }
        }
        return statement;
    }); };
    program.body = convert(program.body);
    //console.log(JSON.stringify(program.body, null, 2));
    return program;
};
