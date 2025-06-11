import { MovimentRepository } from "../repositories/moviment-repository";
import { ProductRepository } from "../repositories/product-repository";

interface ProductStockItem {
  id: string;
  description: string;
  color: string;
  size: string;
  stock: number;
}

export class ProductStockList {
  constructor(
    private movimentRepository: MovimentRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(): Promise<ProductStockItem[]> {
    // Buscar todos os movimentos

    const moviments = await this.movimentRepository.findAll();

    // Buscar todos os produtos
    const products = await this.productRepository.findAll();

    // Criar um mapa para facilitar a busca de produtos
    const productMap = new Map();
    products.forEach((product) => {
      productMap.set(product.id.toString(), product);
    });

    // Agrupar movimentos por produto + cor + tamanho
    const stockMap = new Map<string, number>();

    moviments.forEach((moviment) => {
      // Criar chave única: productId-color-size
      const key = `${moviment.productId.toString()}-${moviment.color}-${
        moviment.size
      }`;

      // Calcular quantidade (buy = positivo, sale = negativo)
      const quantity =
        moviment.type === "buy" ? moviment.quantity : -moviment.quantity;

      // Somar no estoque
      const currentStock = stockMap.get(key) || 0;
      stockMap.set(key, currentStock + quantity);
    });

    // Converter para lista de produtos com estoque
    const productStockList: ProductStockItem[] = [];

    stockMap.forEach((stock, key) => {
      const [productId, color, size] = key.split("-");
      const product = productMap.get(productId);

      if (product) {
        productStockList.push({
          id: productId,
          description: product.description || product.name, // ajuste conforme sua estrutura
          color,
          size,
          stock,
        });
      }
    });

    // Ordenar por descrição, cor e tamanho
    return productStockList.sort((a, b) => {
      if (a.description !== b.description) {
        return a.description.localeCompare(b.description);
      }
      if (a.color !== b.color) {
        return a.color.localeCompare(b.color);
      }
      return a.size.localeCompare(b.size);
    });
  }

  // Método auxiliar para buscar estoque de um produto específico
  async executeByProduct(productId: string): Promise<ProductStockItem[]> {
    const allStock = await this.execute();
    return allStock.filter((item) => item.id === productId);
  }

  // Método auxiliar para buscar produtos com estoque baixo
  async executeWithLowStock(minStock: number = 5): Promise<ProductStockItem[]> {
    const allStock = await this.execute();
    return allStock.filter((item) => item.stock <= minStock);
  }
}
