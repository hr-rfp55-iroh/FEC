"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfec"] = self["webpackChunkfec"] || []).push([["client_src_components_RR_Rating_CharacteristicBar_jsx"],{

/***/ "./client/src/components/RR/Rating/CharacteristicBar.jsx":
/*!***************************************************************!*\
  !*** ./client/src/components/RR/Rating/CharacteristicBar.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar charcsRange = {\n  Size: ['Too Small', 'Perfect', 'Too Big'],\n  Width: ['Too Narrow', 'Perfect', 'Too Wide'],\n  Comfort: ['Poor', 'Great'],\n  Quality: ['Poor', 'Great'],\n  Length: ['Too Short ', 'Perfect', 'Too Long'],\n  Fit: ['Poor', 'Great']\n};\n\nvar CharacteristicBar = function CharacteristicBar(props) {\n  var info = props.info;\n  var charc = info.charc,\n      percent = info.percent;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"charc\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"charc-label\"\n  }, charc), percent > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    style: {\n      height: '15px',\n      marginLeft: \"\".concat(percent * 0.98, \"%\")\n    }\n  }, \"\\u25BE\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"charc-bar\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"bar-midpoint\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"charc-scale\"\n  }, charcsRange[charc].map(function (label) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n      key: label\n    }, label);\n  })));\n};\n\nCharacteristicBar.propTypes = {\n  info: prop_types__WEBPACK_IMPORTED_MODULE_1___default().objectOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().any))\n};\nCharacteristicBar.defaultProps = {\n  info: {}\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CharacteristicBar);\n\n//# sourceURL=webpack://fec/./client/src/components/RR/Rating/CharacteristicBar.jsx?");

/***/ })

}]);