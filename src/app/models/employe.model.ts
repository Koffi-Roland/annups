import { Fonction , Service } from './';

export class Employe {

  public id?: any;
  nom?: string;
  matricule?: string;

  prenom?: string;
  sexe?: string;
  fonction?: Fonction;
  service?: Service;

  dateDeNaissance?: Date;
  dateEmbauche?: Date;
  statut?: string;

  telFixePro?: string;
  telAbbr?: string;
  telPro?: string;
  telPerso1?: string;
  telPerso2?: string;
  telPerso3?: string;
  ville?: string;
  pays?: string;
  emailPro?: string;
  emailPerso?: string;
  dateMaj?: Date;
  photo?: string;
  idEmploiyeParent?: string;

  constructor(
    id?: any,
    nom?: string,
    prenom?: string,
    matricule?:string,
    sexe?: string,
    fonction?: Fonction,
    service?: Service,

    dateDeNaissance?: Date,
    dateEmbauche?: Date,
    statut?: string,

    telFixePro?: string,
    telAbbr?: string,
    telPro?: string,
    telPerso1?: string,
    telPerso2?: string,
    telPerso3?: string,
    ville?: string,
    pays?: string,
    emailPro?: string,
    emailPerso?: string,
    dateMaj?: Date,
    photo?: string,
    idEmploiyeParent?: string) {
      this.id = id ? id : null;
      this.nom = nom ? nom : null;
      this.prenom = prenom ? prenom : null;
      this.matricule=matricule ? matricule : null,

      this.sexe = sexe ? sexe : null;
      this.fonction = fonction ? fonction : null;
      this.service = service ? service : null;
      this.dateDeNaissance = dateDeNaissance ?   dateDeNaissance : null;
      this.dateEmbauche = dateEmbauche ? dateEmbauche : null ;
      this.statut = statut ? statut : null;

      this.telFixePro = telFixePro ? telFixePro : null ;
      this.telAbbr = telAbbr ? telAbbr : null ;
      this.telPro = telPro ? telPro : null ;
      this.telPerso1 = telPerso1 ? telPerso1 : null ;
      this.telPerso2 = telPerso2 ? telPerso2 : null ;
      this.telPerso3 = telPerso3 ? telPerso3 : null ;
      this.ville = ville ? ville : null ;
      this.emailPro = emailPro ? emailPro : null ;
      this.emailPerso =  emailPerso ?  emailPerso : null ;
      this.dateMaj = dateMaj ? dateMaj : null ;
      this.photo = photo ? photo : null ;
      this.idEmploiyeParent = idEmploiyeParent ? idEmploiyeParent : null;
  }
}
