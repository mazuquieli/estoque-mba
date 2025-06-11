import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Product } from "../entities/product";
import { ProductRepository } from "../repositories/product-repository";

interface ProductProps {
  description: string;
}

export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute({ description }: ProductProps) {
    const product = Product.create({
      descricao: description,
      id: new UniqueEntityID(),
    });

    await this.productRepository.create(product);
    return product;
  }
}
