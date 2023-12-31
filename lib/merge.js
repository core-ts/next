"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMergeState = void 0;
var react_1 = require("react");
function useMergeState(initialState) {
  var _a = (0, react_1.useState)(initialState ? initialState : {}), state = _a[0], _setState = _a[1];
  var callbackRef = (0, react_1.useRef)();
  var isFirstCallbackCall = (0, react_1.useRef)(true);
  var setState = (0, react_1.useCallback)(function (newState, callback) {
    callbackRef.current = callback;
    _setState(function (prevState) { return Object.assign({}, prevState, newState); });
  }, []);
  (0, react_1.useEffect)(function () {
    if (isFirstCallbackCall.current) {
      isFirstCallbackCall.current = false;
      return;
    }
    if (callbackRef.current) {
      callbackRef.current(state);
    }
  }, [state]);
  return [state, setState];
}
exports.useMergeState = useMergeState;
