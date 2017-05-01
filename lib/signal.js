'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getLog = getLog;
exports.clearLog = clearLog;
exports.dispatch = dispatch;
exports.subscribe = subscribe;
exports.unsubscribe = unsubscribe;
exports.signal = signal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignalStorage = {};
var SignalComponentID = 0;
var SignalLog = [];

function getNewId() {
  return ++SignalComponentID;
}

function getLog() {
  return SignalLog;
}

function clearLog() {
  SignalLog = [];
}

function dispatch(key, data, source) {
  SignalLog.push({
    key: key,
    data: data,
    source: source
  });
  if (SignalStorage[key]) {
    Object.keys(SignalStorage[key]).forEach(function (id) {
      SignalStorage[key][id](data);
    });
  }
}
function subscribe(key, signalID, callback) {
  if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
    Object.keys(key).forEach(function (k) {
      return subscribe(k, key[k]);
    });
    return;
  }
  if (!SignalStorage[key]) SignalStorage[key] = {};
  if (typeof signalID === 'function') {
    callback = signalID;
    signalID = getNewId();
  }
  if (!SignalStorage[key][signalID]) {
    SignalStorage[key][signalID] = callback;
  }
}
function unsubscribe(key, signalID) {
  if (key === null) {
    Object.keys(SignalStorage).forEach(function (key) {
      if (SignalStorage[key][signalID]) delete SignalStorage[key][signalID];
    });
  } else {
    if (SignalStorage[key][signalID]) delete SignalStorage[key][signalID];
  }
}

function signal(Component, subscribeTo) {
  return function (_React$Component) {
    _inherits(SignalComponent, _React$Component);

    function SignalComponent(props) {
      _classCallCheck(this, SignalComponent);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this._signalID = (Component.name || '') + '_' + getNewId();
      _this._dispatch = function (key, data) {
        dispatch(key, data, _this._signalID);
      };
      _this._subscribe = function () {
        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
          keys[_key] = arguments[_key];
        }

        keys.forEach(function (key) {
          subscribe(key, _this._signalID, function (data) {
            var _this$setState;

            return _this.setState((_this$setState = {}, _this$setState[key] = data, _this$setState));
          });
        });
      };
      _this._unsubscribe = function () {
        for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          keys[_key2] = arguments[_key2];
        }

        if (keys.length === 0) {
          unsubscribe(null, _this._signalID);
          return;
        }
        keys.forEach(function (key) {
          unsubscribe(key, _this._signalID);
        });
      };

      subscribeTo && subscribeTo.forEach(function (to) {
        return _this._subscribe(to);
      });
      Object.keys(props).forEach(function (prop) {
        if (props[prop] === true) _this._subscribe(prop);
      });
      return _this;
    }

    SignalComponent.prototype.render = function render() {
      return _react2.default.createElement(Component, _extends({}, this.props, this.state, {
        dispatch: this._dispatch,
        subscribe: this._subscribe,
        unsubscribe: this._unsubscribe }));
    };

    return SignalComponent;
  }(_react2.default.Component);
}