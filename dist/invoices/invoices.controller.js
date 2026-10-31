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
exports.InvoicesController = void 0;
const common_1 = require("@nestjs/common");
const invoices_service_1 = require("./invoices.service");
const roles_guard_1 = require("../auth/roles.guard");
const user_roles_decorator_1 = require("../decorators/user-roles.decorator");
let InvoicesController = class InvoicesController {
    constructor(invoicesService) {
        this.invoicesService = invoicesService;
    }
    generate(subscriptionId) {
        return this.invoicesService.generateFromSubscription(subscriptionId);
    }
    confirm(invoiceId) {
        return this.invoicesService.confirmInvoice(invoiceId);
    }
    pay(invoiceId, dto) {
        return this.invoicesService.payInvoice(invoiceId, dto);
    }
    findAll() {
        return this.invoicesService.findAll();
    }
};
exports.InvoicesController = InvoicesController;
__decorate([
    (0, common_1.Post)('generate/:subscriptionId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Param)('subscriptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "generate", null);
__decorate([
    (0, common_1.Post)(':id/confirm'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)(':id/pay'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "pay", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoicesController.prototype, "findAll", null);
exports.InvoicesController = InvoicesController = __decorate([
    (0, common_1.Controller)('invoices'),
    __metadata("design:paramtypes", [invoices_service_1.InvoicesService])
], InvoicesController);
