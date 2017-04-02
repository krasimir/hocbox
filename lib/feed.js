'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = feed;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function feed(Component) {
  var _listener;
  var _defaultFeedProps = {};

  return function (_React$Component) {
    _inherits(FeedComponent, _React$Component);

    FeedComponent.feed = function feed(props) {
      _defaultFeedProps = props;
      if (_listener) _listener(props);
    };

    function FeedComponent(props) {
      _classCallCheck(this, FeedComponent);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this.state = { feedProps: _defaultFeedProps };
      _listener = function _listener(feedProps) {
        return _this.setState({ feedProps: feedProps });
      };
      return _this;
    }

    FeedComponent.prototype.render = function render() {
      return _react2.default.createElement(Component, _extends({}, this.props, this.state.feedProps));
    };

    return FeedComponent;
  }(_react2.default.Component);
}