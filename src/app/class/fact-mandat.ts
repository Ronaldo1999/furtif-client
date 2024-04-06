export class FactMandat {
  cgMandatID!: string;
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  objet!: string;
  dateDebut!: string;
  dateFin!: string;
  typeMandat!: number;
  visa!: number;
  visah!: number;
  visaD!: number;
  organisationID!: string;
  etat!: number;
  nbJours!: number;
  etatTrans!: number;
  structureID!: string;
  createBy!: string;
  millesime!: string;
  tacheID!: string;
  activiteID!: string;
  activites!: string;
  comptes!: string;
  personnes!: string;
  chronogramme!: string;
  logistique!: string;
  lieu!: string;
  reference!: string;
  arrivee!: string;
  montantMandat!: number;
  numOrdre!: string;
  dateEmission!: string;
  decision!: string;
  dateEntre!: string;
  dateSortie!: string;
}
export class PersonMandat {
  matricule!: string;
  nom!: string;
}
export class ActiviteMandat {
  id!: string;
  libelleFr!: string;
}

export class ChronoMandat {
  dateActivite!: string;
  activites!: any[];
}

export class LogiMandat {
  idLogi!: string;
  libelleFr!: string;
  montant!: number;
}
export class CompteMandat {
  compteID!: string;
  code!: string;
  libelleFr!: string;
}

export class ExportMandat {
  objet!: string;
  lieu!: string;
  reference!: string;
  duree!: string;
  personnel!: string;
  chronogramme!: string;
  logistique!: string;
  activites!: string;
  comptes!: string;
}

/* personne
activite
chrono
logistique */
