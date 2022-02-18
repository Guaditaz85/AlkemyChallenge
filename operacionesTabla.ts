import {Field, ObjectType} from "type-graphql";
import { Entity, Column, CreateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Operaciones {
@Field()
@Column()
concepto!: string

@Field()
@Column()
monto!: number

@Field()
@CreateDateColumn({type:"timestamp"})
fecha!: number

@Field()
@Column()
tipo!: string
}