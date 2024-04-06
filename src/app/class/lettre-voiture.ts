export class LettreVoiture {
  lettrevoitureID!: string;
  idlettrevoiture!: number;
  idpermissionnaire!: number;
  iddepartementdestination!: number;
  nomconducteur!: string;
  idpostechargement!: number;
  numerolettrevoiture!: string;
  idpermis!: number;
  datelettrevoiture!: string;
  immatriculation!: string;
  idtypedocument!: number;
  idregion!: number;
  iddepartement!: number;
  idcommune!: number;
  uid!: number;
  synch_by!: number;
  idlocalitedestination!: number;
  details!: DetailLettreVoiture[];
}

export class DetailLettreVoiture {
  id!: number;
  lettrevoitureID!: string;
  detailslettrevoitureID!: string;
  idlettrevoiture!: number;
  iddetailslettrevoiture!: number;
  quantite!: number;
  observations!: string;
  idunitemesure!: number;
  idpartieproduitpfnl!: number;
  nomproduit!: number;
}
