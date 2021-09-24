"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfec"] = self["webpackChunkfec"] || []).push([["client_src_components_PO_Image_jsx"],{

/***/ "./client/src/components/PO/Image.jsx":
/*!********************************************!*\
  !*** ./client/src/components/PO/Image.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar Image = function Image(props) {\n  var index = props.index,\n      thumb = props.thumb,\n      setPhotoIndex = props.setPhotoIndex;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    onClick: function onClick() {\n      setPhotoIndex(index);\n    },\n    onKeyPress: function onKeyPress() {},\n    tabIndex: 0,\n    role: \"button\",\n    value: index,\n    className: \"image-thumb\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"img\", {\n    alt: \"thumb\",\n    src: thumb\n  }));\n};\n\nImage.propTypes = {\n  index: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),\n  setPhotoIndex: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),\n  thumb: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)\n};\nImage.defaultProps = {\n  index: 0,\n  setPhotoIndex: null,\n  thumb: ''\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Image);\n\n//# sourceURL=webpack://fec/./client/src/components/PO/Image.jsx?");

/***/ })

}]);