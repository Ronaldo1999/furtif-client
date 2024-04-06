export class Collecte {
  idcollectepfnl!: number;
  collectepfnlID!: string;
  datecollecte!: string;
  iddepartement!: number;
  codepcfc!: string;
  idlocalite!: number;
  idutilisateur!: number;
  idposte!: number;
  identificateur!: string;
  idregion!: number;
  numerocollecte!: string;
  details!: DetailCollecte[];
  color!: string;
}

export class DetailCollecte {
  id!: number;
  collectepfnlID!: string;
  detailscollectepfnlID!: string;
  idcollectepfnl!: number;
  iddetailscollectepfnl!: number;
  idpermissionnaire!: number;
  idpermis!: number;
  idorigine!: number;
  quantite!: number;
  idunitemesure!: number;
  idpartieproduitpfnl!: number;
  idprovenance!: number;
  nomacteur!: number;
  typeacteur!: number;
  iddestination!: number;

  color!: string;
}