'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = waitFor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function waitFor(Component) {
  var _listener;
  var _defaultWaitForProps = {};
  var _ready = false;

  return {
    Component: function (_React$Component) {
      _inherits(FeedComponent, _React$Component);

      function FeedComponent(props) {
        _classCallCheck(this, FeedComponent);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = { waitForProps: _defaultWaitForProps };
        _listener = function _listener(waitForProps) {
          return _this.setState({ waitForProps: waitForProps });
        };
        return _this;
      }

      FeedComponent.prototype.render = function render() {
        return _ready ? _react2.default.createElement(Component, _extends({}, this.props, this.state.waitForProps)) : null;
      };

      return FeedComponent;
    }(_react2.default.Component),
    done: function done(props) {
      _defaultWaitForProps = props;
      _ready = true;
      if (_listener) _listener(props);
    }
  };
}