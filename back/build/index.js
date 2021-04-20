'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const app_1 = __importDefault(require("./app"));
const models_1 = __importDefault(require("./app/models"));
require("dotenv");
const PORT = process.env.PORT || 7000;
const server = (PORT, app) => __awaiter(void 0, void 0, void 0, function* () {
    app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.default.sequelize.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log("database connection success");
            const driver = () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield models_1.default.sequelize.sync();
                }
                catch (err) {
                    console.error('database sycn failed');
                    console.error(err);
                    return;
                }
                console.log('database sync success');
            });
            driver(); // sequelize sync
        }))
            .catch((e) => {
            console.log("database connection failed\n", e);
        });
        console.info(`Server running on port ${PORT}`);
    }));
});
exports.server = server;
exports.server(PORT, app_1.default);
//# sourceMappingURL=index.js.map