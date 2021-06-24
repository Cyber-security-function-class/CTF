"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerifiedDAO = void 0;
const EmailVerified_1 = require("../models/EmailVerified");
class EmailVerifiedDAO {
    constructor() {
        this.create = (EmailVerifiedInfo) => __awaiter(this, void 0, void 0, function* () {
            EmailVerified_1.EmailVerified.create(EmailVerifiedInfo);
        });
        this.getEmailVerified = (userId) => __awaiter(this, void 0, void 0, function* () {
            const emailVerified = yield EmailVerified_1.EmailVerified.findOne({
                where: { userId },
                raw: true
            });
            return emailVerified;
        });
        this.verifiyEmail = (userId) => __awaiter(this, void 0, void 0, function* () {
            yield EmailVerified_1.EmailVerified.update({ isVerified: true }, {
                where: { userId }
            });
        });
        this.updateToken = (EmailVerifiedInfo) => __awaiter(this, void 0, void 0, function* () {
            EmailVerified_1.EmailVerified.update({
                token: EmailVerifiedInfo.token
            }, {
                where: {
                    userId: EmailVerifiedInfo.userId
                }
            });
        });
    }
}
exports.EmailVerifiedDAO = EmailVerifiedDAO;
//# sourceMappingURL=EmailVerified.dao.js.map