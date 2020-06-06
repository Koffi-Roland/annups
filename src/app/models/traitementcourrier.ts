import { Service } from "./service.model";
import { Employe } from "./employe";
import { TypeCourrier } from "./typecourrier";

export class TraitementCourrier {
    public id: number;
    public service: Service;
    public typeCourier: TypeCourrier;
    public avisTraitement: string;
    public statut: boolean = false;
    public dateCloture: string;
    public dateRetourPrevisionelle: string;
    public dateRetourTraitement: string;
    public employeRetour: Employe;
    public employeValidation: Employe;
    public employeEnvoie: Employe;

    constructor(id: any) {
        this.id = id;
    }
}