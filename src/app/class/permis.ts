export class Permis {
  cheminfichier!: any;
  datedelivrance!: any;
  datefin!: any;
  detailscollectepfnl!: any;
  exportpfnl!: any;
  iDAgrements!: any;
  iDPermissionnairesPNFL!: number;
  idvendeur!: number;
  idpermis!: any;
  parentID!: number;
  nomfichier!: any;
  numeropermis!: any;
  observation!: any;
  tabdetailpermis!: DetailPermis[];
  typedocument!: number;
  typefichier!: any;
  zonecoupe!: any;
  niveau!: any;
  created_at!: any;

  idregion!:number;
  iddepartement!:number;
  idarrondissement!:number;
  coorx!:number;
  coory!:number;
  etatbliLe!:string;
  domicile!:string;
  nompromoteur!:string;
  email!:string;
  village!:string;
  quartier!:string;
  user_update!:string;
  ip_update!:string;
  last_update!:string;
  action!:number;

}

export class DetailPermis {
  categorieunitemesure!:any;
  created_at!:any;
  created_by!:any;
  descriptionsommaire!:any;
  iddepartements!:any;
  iddetailpermis!:any;
  idlocalite!:any;
  idpartieproduitpfnl!:any;
  idpartierecoltees!:any;
  idpermis!:any;
  idproduitspfnl!:any;
  idregions!:any;
  idunitemesure!:any;
  ip_update!:any;
  last_update!:any;
  libelleunitemesure!:any;
  niveau!:any;
  nomcommercial!:any;
  nomlocalite!:any;
  localisation!:any;
  nompartierecoltee!:any;
  nomscientifique!:any;
  observation!:any;
  offert!:any;
  produit!:any;
  quantite!:number;
  quotarestant!:any;
  quotauniteref!:any;
  user_update!:any;
  id!: number;
}
export class Prorogation {
  iddocprorogation!:number;
  iddoc!:number;
  datedebut!:string;
  datefin!:string;
  annee!:string;
  referencedocument!:string;
  signataire!:number;
  datesignature!:string;
  last_update!:any;
  user_update!:any;
  ip_update!:any;
  created_by!:any;
  created_at!:any;
}

