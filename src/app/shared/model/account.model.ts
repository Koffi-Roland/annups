export class Account {
    constructor(
        //public activated: boolean,
        public authorities: string[],
        public emailPro: string,
        public Prenom: string,
        public nom: string,
        public photo: string,
        public authentification: Authentification,
        public imageUrl: string,
        public telPro: string
    ) {}
}
export class Authentification {
    constructor(
        //public activated: boolean,
        public matricule: string,
        public password: string,
    ) {}
}
