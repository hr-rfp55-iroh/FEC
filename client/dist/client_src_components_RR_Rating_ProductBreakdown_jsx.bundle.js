"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfec"] = self["webpackChunkfec"] || []).push([["client_src_components_RR_Rating_ProductBreakdown_jsx"],{

/***/ "./client/src/components/RR/Rating/ProductBreakdown.jsx":
/*!**************************************************************!*\
  !*** ./client/src/components/RR/Rating/ProductBreakdown.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar CharacteristicBar = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {\n  return __webpack_require__.e(/*! import() */ \"client_src_components_RR_Rating_CharacteristicBar_jsx\").then(__webpack_require__.bind(__webpack_require__, /*! ./CharacteristicBar */ \"./client/src/components/RR/Rating/CharacteristicBar.jsx\"));\n});\n\nvar productBreakdown = function productBreakdown(charcsObj) {\n  var result = [];\n  var charcs = Object.keys(charcsObj);\n\n  for (var i = 0; i < charcs.length; i += 1) {\n    var charc = charcs[i];\n    var percent = (charcsObj[charc].value - 1) * 25 || 0;\n    result.push({\n      charc: charc,\n      percent: percent\n    });\n  }\n\n  return result;\n};\n\nvar ProductBreakdown = function ProductBreakdown(props) {\n  var characteristics = props.characteristics;\n  var barInfo = productBreakdown(characteristics);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"product-breakdown\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"rating-header\"\n  }, \"Product Experience\"), barInfo.map(function (info, index) {\n    var charBarCount = index + 1;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {\n      fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, \"Loading...\")\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(CharacteristicBar, {\n      info: info,\n      key: \"charBar-\".concat(charBarCount)\n    }));\n  }));\n};\n\nProductBreakdown.propTypes = {\n  characteristics: prop_types__WEBPACK_IMPORTED_MODULE_1___default().objectOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().any))\n};\nProductBreakdown.defaultProps = {\n  characteristics: {}\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductBreakdown);\n\n//# sourceURL=webpack://fec/./client/src/components/RR/Rating/ProductBreakdown.jsx?");

/***/ })

}]);