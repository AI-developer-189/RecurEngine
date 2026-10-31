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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let ProductsService = class ProductsService {
    constructor() {
        this.products = [];
    }
    findAll() {
        return this.products;
    }
    findOne(id) {
        return this.products.find((p) => p.id === id);
    }
    create(name, type, salesPrice = 0, costPrice = 0, notes) {
        const product = {
            id: crypto.randomUUID(),
            name,
            type,
            salesPrice,
            costPrice,
            notes,
            variants: [],
        };
        this.products.push(product);
        return product;
    }
    update(id, data) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new common_1.BadRequestException('Product not found');
        }
        const updated = { ...this.products[index], ...data };
        this.products[index] = updated;
        return updated;
    }
    remove(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1) {
            throw new common_1.BadRequestException('Product not found');
        }
        this.products.splice(index, 1);
    }
    addVariant(productId, name, priceAdjustment) {
        const product = this.products.find((p) => p.id === productId);
        if (!product) {
            throw new common_1.BadRequestException('Product not found');
        }
        product.variants.push({
            id: crypto.randomUUID(),
            name,
            priceAdjustment,
        });
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)()
], ProductsService);
