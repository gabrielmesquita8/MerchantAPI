import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Item } from "./Item";
import { Transaction } from "./Transaction";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  customerName: string;

  @Column()
  codename: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  coins: number;

  @OneToMany(() => Item, item => item.owner)
  inventory: Item[];

  @OneToMany(() => Transaction, transaction => transaction.buyer)
  purchases: Transaction[];

  @OneToMany(() => Transaction, transaction => transaction.seller)
  sales: Transaction[];
}