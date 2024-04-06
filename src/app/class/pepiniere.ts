export class Pepiniere {
  idpepiniere!: number;
  idvendeur!: number;
  type!: number;
  idlocalite!: number;
  nom!: string;
  description!: string;
  nomProprietaire!: string;
  adresse!: string;
  contact!: string;
  datecreation!: string;
  last_update!: string;
  nomlocalite!: string;
  iddepartement!: number;
  idregion!: number;

  plants!: any[];
}

export class Plan {
  idpepiniere!: number;
  idplant!: number;
  idproduitspfnl!: number;
  idpartiesrecoltees!: number;
  idunitemesure!: number;
  quantite!: number;
  quantiteEntree!: number;
  quantiteSortie!: number;
  nompartierecoltee!: string;
  production!: string;
  nbplant!: string;
  libelleunitemesure!: string;
  nomcommercial!: string;
  nomscientifique!: string;
  description!: string;
  action!: number;
}
