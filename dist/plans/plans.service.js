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
exports.PlansService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let PlansService = class PlansService {
    constructor() {
        this.plans = [];
    }
    findAll() {
        return this.plans.filter((p) => p.isActive);
    }
    findOne(id) {
        return this.plans.find((p) => p.id === id);
    }
    create(name, billingFrequency, minimumQuantity, dateAvailability, closeAutomatically = true, canBeManuallyClosed = false, canBePaused = false, canBeRenewed = false) {
        const plan = {
            id: crypto.randomUUID(),
            name,
            billingFrequency: billingFrequency,
            minimumQuantity,
            dateAvailability,
            closeAutomatically,
            canBeManuallyClosed,
            canBePaused,
            canBeRenewed,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            subscriptions: [],
        };
        this.plans.push(plan);
        return plan;
    }
    update(id, data) {
        const index = this.plans.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new common_1.BadRequestException('Plan not found');
        }
        const updated = { ...this.plans[index], ...data };
        this.plans[index] = updated;
        return updated;
    }
    remove(id) {
        const index = this.plans.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new common_1.BadRequestException('Plan not found');
        }
        this.plans.splice(index, 1);
    }
    setStatus(id, isActive) {
        const plan = this.findOne(id);
        if (!plan) {
            throw new common_1.BadRequestException('Plan not found');
        }
        plan.isActive = isActive;
        plan.updatedAt = new Date();
        return plan;
    }
};
exports.PlansService = PlansService;
exports.PlansService = PlansService = __decorate([
    (0, common_1.Injectable)()
], PlansService);
