"use strict";
const signature_1 = require('./signature');
exports.VERSION = '1.0.0';
function bootstrap(options) {
    Array.prototype.slice.apply(document.querySelectorAll(options.selector))
        .forEach((element) => element.cod5Signature = element.cod5Signature || new signature_1.default(element, options));
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bootstrap;
window['Codigo5'] = window['Codigo5'] || {};
window['Codigo5'].bootstrap = bootstrap;
