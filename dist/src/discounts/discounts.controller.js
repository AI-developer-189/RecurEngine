"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountsController = void 0;
const common_1 = require("@nestjs/common");
const discounts_service_1 = require("./discounts.service");
const roles_guard_1 = require("../auth/roles.guard");
const user_roles_decorator_1 = require("../decorators/user-roles.decorator");
let DiscountsController = class DiscountsController {
    constructor(discountsService) {
        this.discountsService = discountsService;
    }
    create(dto) {
        return this.discountsService.create(dto.code, dto.type, dto.value, dto.minPurchaseAmount, dto.minQuantity, dto.startDate, dto.endDate, dto.maxUsages, dto.applicableTo);
    }
    apply(dto) {
        return this.discountsService.applyDiscount(dto.subscriptionId, dto.invoiceId, dto.discountCode);
    }
    resetUsage(discountId) {
        return this.discountsService.resetUsage(discountId);
    }
    findAll() {
        return this.discountsService.findAll();
    }
};
exports.DiscountsController = DiscountsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('apply'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "apply", null);
__decorate([
    (0, common_1.Post)('reset/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "resetUsage", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "findAll", null);
exports.DiscountsController = DiscountsController = __decorate([
    (0, common_1.Controller)('discounts'),
    __metadata("design:paramtypes", [discounts_service_1.DiscountsService])
], DiscountsController);
