import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Moviment } from "../entities/moviment";
import { MovimentRepository } from "../repositories/moviment-repository";

interface BuyProductProps {
  productId: UniqueEntityID;
  date: Date;
  quantity: number;
  price: number;
  color: string;
  size: string;
}

export class BuyProduct {
  constructor(private movimentRepository: MovimentRepository) {}

  async execute({
    productId,
    date,
    quantity,
    price,
    color,
    size,
  }: BuyProductProps) {
    const moviment = Moviment.create({
      productId,
      id: new UniqueEntityID(),
      date,
      type: "buy",
      quantity,
      price,
      color,
      size,
    });

    this.movimentRepository.create(moviment);
    return moviment;
  }
}
