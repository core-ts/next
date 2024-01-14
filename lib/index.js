"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function () { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetimeToString = exports.dateToString = exports.formatDate = exports.CurrencyInput = exports.Loading = exports.value = exports.checked = void 0;
var React = require("react");
var react_1 = require("react");
__exportStar(require("./formutil"), exports);
__exportStar(require("./util"), exports);
__exportStar(require("./core"), exports);
__exportStar(require("./state"), exports);
__exportStar(require("./edit"), exports);
__exportStar(require("./route"), exports);
__exportStar(require("./diff"), exports);
__exportStar(require("./merge"), exports);
__exportStar(require("./update"), exports);
__exportStar(require("./useSearch"), exports);
__exportStar(require("./useMessage"), exports);
__exportStar(require("./useEdit"), exports);
__exportStar(require("./search"), exports);
__exportStar(require("./reflect"), exports);
__exportStar(require("./com"), exports);
function checked(s, v) {
  if (s) {
    if (Array.isArray(s)) {
      return s.includes(v);
    }
    else {
      return s === v;
    }
  }
  return false;
}
exports.checked = checked;
function value(obj) {
  return (obj ? obj : {});
}
exports.value = value;
var Loading = function (props) {
  var loadingStyle = {
    top: '30%',
    backgroundColor: 'white',
    border: 'none',
    'WebkitBoxShadow': 'none',
    'boxShadow': 'none'
  };
  if (props.error) {
    return React.createElement('div', null, 'Error Load Module!');
  }
  else {
    return (React.createElement('div', { className: 'loader-wrapper' }, React.createElement('div', { className: 'loader-sign', style: loadingStyle }, React.createElement('div', { className: 'loader' }))));
  }
};
exports.Loading = Loading;
var CurrencyInput = function (props) {
  var _a = (0, react_1.useState)(undefined), state = _a[0], setState = _a[1];
  (0, react_1.useEffect)(function () {
    setState(props.value);
  }, [props.value]);
  var onChange = function (e) {
    var v1 = e.target.value;
    setState(v1);
    if (props.onChange) {
      props.onChange(e);
    }
    if (props.onChangeNumber) {
      props.onChangeNumber(parseFloat(v1));
    }
  };
  var onBlur = function (e) {
    if (props.allowZero && e.target.value === '0') {
      setState('0');
      return;
    }
    if (props.locale && props.currencyOnBlur) {
      props.currencyOnBlur(e, props.locale, props.currencyCode, props.symbol);
    }
    setTimeout(function () {
      var v2 = e.target.value;
      setState(v2);
    }, 50);
  };
  return React.createElement("input", { className: props.className, onBlur: onBlur, type: props.type, name: props.name, onChange: props.onChange ? props.onChange : onChange, disabled: props.disabled, "data-field": props['data-field'], min: props.min, max: props.max, value: state });
};
exports.CurrencyInput = CurrencyInput;
function formatDate(date, format) {
  if (!date) {
    return '';
  }
  var opts = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  var d2 = new Date(date).toLocaleString("en-US", opts);
  var od = format.replace("YYYY", d2.slice(6, 10));
  od = od.replace("MM", d2.slice(0, 2));
  od = od.replace("DD", d2.slice(3, 5));
  od = od.replace("HH", d2.slice(12, 14));
  od = od.replace("mm", d2.slice(15, 17));
  od = od.replace("ss", d2.slice(18, 20));
  return od;
}
exports.formatDate = formatDate;
;
function dateToString(date) {
  var d2 = typeof date !== "string" ? date : new Date(date);
  var year = d2.getFullYear();
  var month = String(d2.getMonth() + 1).padStart(2, "0");
  var day = String(d2.getDate()).padStart(2, "0");
  return "".concat(year, "-").concat(month, "-").concat(day);
}
exports.dateToString = dateToString;
;
function datetimeToString(date) {
  if (date === void 0) { date = ""; }
  var d2 = typeof date !== "string" ? date : new Date(date);
  var year = d2.getFullYear();
  var month = String(d2.getMonth() + 1).padStart(2, "0");
  var day = String(d2.getDate()).padStart(2, "0");
  var hours = String(d2.getHours()).padStart(2, "0");
  var minutes = String(d2.getMinutes()).padStart(2, "0");
  var seconds = String(d2.getSeconds()).padStart(2, "0");
  return "".concat(year, "-").concat(month, "-").concat(day, "T").concat(hours, ":").concat(minutes, ":").concat(seconds);
}
exports.datetimeToString = datetimeToString;
;
