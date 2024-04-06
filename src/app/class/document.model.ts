export class Document {
  documentID!: string;
  typedocumentID!: string;
  statutdocumentID!: string;
  datedebut!: string;
  datefin!: string;
  datesignature!: string;
  lieusignature!: string;
  nomfichier!: string;
  cheminfichier!: string;
  extension!: string;
  objet!: string;
  partieprenante!: string;
  close!: string;
  couleur!: string;
  created_at!: string;
  created_by!: string;
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  datelimite!: string;
  oldname!: string;
  avenant!: string;
  ville!: string;
  engagementfinancier!: string;
  observation!: string;
}
export class TypeDocument {
  typedocumentID!: string;
  libelleFr!: string;
  libelleUs!: string;
  description!: string;
  withdelais!: string;
  couleur!: string;
  created_at!: string;
  created_by!: string;
  last_update!: string;
  user_update!: string;
  ip_update!: string;
}

export class StatutDocument {
  statutdocumentID!: string;
  libelleFr!: string;
  libelleUs!: string;
  couleur!: string;
  description!: string;
  created_at!: string;
  created_by!: string;
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  titreaffaire!: string;
  fait!: string;
  decision!: string;
  chargedossier!: string;
  nomshuissiers!: string;
  chargesaffaire!: string;
  etatprocedure!: string;
  momsavoadverse!: string;
  nomjugesdecision!: string;
  avisaudience!: string;
  demandereq!: string;
}
export class HistoDocument {
  histodocumentID!: string;
  documentID!: string;
  statutdocumentID!: string;
  actif!: number;
  created_at!: string;
  created_by!: string;
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  datelimite!: string;
  objet!: string;
  statut!: string;
  typedoc!: string;
  couleur!: string;
  titreaffaire!: string;
  fait!: string;
  decision!: string;
  chargedossier!: string;
  nomshuissiersavocats!: string;
  chargesaffaire!: string;
  momsavocatspartieadverse!: string;
  etatprocedure!: string;
  nomjugesdecision!: string;
  avisaudience!: string;
  demanderequierant!: string;
}

export class PartiePrenante {
  partieprenanteID!: number;
  nom!: string;
  raisonsociale!: string;
  tel!: string;
  email!: string;
  type!: number;
}
export class Stat {
  doc!: number;
  typedoc!: number;
  statdoc!: number;
}
export class PetitDocument {
  file!: File;
  login!: string;
  type!: string;
}
