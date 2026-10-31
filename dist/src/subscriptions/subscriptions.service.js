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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let SubscriptionsService = class SubscriptionsService {
    constructor() {
        this.subscriptions = [];
        this.lineItems = [];
    }
    findAll() {
        return this.subscriptions;
    }
    findOne(id) {
        return this.subscriptions.find((s) => s.id === id);
    }
    createFromQuote(customerId, planId) {
        const subscription = {
            id: crypto.randomUUID(),
            uniqueIdentifier: `SUB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            customerId,
            planId,
            startDate: new Date(),
            status: 'Draft',
            paymentTerms: 'Net 30',
            taxRate: 0.10,
            lineItems: [],
            invoices: [],
            payments: [],
        };
        this.subscriptions.push(subscription);
        return subscription;
    }
    transitionStatus(subscriptionId, newStatus) {
        const subscription = this.findOne(subscriptionId);
        if (!subscription) {
            throw new common_1.BadRequestException('Subscription not found');
        }
        const validTransitions = {
            Draft: ['Quotation'],
            Quotation: ['Confirmed', 'Closed'],
            Confirmed: ['Active', 'Closed'],
            Active: ['Closed'],
        };
        const allowedNextStates = validTransitions[subscription.status];
        if (!allowedNextStates || !allowedNextStates.includes(newStatus)) {
            throw new common_1.BadRequestException(`Invalid transition from ${subscription.status} to ${newStatus}. Allowed: ${allowedNextStates.join(', ')}`);
        }
        subscription.status = newStatus;
        return subscription;
    }
    addLineItem(subscriptionId, productId, quantity, unitPrice) {
        const subscription = this.findOne(subscriptionId);
        if (!subscription) {
            throw new common_1.BadRequestException('Subscription not found');
        }
        const totalAmount = unitPrice * quantity;
        const lineItem = {
            id: crypto.randomUUID(),
            subscriptionId,
            productId,
            quantity,
            unitPrice,
            taxAmount: 0,
            totalAmount,
            discountApplied: 0,
        };
        subscription.lineItems.push(lineItem);
        this.lineItems.push(lineItem);
        return lineItem;
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)()
], SubscriptionsService);
