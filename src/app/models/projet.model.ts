import { Employe } from './';
export class Projet {
    public id: any;
    public label: string;
    public datecreation: Date;
    public datedebut: Date;
    public datefin: Date;
    public employe: Employe;
    public sponsor:Employe;
    public createByDTO:Employe;

    constructor(id?: any, label?: string, datecreation?: Date, datedebut?: Date, datefin?: Date, employe?: any, sponsor?:any,createByDTO?:any) {
        this.id = id ? id : null;
        this.label = label ? label : null;
        this.datecreation = datecreation ? datecreation : null;
        this.datedebut = datedebut ? datedebut : null;
        this.datefin = datefin ? datefin : null;
        this.employe = employe ? employe : null;
        this.sponsor = sponsor ? sponsor : null;
        this.createByDTO=createByDTO ? createByDTO:null;

    }
}
