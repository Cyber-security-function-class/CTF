'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.routes = function (app) {
        app.route('/').get(function (req, res) {
            res.status(200).json({ result: true });
        });
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map