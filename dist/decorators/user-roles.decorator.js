"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLES = void 0;
const common_1 = require("@nestjs/common");
const USER_ROLES = (...roles) => (0, common_1.SetMetadata)('roles', roles);
exports.USER_ROLES = USER_ROLES;
