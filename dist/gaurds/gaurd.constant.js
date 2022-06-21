"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.STATUS_KEY = exports.STATUS = void 0;
const common_1 = require("@nestjs/common");
var STATUS;
(function (STATUS) {
    STATUS["APPLICANT"] = "applicant";
    STATUS["RECRUITER"] = "recruiter";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
exports.STATUS_KEY = 'status';
const Status = (...status) => (0, common_1.SetMetadata)(exports.STATUS_KEY, status);
exports.Status = Status;
//# sourceMappingURL=gaurd.constant.js.map