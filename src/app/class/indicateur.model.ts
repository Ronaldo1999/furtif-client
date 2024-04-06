export class Indicateur {

  last_update !: Date
  user_update !: string
  ip_update !: string
  indicateurID !: string
  compositeID !: string
  organisationID !: string
  millesime !: string
  structureID !: string
  activiteID !: string
  activiteCode !: string
  code !: string
  missionID !: string
  libelleFr !: string
  libelleUs !: string
  libelleObjectif !: string
  libelleFacteurCle !: string
  indicateurCategorieID !: string
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
  dernierResultatConnuMois !: string
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
  sourceDonneesurl !: string
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
  objectifID!: string
  color!: string
  valeurPrecedente!: number;
  dcrID !: number
  poids !: number

  sousIndicateur1!: string
  sousIndicateur2!: string
  sousIndicateur1Val!: number
  sousIndicateur2Val!: number
  sousIndicateurResultat!: number

  mois !: number
  valide !: number
  observation !: string
  validation !: string

  Janvier!: number
  février!: number
  mars!: number
  avril!: number
  mai!: number
  juin!: number
  juillet!: number
  août!: number
  septembre!: number
  octobre!: number
  novembre!: number
  décembre!: number
}