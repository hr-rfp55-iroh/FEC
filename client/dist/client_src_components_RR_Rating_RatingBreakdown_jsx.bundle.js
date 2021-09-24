"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfec"] = self["webpackChunkfec"] || []).push([["client_src_components_RR_Rating_RatingBreakdown_jsx"],{

/***/ "./client/src/components/RR/Rating/RatingBreakdown.jsx":
/*!*************************************************************!*\
  !*** ./client/src/components/RR/Rating/RatingBreakdown.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar RatingBar = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.lazy)(function () {\n  return __webpack_require__.e(/*! import() */ \"client_src_components_RR_Rating_RatingBar_jsx\").then(__webpack_require__.bind(__webpack_require__, /*! ./RatingBar */ \"./client/src/components/RR/Rating/RatingBar.jsx\"));\n});\n\nvar ratingsBreakdown = function ratingsBreakdown(ratings) {\n  var result = [];\n  var values = Object.values(ratings);\n  var totalCount = values.reduce(function (memo, value) {\n    return memo + Number(value);\n  }, 0);\n\n  for (var i = 4; i >= 0; i -= 1) {\n    var barInfo = {};\n    barInfo.star = i + 1;\n    barInfo.ratingCount = ratings[i + 1] || 0;\n\n    if (totalCount) {\n      barInfo.percent = Math.round(Number(barInfo.ratingCount) * 100 / totalCount);\n    } else {\n      barInfo.percent = 0;\n    }\n\n    result.push(barInfo);\n  }\n\n  return result;\n};\n\nvar RatingBreakdown = function RatingBreakdown(props) {\n  var ratings = props.ratings,\n      handleRatingFilterClick = props.handleRatingFilterClick;\n  var barInfo = ratingsBreakdown(ratings);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"rating-breakdown\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"rating-header\"\n  }, \"Rating Breakdown\"), barInfo.map(function (info, index) {\n    var barCount = index + 1;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense, {\n      fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", null, \"Loading...\")\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RatingBar, {\n      info: info,\n      handleRatingFilterClick: handleRatingFilterClick,\n      key: \"bar-\".concat(barCount)\n    }));\n  }));\n};\n\nRatingBreakdown.propTypes = {\n  ratings: prop_types__WEBPACK_IMPORTED_MODULE_1___default().objectOf((prop_types__WEBPACK_IMPORTED_MODULE_1___default().any)),\n  handleRatingFilterClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func)\n};\nRatingBreakdown.defaultProps = {\n  ratings: {\n    1: '0',\n    2: '0',\n    3: '0',\n    4: '0',\n    5: '0'\n  },\n  handleRatingFilterClick: function handleRatingFilterClick() {}\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RatingBreakdown);\n\n//# sourceURL=webpack://fec/./client/src/components/RR/Rating/RatingBreakdown.jsx?");

/***/ })

}]);