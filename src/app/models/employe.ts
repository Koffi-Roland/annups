import {Fonction} from "./fonction.model";
import {Service} from "./service.model";
import {Droit} from "./droit";


export class Employe {

    public id: number;

    public nom: string;

    public prenom: string;

    public sexe: string;

    public dateDeNaissance: string;

    public dateEmbauche: string;

    public fonction: Fonction;

    public statut: string;

    public service: Service;

    public telFixePro: string;

    public telAbbr: string;

    public telPro: string;

    public telPerso1: string;

    public telPerso2: string;

    public telPerso3: string;

    public ville: string;

    public pays: string;

    public emailPro: string;

    public emailPerso: string;

    public password: string;

    public photo: string;

    public idEmploiyeParent: any;

    public droits: Droit[];

    public matricule: string;

    public activated: boolean = false;

    public langKey: string;

    public firstCreate: boolean = true;
   public  estOuvrable?: boolean;


    constructor(id: number) {
        this.id = id;
    }
}
