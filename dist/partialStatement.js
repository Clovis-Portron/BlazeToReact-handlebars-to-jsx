"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Babel = require("@babel/types");
var expressions_1 = require("./expressions");
var createAttribute = function (pair) {
    var name = Babel.jsxIdentifier(pair.key);
    var value = Babel.jsxExpressionContainer(expressions_1.resolveExpression(pair.value));
    return Babel.jsxAttribute(name, value);
};
/**
 * Converts partialStatement to JSXElement (call to component)
 */
exports.convertToComponentCall = function (statement) {
    var tagName = Babel.jsxIdentifier(statement.name.original);
    var attributes = statement.hash.pairs.map(function (item) { return createAttribute(item); }).filter(Boolean);
    var isElementSelfClosing = true;
    return Babel.jsxElement(Babel.jsxOpeningElement(tagName, attributes, isElementSelfClosing), Babel.jsxClosingElement(tagName), [], isElementSelfClosing);
};
