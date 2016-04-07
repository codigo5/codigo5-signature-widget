(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Host = function () {
    function Host(_document) {
        _classCallCheck(this, Host);

        this._document = _document;
        this.hostname = this._document.location.hostname;
    }

    _createClass(Host, [{
        key: "title",
        get: function get() {
            return this._document.title;
        }
    }]);

    return Host;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Host;

},{}],2:[function(require,module,exports){
"use strict";

var signature_1 = require('./signature');
exports.VERSION = '1.0.0';
function bootstrap(_options) {
    var options = Object.assign({ selector: '.codigo5-signature-widget-wrapper' }, _options);
    // TODO: We could use ES6 babel polyfill, right? `Array.from`
    Array.prototype.slice.apply(document.querySelectorAll(options.selector)).forEach(function (element) {
        return element.cod5Signature = element.cod5Signature || new signature_1.default(element, options);
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bootstrap;
// Expose globally
//
// TODO: I really didn't like the way I did it
// I'd like to expose to window more in the es6 way
// like `export * from './signature'`
(function (global) {
    global.signatureWidget = {
        VERSION: exports.VERSION,
        bootstrap: bootstrap,
        Signature: signature_1.default,
        SignatureTheme: signature_1.SignatureTheme
    };
})(window['cod5'] = window['cod5'] || {});

},{"./signature":3}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var url_builder_1 = require('./url-builder');
var host_1 = require('./host');
(function (SignatureTheme) {
    SignatureTheme[SignatureTheme["dark"] = 0] = "dark";
    SignatureTheme[SignatureTheme["light"] = 1] = "light";
})(exports.SignatureTheme || (exports.SignatureTheme = {}));
var SignatureTheme = exports.SignatureTheme;
exports.SIGNATURE_URL = 'http://www.codigo5.com.br/';

var Signature = function () {
    function Signature(_element, options) {
        _classCallCheck(this, Signature);

        this._element = _element;
        this._options = Object.assign({}, Signature.defaultOptions, options);
        this._host = new host_1.default(window.document);
        this._urlBuilder = new url_builder_1.default(this._host);
        this.render();
    }

    _createClass(Signature, [{
        key: 'render',
        value: function render() {
            this._element.innerHTML = this.toString();
        }
    }, {
        key: 'toString',
        value: function toString() {
            return '\n      <div class="codigo5-signature-widget is-' + this.theme + '">\n        <a href="' + this.locationUrl + '" target="_blank" class="codigo5-signature-widget__logo">\n          <img src="' + this.logoUrl + '" width="' + this._options.logoWidth + '" height="' + this._options.logoHeight + '" />\n        </a>\n      </div>\n    ';
        }
    }, {
        key: 'locationUrl',
        get: function get() {
            return this._urlBuilder.url;
        }
    }, {
        key: 'logoUrl',
        get: function get() {
            return 'https://cdn.rawgit.com/codigo5/codigo5-signature-widget/master/resources/codigo5-logo-for-' + this.theme + '-theme.png';
        }
    }, {
        key: 'theme',
        get: function get() {
            return SignatureTheme[this._options.theme];
        }
    }]);

    return Signature;
}();

Signature.defaultOptions = {
    theme: SignatureTheme.light,
    logoWidth: 200,
    logoHeight: 49
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Signature;

},{"./host":1,"./url-builder":4}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var signature_widget_1 = require('./signature-widget');
var signature_1 = require('./signature');

var UrlBuilder = function () {
    function UrlBuilder(_host) {
        _classCallCheck(this, UrlBuilder);

        this._host = _host;
    }

    _createClass(UrlBuilder, [{
        key: 'url',
        get: function get() {
            return window.encodeURI(signature_1.SIGNATURE_URL + '?utm_source=' + this.utmSource + '&utm_medium=' + this.utmMedium);
        }
    }, {
        key: 'utmSource',
        get: function get() {
            return this._host.title + ' (' + this._host.hostname + ')';
        }
    }, {
        key: 'utmMedium',
        get: function get() {
            return 'Código5 Signature Widget v' + signature_widget_1.VERSION;
        }
    }]);

    return UrlBuilder;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UrlBuilder;

},{"./signature":3,"./signature-widget":2}]},{},[2]);
