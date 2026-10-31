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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let InvoicesService = class InvoicesService {
    constructor() {
        this.invoices = [];
        this.payments = [];
        this.subscriptions = [];
    }
    findAll() {
        return this.invoices;
    }
    findOne(id) {
        return this.invoices.find((i) => i.id === id);
    }
    generateFromSubscription(subscriptionId) {
        const subscription = this.getSubscription(subscriptionId);
        if (!subscription) {
            throw new common_1.BadRequestException('Subscription not found');
        }
        const customer = this.getCustomer(subscription.customerId);
        if (!customer) {
            throw new common_1.BadRequestException('Customer not found');
        }
        const subtotal = subscription.lineItems.reduce((sum, item) => sum + item.totalAmount, 0);
        const taxAmount = subtotal * subscription.taxRate;
        const totalAmount = subtotal + taxAmount;
        const invoice = {
            id: crypto.randomUUID(),
            uniqueIdentifier: `INV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            customerId: subscription.customerId,
            subscriptionId,
            status: 'DRAFT',
            issueDate: new Date(),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            subtotal,
            taxAmount,
            totalAmount,
            discountApplied: 0,
            notes: '',
            payments: [],
        };
        this.invoices.push(invoice);
        return invoice;
    }
    confirmInvoice(invoiceId) {
        const invoice = this.findOne(invoiceId);
        if (!invoice) {
            throw new common_1.BadRequestException('Invoice not found');
        }
        if (invoice.status !== 'DRAFT') {
            throw new common_1.BadRequestException('Only draft invoices can be confirmed');
        }
        invoice.status = 'CONFIRMED';
        return invoice;
    }
    payInvoice(invoiceId, paymentDto) {
        const invoice = this.findOne(invoiceId);
        if (!invoice) {
            throw new common_1.BadRequestException('Invoice not found');
        }
        if (invoice.status !== 'CONFIRMED') {
            throw new common_1.BadRequestException('Only confirmed invoices can be paid');
        }
        if (paymentDto.amount > invoice.totalAmount) {
            throw new common_1.BadRequestException('Payment amount exceeds invoice total');
        }
        // Mark as paid if full amount paid
        if (paymentDto.amount >= invoice.totalAmount) {
            invoice.status = 'PAID';
        }
        const payment = {
            id: crypto.randomUUID(),
            invoiceId,
            amount: paymentDto.amount,
            paymentMethod: paymentDto.paymentMethod,
            paymentDate: new Date(),
            note: paymentDto.note,
        };
        this.payments.push(payment);
        return { invoice, payment };
    }
    getCustomer(customerId) {
        // Would fetch from DB in real implementation
        return { id: customerId, email: 'test@test.com' };
    }
    getSubscription(subscriptionId) {
        // Would fetch from DB in real implementation
        return this.subscriptions.find((s) => s.id === subscriptionId) || null;
    }
};
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)()
], InvoicesService);
