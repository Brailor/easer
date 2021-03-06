'use strict';

var _encpwd = require('./encpwd/');

var _encpwd2 = _interopRequireDefault(_encpwd);

var _pdmsHemera = require('./pdmsHemera/');

var _pdmsHemera2 = _interopRequireDefault(_pdmsHemera);

var _webServer = require('./webServer/');

var _webServer2 = _interopRequireDefault(_webServer);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
    //    defaults: _.merge({}, /*encpwd.defaults, webServer.defaults, pdmsHemera.defaults*/),
    mediators: {
        webServer: _webServer2.default,
        pdms: _pdmsHemera2.default
    },
    commands: {
        encpwd: _encpwd2.default.execute
    }
};