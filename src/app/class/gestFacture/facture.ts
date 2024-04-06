export class Facture {
  last_update!: string;
  user_update!: string;
  user_oper!: string;
  ip_update!: string;
  bcaID!: string;
  objet!: string;
  reference!: string;
  delaiLivraison!: string;
  dateSignature!: string;
  lieuSignature!: string;
  entete1!: string;
  entete2!: string;
  entete3!: string;
  entete4!: string;
  entete5!: string;
  montantTTC!: number;
  montantHT!: number;
  tauxTVA!: number;
  tauxIR!: number;
  nap!: number;
  fournisseurID!: string;
  matriculeOrdo!: string;
  tacheID!: string;
  organisationID!: string;
  millesime!: string;
  activiteID!: string;
  structureID!: string;
  rib!: string;
  etat!: string;
  typeID!: string;
  montantRG!: number;
  numOrdre!: number;
  groupe!: string;
  delai!: string;
  trimestreID!: string;
  memoireOperationID!: string;
  regularisation!: string;
  travaux!: string;
  affichertravaux!: string;
  piecesjointes!: number;

  bcaarticles!: any[];
  etatTrans!: number;
  createBy!: string;
  deleter!: string;
  compteCode!: string;
  ae!: number;
  cp!: number;
  nbFois!: number;
  visa!: number;
  visah!: number;
  dateEmission!: string;
  decision!: string;
  dateEntre!: string;
  dateSortie!: string;
}

export class FactResult {
    objet!: string;
    libelle!: string;
    tacheID!: string;
    elementID!: string;
    observations!: string;
    typeEngagementID!: any;
    objetEngagement!: any;
    result!: number;
    numeroRejet!: number;
    typeID!: number;
    last_update!: string;
    user_update!: string;
    ip_update!: string;
}
export class FactAgent {

    last_update!: string;
    user_update!: string;
    ip_update!: string;
    matricule!: string;
    nom!: string;
    nomJeuneFille!: string;
    prenom!: string;
    dateNaissance!: string;
    numCNI!: string;
    millesime!: string;
    organisationID!: string;
    matriculeBudgetaire!: number;
    actif!: number;
    importc!: number;
    grade!: string;
    affectation!: string;
    tauxMission!: number;
    categorie!: string;
    echelon!: string;
    numcnps!: string;
    dateEmbauche!: string;
    rib!: string;
    randAdministratif!: string;
    fonctionAdministrative!: string;
    idAgentGroupe!: string;
    agentGroupe!: string;
    situation!: string;
    enfants!: number;
    niu!: string;
    niudelai!: string;
    salaireindiciaire!: string;
    direction!: string;

}
export class FactValid {
  elementID!: string;
  action!: number;
  typeID!: number;
  objet!: string;
  organisationID!: string;
  user_update!: string;
  ip_update!: string;
  dateVisa!: string;
}

export class EngagementRejet {
    elementID!: string;
    typeEngagementID!: any;
    objetEngagement!: any;
    tacheID!: string;
    libelle!: string;
    engagementRejetBugetaireID!: string;
    last_update!: string;
    user_update!: string;
    ip_update!: string;
    numeroRejet!: number;
    typeID!: number;
}

export class RejetGain {
    cgRejetGainID!: string;
    engagementID!: string;
    last_update!: string;
    user_update!: string;
    ip_update!: string;
    userMontantValide!: string;
    userMontantRejete!: string;
    objet!: string;
    objetEngagement!: string;
    observation!: string;
    montantValide!: number;
    montantRejete!: number;
    dateValidation!: string;
    organisationID!: string;
    structureID!: string;
    millesime!: string;
    dateEntre!: string;
    dateSortie!: string;
    reference!: string;
    numeroRejet!: number;
    typeID!: number;
    tacheID!: string;
}
export class RejetProcedure {
    last_update!: string;
    user_update!: string;
    ip_update!: string;
    engagementRejetProcedureID!: string;
    elementID!: string;
    libelle!: string;
    tacheID!: string;
    numeroRejet!: any;
    typeID!: any;
    typeRejetProces!: any;
    observation!: any;
    objetEngagement!: string;
    organisationID!: string;
    dateCreation!: string;
    motif!: string;
}
export class MotifRejetProced {
    id!: number;
    libelle!: string;
    recommandation!: string;
}

export class PieceLiasse {
    liasseID!: string;
    cgengagementliassecontrolID!: string;
    engagementID!: string;
    libelleFr!: string;
    libelleUs!: string;
    last_update!: string;
    user_update!: string;
    ip_update!: string;
    typeID!: any;
    numeroRejet!: any;
    typeEngagementID!: any;
    objetEngagement!: any;
    tacheID!: string;
    engagement!: number;
    payement!: number;
    bon!: number;
}
export class FindTacheParam {
    millesime!: string;
    organisationID!: string;
    codeTache!: string;
}

export class PrintVisa {
    objet!: string;
    beneficiaire!: string;
    imputation!: string;
    montantTTC!: number;
}

export class BcaReserve {
    elementID!: string;
    user_update!: string;
    ip_update!: string;
    action!: number;
    typeID!: number;
}

export class PrintReportDetail {
    tacheID!: string;
    base!: number;
}
export class PrintReportGlobal {
    organisationID!: string;
    millesime!: string;
    tacheID!: string;
    activiteID!: string;
    base!: number;
}


export class LigneEngagementBudget {
    acCode!: string;
    acLibelle!: string;
    beneficiaire!: string;
    dateValidation!: string;
    etat!: string;
    montantTTC!: number;
    numDossier!: string;
    objet!: string;
    pgCode!: string;
    pgLibelle!: string;
    statut!: string;
    typeProcedure!: string;
}

export class CgObservation {
    cgEngagementObservationID!: string;
    elementID!: string;
    observation!: string;
    proposition!: string;
    last_update!: string;
    user_update!: string;
    ip_update!: string;
    objet!: string;
    typeID!: number;
    action!: number;
    organisationID!: string;
    etat!: number;
    visa!: number;
    visah!: number;
    structureID!: string;
    millesime!: string;
    tacheID!: string;
    activiteID!: string;
}