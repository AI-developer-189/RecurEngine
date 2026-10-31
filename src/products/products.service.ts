import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Product } from '../prisma/model/product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    return this.products.find((p) => p.id === id);
  }

  create(name: string, type?: string, salesPrice: number = 0, costPrice: number = 0, notes?: string) {
    const product: Product = {
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

  update(id: string, data: Partial<Product>) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new BadRequestException('Product not found');
    }
    const updated = { ...this.products[index], ...data };
    this.products[index] = updated;
    return updated;
  }

  remove(id: string) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new BadRequestException('Product not found');
    }
    this.products.splice(index, 1);
  }

  addVariant(productId: string, name: string, priceAdjustment: number) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    product.variants.push({
      id: crypto.randomUUID(),
      name,
      priceAdjustment,
    });
    return product;
  }
}