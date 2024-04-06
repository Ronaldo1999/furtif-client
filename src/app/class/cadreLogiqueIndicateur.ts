export class CadreLogiqueIndicateur {
    cadreLogiqueIndicateurID!: string;
    last_update!: string;
    user_update!: string;
    ip_update!: string;
    code!: string;
    organisationID!: string;
    structureID!: string;
    cadreLogiqueActiviteID!: string;
    cadreLogiqueObjectifID!: string;
    libelleObjectif!: string;
    libelleFacteurCle!: string;
    libelleFr!: string;
    libelleUs!: string;
    indicateurCategorieID!: string;
    responsable !: string
    responsableAutre !: string
    unite !: string
    modeCalcul !: string
    periodicite !: string
    periodeDeclancheur !: Date
    jourRappel !: Date
    periodiciteType !: string
    reference !: number
    referenceAnnee !: string
    dernierResultatConnu !: number
    dernierResultatConnuAnnee !: string
    cible !: number
    cibleAnnee !: string
    previsions1 !: number
    previsions2 !: number
    previsions3 !: number
    previsionsAnnee1 !: string
    previsionsAnnee2 !: string
    previsionsAnnee3 !: string
    natureDonnees !: string
    sourceDonnees !: string
    modeCollecte !: string
    responsableCollecte !: string
    responsableVerification !: string
    responsableSynthese !: string
    validationDonnees !: string
    coutCollecte !: number
    limiteBiais !: string
    interpretation !: string
    sens !: number
    etat !: number
    rouge !: number
    orange !: number
    vert !: number
    actif !: number
    dateFin !: Date
}