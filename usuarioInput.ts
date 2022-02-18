import { InputType, Field, ObjectType } from "type-graphql";
import { Length, IsString, IsEmail } from "class-validator";

@InputType()
export class UserInput {
    @Field()
    @Length(3, 64)
    @IsString()
    fullName!: string

    @Field()
    @IsEmail()
    email!: string

    @Field()
    @Length(6, 20)
    password!: string
}

@InputType()
export class LoginInput {
    @Field()
    @IsEmail()
    email!: string

    @Field()
    @Length(6, 20)
    password!: string
}

