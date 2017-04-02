'use strict';

exports.__esModule = true;

var _feed = require('./feed');

var _feed2 = _interopRequireDefault(_feed);

var _di = require('./di');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { feed: _feed2.default, wire: _di.wire, register: _di.register, invalidate: _di.invalidate, clear: _di.clear };