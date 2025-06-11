import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

interface ProductProps {
  id: UniqueEntityID;
  descricao: string;

  createdAt: Date;
}

export class Product extends Entity<ProductProps> {
  get id(): UniqueEntityID {
    return this.props.id;
  }

  get descricao(): string {
    return this.props.descricao;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  set descricao(value: string) {
    this.props.descricao = value;
  }

  static create(
    props: Optional<ProductProps, "createdAt">,
    id?: UniqueEntityID
  ): Product {
    const product = new Product(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
    return product;
  }
}
