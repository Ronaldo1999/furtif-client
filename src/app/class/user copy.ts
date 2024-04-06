export class User {
  login: string = '';
  password: string = '';
  nom: string = '';
  prenom: string = '';
  telephone: string = '';
  organisationID: string = '';
  structureID: string = '';
  fonction: string = '';
  email: string = '';
  actif!: boolean;
  service: string = '';
  facebook: string = '';
  whatsapp: string = '';
  twitter: string = '';
  googleplus: string = '';
  linkedln: string = '';
  userUpdate!: string;
  ipUpdate: string = '';
  dateCreation: any;
  structure!: string;
  loginParent!: string;
  code!: string;
  codeParent!: string;
  chaine!: string;
  connecter!: number;
  profilPerformance!: string;
}

export class UserLogin {
  login!: string;
  password!: string;
}

export class PfnlUser {
  idutilisateur!: number;
  loginuser!: string;
  passworduser!: string;
  nomuser!: string;
  telephone!: string;
  niveauintervention!: number;
  idregions!: number;
  iddepartements!: number;
  idgroupe!: number;
  saisiecollecte!: boolean;
  saisietransit!: boolean;
  saisieexport!: boolean;
  emailuser!: string;
  premiereconnexion!: boolean;
  actif!: boolean;
  userID!: string;
  user_update!: string;
  ip_update!: string;
  last_update!: string;
  create_at!: string;
}
