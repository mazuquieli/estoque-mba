import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

interface MovimentProps {
  id: UniqueEntityID;
  date: Date;
  type: "buy" | "sale";
  productId: UniqueEntityID;
  quantity: number;
  price: number;
  color: string;
  size: string;
  createdAt: Date;
}

export class Moviment extends Entity<MovimentProps> {
  get id(): UniqueEntityID {
    return this.props.id;
  }
  get date(): Date {
    return this.props.date;
  }
  get type(): "buy" | "sale" {
    return this.props.type;
  }
  get productId(): UniqueEntityID {
    return this.props.productId;
  }
  get quantity(): number {
    return this.props.quantity;
  }
  get price(): number {
    return this.props.price;
  }
  get color(): string {
    return this.props.color;
  }
  get size(): string {
    return this.props.size;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }

  set date(value: Date) {
    this.props.date = value;
  }
  set type(value: "buy" | "sale") {
    this.props.type = value;
  }
  set productId(value: UniqueEntityID) {
    this.props.productId = value;
  }
  set quantity(value: number) {
    if (this.type === "sale") this.props.quantity = value * -1;
    else this.props.quantity = value;
  }
  set price(value: number) {
    this.props.price = value;
  }
  set color(value: string) {
    this.props.color = value;
  }
  set size(value: string) {
    this.props.size = value;
  }

  static create(
    props: Optional<MovimentProps, "createdAt" | "id">,
    id?: UniqueEntityID
  ): Moviment {
    const moviment = new Moviment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        id: props.id ?? new UniqueEntityID(),
      },
      id
    );
    return moviment;
  }
}
