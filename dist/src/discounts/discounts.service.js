"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountsService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let DiscountsService = class DiscountsService {
    constructor() {
        this.discounts = [];
    }
    findAll() {
        return this.discounts.filter((d) => d.status === 'ACTIVE');
    }
    findOne(id) {
        return this.discounts.find((d) => d.id === id);
    }
    create(code, type, value, minPurchaseAmount, minQuantity, startDate, endDate, maxUsages, applicableTo = 'global') {
        const discount = {
            id: crypto.randomUUID(),
            code,
            type,
            value,
            minPurchaseAmount,
            minQuantity,
            startDate,
            endDate,
            maxUsages,
            currentUsages: 0,
            status: 'ACTIVE',
            applicableTo,
            createdById: '',
            subscriptions: [],
        };
        this.discounts.push(discount);
        return discount;
    }
    applyDiscount(subscriptionId, invoiceId, discountCode) {
        const discount = this.discounts.find((d) => d.code === discountCode);
        if (!discount) {
            throw new common_1.BadRequestException('Discount not found');
        }
        // Check if discount is valid
        const now = new Date();
        if (now < discount.startDate) {
            throw new common_1.BadRequestException('Discount not yet active');
        }
        if (now > discount.endDate) {
            discount.status = 'EXPIRED';
            throw new common_1.BadRequestException('Discount has expired');
        }
        if (discount.maxUsages && discount.currentUsages >= discount.maxUsages) {
            discount.status = 'DEPLETED';
            throw new common_1.BadRequestException('Discount usage limit depleted');
        }
        // Check minimum purchase amount
        // Would need to get the invoice/subscription details
        // Apply discount
        discount.currentUsages += 1;
        return {
            discount,
            message: `Discount ${discount.code} applied successfully`,
        };
    }
    resetUsage(discountId) {
        const discount = this.findOne(discountId);
        if (!discount) {
            throw new common_1.BadRequestException('Discount not found');
        }
        discount.currentUsages = 0;
        discount.status = 'ACTIVE';
        return discount;
    }
};
exports.DiscountsService = DiscountsService;
exports.DiscountsService = DiscountsService = __decorate([
    (0, common_1.Injectable)()
], DiscountsService);
