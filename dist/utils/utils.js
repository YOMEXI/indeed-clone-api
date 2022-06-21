"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieExtractor = void 0;
let cookieExtractor = function (req) {
    var token = null;
    let { cookie } = req.headers;
    if (req && cookie) {
        token = String(cookie.split('=')[1]);
    }
    return token;
};
exports.cookieExtractor = cookieExtractor;
//# sourceMappingURL=utils.js.map