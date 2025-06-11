import { MovimentRepository } from "../repositories/moviment-repository";
import { ProductRepository } from "../repositories/product-repository";

export class BuyProductList {
  constructor(
    private movimentRepository: MovimentRepository,
    private productRepository: ProductRepository // Adicione esta dependência
  ) {}

  async execute(startDate: Date, endDate: Date) {
    const moviments = await this.movimentRepository.findByTypeAndDateRange(
      "buy",
      startDate,
      endDate
    );

    const list = await Promise.all(
      moviments.map(async (moviment) => {
        const product = await this.productRepository.findById(
          moviment.productId.toString()
        );

        return {
          productId: moviment.productId,
          productDescription: product.descricao,
          date: moviment.date,
          price: moviment.price,
          color: moviment.color,
          size: moviment.size,
          quantity: moviment.quantity,
        };
      })
    );

    const listOrderedByDate = list.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    return listOrderedByDate;
  }
}
