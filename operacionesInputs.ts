import { Field } from "type-graphql"
import { InputType } from "type-graphql"
import { IsString, Length } from "class-validator";

@InputType()
export class ConceptoCrearInput {
    @Field()
    @Length(3, 64)
    @IsString()
    concepto!: string

    @Field()
    @Length(3, 64)
    monto!: number

    @Field()
    fecha!: number

    @Field()
    @Length(3, 64)
    @IsString()
    tipo!: string

}
@InputType()
export class TipoInput {
    @Field()
    @Length(3, 64)
    @IsString()
    tipo!: string
}

@InputType()
export class ConceptoUpdateInput {
    @Field()
    @Length(3, 64)
    @IsString()
    concepto!: string
    
    @Field()
    @Length(3, 64)
    monto!: number
    
    @Field()
    fecha!: number
}
@InputType()
export class BorrarConceptoInput{
    @Field()
    @Length(3, 64)
    @IsString()
    concepto!: string
    
    @Field()
    @Length(3, 64)
    monto!: number
    
    @Field()
    fecha!: number
    
    @Field()
    @Length(3, 64)
    @IsString()
    tipo!: string 
}

@InputType()
export class UnConceptoInput{
    @Field()
    @Length(3, 64)
    @IsString()
    concepto!: string
    
    @Field()
    @Length(3, 64)
    monto!: number
    
    @Field()
    fecha!: number
    
    @Field()
    @Length(3, 64)
    @IsString()
    tipo!: string

}