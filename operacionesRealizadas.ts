import {Mutation, Resolver, Arg, Query} from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { Operaciones } from "../OperacionesEntity/operacionesTabla";
import {ConceptoCrearInput, TipoInput, ConceptoUpdateInput, BorrarConceptoInput, UnConceptoInput} from "../Resolver/operacionesInputs"

@Resolver()
export class OperacionesRealizadas {
    operacionesRepository: Repository<Operaciones>
    constructor() {
        this.operacionesRepository = getRepository(Operaciones)
    }

    @Mutation(()=> Operaciones)
    async crearOperacion(@Arg("input", () => ConceptoCrearInput) input:ConceptoCrearInput) : Promise <Operaciones|undefined> {
        try {
            const operacionCreada = await this.operacionesRepository.insert({
                concepto:input.concepto,
                monto:input.monto,
                fecha:input.fecha,
                tipo: input.tipo

            });
            const resultado = await this.operacionesRepository.findOne(operacionCreada.identifiers[0]);
            return resultado;
        }
        catch {
            console.error
        };
     
    }

    @Query(()=>[Operaciones])
    async tipoDeOperacion(@Arg("input", () => TipoInput) input:TipoInput) : Promise <Operaciones[]|undefined> {
        try {
            const ingresos = await this.operacionesRepository.find(input);
            const egresos = await this.operacionesRepository.find(input);
            if ( ingresos) {
                return ingresos;
            }
            else if(egresos) {
                return egresos;
            }
        }
        catch {
            console.error;
            }
        
        
    }
     

    @Mutation(() => Operaciones)
    async updateUnConcepto(
        @Arg("input", ()=> ConceptoUpdateInput) input:ConceptoUpdateInput): Promise<Operaciones> {
        try {
            const conceptoExiste = await this.operacionesRepository.findOne(input.concepto);
            if(!conceptoExiste) {
                throw new Error("El concepto no existe")
            }
        }
        catch {
            console.error;
        }
        return await this.operacionesRepository.save({
            concepto:input.concepto,
            monto: input.monto,
            fecha: input.fecha
        
    })
    }

            
    @Mutation(()=>Boolean)
    async borrarConcepto(@Arg("input", ()=> BorrarConceptoInput) input:BorrarConceptoInput) : Promise<Boolean> {
        await this.operacionesRepository.delete(input.concepto);
        return true;
    }

    @Query(()=>Operaciones)
    async encontrarUnConcepto(@Arg("input", ()=> UnConceptoInput) input:UnConceptoInput) : Promise<Operaciones|undefined> {
        try {
            const buscarConcepto = await this.operacionesRepository.findOne(input.concepto);
            if(!buscarConcepto) {
                throw new Error("El concepto buscado no existe");
                }
            return buscarConcepto
        }
        catch {
            console.error
        }
    }
}