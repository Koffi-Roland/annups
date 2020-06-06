import { Employe } from "./employe";
import { TraitementCourrier } from "./traitementcourrier";

export class Courrier {

    public id?: number;

    public reference?: string;

    public label?: string;

    public dateReception?: string;

    public dateReponse?: string;

    public dateRetourPrevGlobal?: string;

    public dateRetourReel?: string;

    public statut?: boolean = false;

    public dateCloture?: string;

    public dateRetourGlobal?: string;

    public fichierCourrier?: any;

    public refExp?: string;

    public urgent?: boolean;

    public employeValidationGlobal?: Employe;

    public envoiCourier?: TraitementCourrier;

    public envoiCouriers?= new Array<TraitementCourrier>();

    constructor(id: any)
     {
        this.id = id ? id : null;
       
    }
}