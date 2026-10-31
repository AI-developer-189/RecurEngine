import { ProductsService } from './products.service';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    create(dto: {
        name: string;
        type?: string;
        salesPrice: number;
        costPrice: number;
        notes?: string;
    }): Product;
    findAll(): Product[];
    findOne(id: string): any;
    addVariant(productId: string, dto: {
        name: string;
        priceAdjustment: number;
    }): any;
}
