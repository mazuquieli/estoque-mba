import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Moviment } from "../entities/moviment";
import { MovimentRepository } from "../repositories/moviment-repository";

interface SaleProductProps {
  productId: UniqueEntityID;
  date: Date;
  quantity: number;
  price: number;
  color: string;
  size: string;
}

export class SaleProduct {
  constructor(private movimentRepository: MovimentRepository) {}
  execute({ productId, date, quantity, price, color, size }: SaleProductProps) {
    const moviment = Moviment.create({
      productId,
      date,
      type: "sale",
      quantity,
      price,
      color,
      size,
    });

    this.movimentRepository.create(moviment);
    return moviment;
  }
}
