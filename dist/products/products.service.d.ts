import { Product } from '../prisma/model/product.model';
export declare class ProductsService {
    private products;
    findAll(): Product[];
    findOne(id: string): any;
    create(name: string, type?: string, salesPrice?: number, costPrice?: number, notes?: string): Product;
    update(id: string, data: Partial<Product>): any;
    remove(id: string): void;
    addVariant(productId: string, name: string, priceAdjustment: number): any;
}
