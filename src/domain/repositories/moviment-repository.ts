import { Moviment } from "../entities/moviment";

export interface MovimentRepository {
  create(moviment: Moviment): Promise<void>;

  findById(id: string): Promise<Moviment | null>;
  findAllByProductId(productId: string): Promise<Moviment[]>;
  findByTypeAndDateRange(
    type: "buy" | "sale",
    startDate: Date,
    endDate: Date
  ): Promise<Moviment[]>;
}
