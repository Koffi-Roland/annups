

export class Parametre {

    projetExist?: boolean;
    nomSociete?: string;

    constructor(projetExist?: boolean, nomSociete?: string) {
        this.projetExist = projetExist ? projetExist : false;
        this.nomSociete = nomSociete ? nomSociete : 'Os Consulting-Expertise';

    }
}
