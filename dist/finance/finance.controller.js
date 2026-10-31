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
exports.FinanceController = void 0;
const common_1 = require("@nestjs/common");
const finance_service_1 = require("./finance.service");
const roles_guard_1 = require("../auth/roles.guard");
const user_roles_decorator_1 = require("../decorators/user-roles.decorator");
let FinanceController = class FinanceController {
    constructor(financeService) {
        this.financeService = financeService;
    }
    async getSummary(filters) {
        return this.financeService.getFinanceSummary();
    }
    async getActiveSubscriptions(filters) {
        return this.financeService.getActiveSubscriptions(filters);
    }
    async getCollectedRevenue(filters) {
        return this.financeService.getCollectedRevenue(filters);
    }
    async getOverdueInvoices() {
        return this.financeService.getOverdueInvoices();
    }
    async getRevenueByPeriod(dto) {
        return this.financeService.getRevenueByPeriod(dto.period, dto.startDate, dto.endDate);
    }
    async getTopCustomers(dto) {
        return this.financeService.getTopCustomers(dto.limit || 10);
    }
};
exports.FinanceController = FinanceController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('active-subscriptions'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "getActiveSubscriptions", null);
__decorate([
    (0, common_1.Get)('collected-revenue'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "getCollectedRevenue", null);
__decorate([
    (0, common_1.Get)('overdue-invoices'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "getOverdueInvoices", null);
__decorate([
    (0, common_1.Get)('revenue-by-period'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "getRevenueByPeriod", null);
__decorate([
    (0, common_1.Get)('top-customers'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, user_roles_decorator_1.USER_ROLES)('ADMIN', 'STAFF'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FinanceController.prototype, "getTopCustomers", null);
exports.FinanceController = FinanceController = __decorate([
    (0, common_1.Controller)('finance'),
    __metadata("design:paramtypes", [finance_service_1.FinanceService])
], FinanceController);
