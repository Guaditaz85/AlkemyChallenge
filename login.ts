import { Arg, Mutation, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { User } from "./usuarioEntity";
import { UserInput } from "./usuarioInput";
import { hash, compareSync } from "bcryptjs";
import { LoginInput } from "./usuarioInput";
import { sign } from "jsonwebtoken";
import { environments } from "../configuration/environments";

@Resolver()
export class Login {
    userRepository: Repository<User>
    constructor() {
        this.userRepository = getRepository(User);
    }

    @Mutation(() => User)
    async register(@Arg("input", ()=> UserInput) input:UserInput) : Promise<User|undefined> {
        try {
            const {fullName, email, password} = input;
            const userExists = await this.userRepository.findOne({where:{email}});
            if(!userExists) {
                throw new Error("Email incorrecto");
            }
            const hashedPassword = await hash(password, 10);
            const newUser = await this.userRepository.insert({
                fullName,
                email,
                password:hashedPassword
            })
            return this.userRepository.findOne(newUser.identifiers[0].fullName)
        }
        catch {
            console.error
        }
    }
    
    @Mutation(()=> LoginInput)
    async login(@Arg("input", () =>LoginInput) input:LoginInput) {
        try {
            const {email, password} = input;
            const userFound = await this.userRepository.findOne({where:{email}});
            if(!userFound) {
                throw new Error("El usuario no existe")
            }
            const isValidPassword: boolean = compareSync(password, userFound.password);
            if(!isValidPassword) {
                throw new Error("La contraseña no es válida");
            }
            const jwt:string = sign({email:userFound.email},environments.JWT_SECRET);
        return {
            email:userFound.email,
            jwt:jwt
        }
        }
        catch {
            console.error
        }
    }
}