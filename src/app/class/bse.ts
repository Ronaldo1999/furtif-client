export class Export {
  exportID!: string;
  idexportpfnl!: number;
  idpermis!: number;
  idpermissionnaire!: number;
  numeroexport!: string;
  numeroco!: string;
  idposteexport!: number;
  dateexport!: string;
  destination!: number;
  details!: DetailExport[];
}
export class DetailExport {
  id!: number;
  exportID!: string;
  detailExportID!: string;
  iddetailsexportpfnl!: number;
  idunitemesure!: number;
  quantite!: number;
  observations!: number;
  idpartieproduitpfnl!: number;
  idcertificat!: number;
  idpays!: number;
}
