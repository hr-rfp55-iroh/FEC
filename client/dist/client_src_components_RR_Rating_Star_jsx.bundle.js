"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfec"] = self["webpackChunkfec"] || []).push([["client_src_components_RR_Rating_Star_jsx"],{

/***/ "./client/src/components/RR/Rating/Star.jsx":
/*!**************************************************!*\
  !*** ./client/src/components/RR/Rating/Star.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar ratingToStars = function ratingToStars(number) {\n  var stars = [];\n  var rating = number;\n\n  for (var i = 0; i < 5; i += 1) {\n    if (rating >= 0.875) {\n      stars.push('solid-star');\n    } else if (rating >= 0.625) {\n      stars.push('star-three-quarter');\n    } else if (rating >= 0.375) {\n      stars.push('star-half');\n    } else if (rating >= 0.125) {\n      stars.push('star-one-quarter');\n    } else {\n      stars.push('empty-star');\n    }\n\n    rating -= 1;\n  }\n\n  return stars;\n};\n\nvar keyNum = [1, 2, 3, 4, 5];\n\nvar Star = function Star(props) {\n  var rating = props.rating,\n      name = props.name;\n  var stars = ratingToStars(rating);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    className: \"avg-star-rating\"\n  }, stars.map(function (fileName, index) {\n    var path = \"./static/\".concat(fileName, \".svg\");\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"img\", {\n      src: path,\n      height: \"14\",\n      alt: \"star system\",\n      key: \"\".concat(name, \"-\").concat(fileName, \"-\").concat(keyNum[index])\n    });\n  }));\n};\n\nStar.propTypes = {\n  rating: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),\n  name: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)\n};\nStar.defaultProps = {\n  rating: 0,\n  name: ''\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Star);\n\n//# sourceURL=webpack://fec/./client/src/components/RR/Rating/Star.jsx?");

/***/ })

}]);