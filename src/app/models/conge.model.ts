import { Employe } from "./employe.model";

export class Conge {

    public  id?: any;
    public employe?:Employe;
    public nbrJourAutorise?:number;
    public dateDebut?:Date;
    public dateFin?:Date;
    public decision?:string;
    public nbrJour?:number;

 
     constructor(id: any) {
         this.id = id ? id : null;
     }
 
 
 }
 