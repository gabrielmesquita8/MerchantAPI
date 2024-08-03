import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Customer } from "./Customer";
import { Item } from "./Item";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Customer, customer => customer.purchases)
  buyer: Customer;

  @ManyToOne(() => Customer, customer => customer.sales, { nullable: true })
  seller: Customer;

  @ManyToOne(() => Item)
  item: Item;

  @Column()
  amount: number;

  @Column()
  total_price: number;

  @Column()
  timestamp: Date;
}