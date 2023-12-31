"use strict";
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCoreView = exports.useView = exports.useViewOne = void 0;
var react_1 = require("react");
var router_1 = require("next/router");
var core_1 = require("./core");
var formutil_1 = require("./formutil");
var merge_1 = require("./merge");
var useViewOne = function (p) {
  return (0, exports.useCoreView)(p.refForm, p.initialState, p.service, p, p);
};
exports.useViewOne = useViewOne;
var useView = function (refForm, initialState, service, p1, p) {
  var baseProps = (0, exports.useCoreView)(refForm, initialState, service, p1, p);
  var _a = (0, merge_1.useMergeState)(initialState), setState = _a[1];
  var router = (0, router_1.useRouter)();
  (0, react_1.useEffect)(function () {
    if (baseProps.refForm) {
      (0, core_1.initForm)(baseProps.refForm.current);
    }
    var id = (0, core_1.buildId)(router.query, p ? p.keys : undefined);
    if (id) {
      if (p && p.initialize) {
        p.initialize(id, baseProps.load, setState, p.callback);
      }
      else {
        baseProps.load(id, p ? p.callback : undefined);
      }
    }
  }, []);
  return __assign({}, baseProps);
};
exports.useView = useView;
var useCoreView = function (refForm, initialState, service, p1, p) {
  var _a = (0, merge_1.useMergeState)(initialState), state = _a[0], setState = _a[1];
  var _b = (0, react_1.useState)(), running = _b[0], setRunning = _b[1];
  var router = (0, router_1.useRouter)();
  var back = function (event) {
    if (event) {
      event.preventDefault();
    }
    router.back();
  };
  var getModelName = function (f) {
    if (p && p.name) {
      return p.name;
    }
    return (0, core_1.getModelName)(f, 'model');
  };
  var showModel = function (model) {
    var n = getModelName(refForm.current);
    var objSet = {};
    objSet[n] = model;
    setState(objSet);
  };
  var _handleNotFound = function (form) {
    var msg = (0, core_1.message)(p1.resource.value, 'error_not_found', 'error');
    if (form) {
      (0, formutil_1.readOnly)(form);
    }
    p1.showError(msg.message, msg.title);
  };
  var handleNotFound = (p && p.handleNotFound ? p.handleNotFound : _handleNotFound);
  var _load = function (_id, callback) {
    var id = _id;
    if (id != null && id !== '') {
      setRunning(true);
      (0, core_1.showLoading)(p1.loading);
      var fn = (typeof service === 'function' ? service : service.load);
      fn(id).then(function (obj) {
        if (!obj) {
          handleNotFound(refForm.current);
        }
        else {
          if (callback) {
            callback(obj, showModel);
          }
          else {
            showModel(obj);
          }
        }
        setRunning(false);
        (0, core_1.hideLoading)(p1.loading);
      }).catch(function (err) {
        var data = (err && err.response) ? err.response : err;
        var r = p1.resource;
        var title = r.value('error');
        var msg = r.value('error_internal');
        if (data && data.status === 404) {
          handleNotFound(refForm.current);
        }
        else {
          if (data && data.status) {
            msg = (0, core_1.messageByHttpStatus)(data.status, r.value);
          }
          (0, formutil_1.readOnly)(refForm.current);
          p1.showError(msg, title);
        }
        setRunning(false);
        (0, core_1.hideLoading)(p1.loading);
      });
    }
  };
  var load = (p && p.load ? p.load : _load);
  return {
    state: state,
    setState: setState,
    refForm: refForm,
    resource: p1.resource.resource(),
    running: running,
    setRunning: setRunning,
    showModel: showModel,
    getModelName: getModelName,
    handleNotFound: handleNotFound,
    load: load,
    back: back
  };
};
exports.useCoreView = useCoreView;
