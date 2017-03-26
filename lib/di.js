'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.clear = clear;
exports.invalidate = invalidate;
exports.register = register;
exports.wire = wire;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Data = {};

function dependenciesToProps(dependencies, mapToProps, storage) {
  var deps = dependencies.map(function (key) {
    if (Data[storage][key]) return Data[storage][key];
    throw new Error('Hocbox: Missing dependency with key = "' + key + '"');
  });

  return mapToProps.apply({}, deps);
}
function registerDependenciesToPropsCallback(func, storage) {
  if (!Data[storage]) throw new Error('Hocbox: Missing storage with name = "' + storage + '"');
  if (!Data[storage].___dependenciesToProps___) Data[storage].___dependenciesToProps___ = [];
  Data[storage].___dependenciesToProps___.push(func);
}

function clear() {
  Data = {};
}

function invalidate() {
  var storage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hocbox';

  if (!Data[storage]) Data[storage] = {};
  if (!Data[storage].___dependenciesToProps___) Data[storage].___dependenciesToProps___ = [];
  Data[storage].___dependenciesToProps___.forEach(function (f) {
    return f();
  });
}

function register(dependencies) {
  var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hocbox';

  if (!Data[storage]) Data[storage] = {};
  Object.keys(dependencies).forEach(function (key) {
    return Data[storage][key] = dependencies[key];
  });
}

function wire(Component, dependencies, mapToProps) {
  var storage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'hocbox';

  var _getDepsProps = dependenciesToProps.bind({}, dependencies, mapToProps, storage);
  var _listener;

  registerDependenciesToPropsCallback(function () {
    return _listener && _listener();
  }, storage);

  return function (_React$Component) {
    _inherits(FeedComponent, _React$Component);

    function FeedComponent(props) {
      _classCallCheck(this, FeedComponent);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this.state = { depsProps: _getDepsProps() };
      _listener = function _listener() {
        return _this.setState({ depsProps: _getDepsProps() });
      };
      return _this;
    }

    FeedComponent.prototype.render = function render() {
      return _react2.default.createElement(Component, _extends({}, this.props, this.state.depsProps));
    };

    return FeedComponent;
  }(_react2.default.Component);
}