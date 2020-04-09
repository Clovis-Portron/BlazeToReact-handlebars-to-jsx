"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@synapse-medicine/syntax");
var syntax_1 = require("@synapse-medicine/syntax");
exports.adaptForSpacebars = function (program) {
    var convert = function (statements) { return statements.map(function (statement) {
        if (statement == null)
            return statement;
        var keys = syntax_1.visitorKeys[statement.type];
        // Gestion du tag template
        /*if(statement.type == 'ElementNode' && statement.tag === 'template') {
          statement.tag = 'div';
        }*/
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
    //console.log(JSON.stringify(program.body, null, 2));
    return program;
};
