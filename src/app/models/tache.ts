import { Projet, Employe } from "src/app/models";

export class Tache {

    public id: number;

    public projet: Projet;

    public employe: Employe;

    public label: string;

    public progression: number;

    public datedebut: string;

    public datefin: string;

    constructor(id: any) {
        this.id = id ? id : null;
       


    }

}