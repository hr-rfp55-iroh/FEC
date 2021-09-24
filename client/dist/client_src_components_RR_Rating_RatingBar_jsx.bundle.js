"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfec"] = self["webpackChunkfec"] || []).push([["client_src_components_RR_Rating_RatingBar_jsx"],{

/***/ "./client/src/components/RR/Rating/RatingBar.jsx":
/*!*******************************************************!*\
  !*** ./client/src/components/RR/Rating/RatingBar.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar RatingBar = function RatingBar(props) {\n  var info = props.info,\n      handleRatingFilterClick = props.handleRatingFilterClick;\n  var star = info.star,\n      percent = info.percent,\n      ratingCount = info.ratingCount;\n\n  var handleBarClick = function handleBarClick() {\n    handleRatingFilterClick(star);\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"bar\",\n    onClick: handleBarClick,\n    onKeyPress: handleBarClick,\n    role: \"presentation\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"rating-star-label\"\n  }, star, \"\\xA0 stars\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"rating-bar\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    style: {\n      height: '100%',\n      width: \"\".concat(percent, \"%\"),\n      backgroundColor: 'green'\n    }\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"rating-count-label\"\n  }, ratingCount));\n};\n\nRatingBar.propTypes = {\n  info: prop_types__WEBPACK_IMPORTED_MODULE_1___default().objectOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().any)),\n  handleRatingFilterClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)\n};\nRatingBar.defaultProps = {\n  info: {\n    star: 1,\n    percent: 0,\n    ratingCount: 0\n  },\n  handleRatingFilterClick: function handleRatingFilterClick() {}\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RatingBar);\n\n//# sourceURL=webpack://fec/./client/src/components/RR/Rating/RatingBar.jsx?");

/***/ })

}]);