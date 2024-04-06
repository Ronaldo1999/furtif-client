export interface ProduitInterface {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

export class Produit {
  id!: string;
  code!: string;
  name!: string;
  description!: string;
  price!: number;
  quantity!: number;
  inventoryStatus!: string;
  category!: string;
  image!: string;
  rating!: number;

  idproduitspfnl!: number;
  nomscientifique!: string;
  nomcommercial!: string;
  codeproduit!: string;
  idfamillepfnl!: string;
  descriptionsommaire!: string;
  modeattribution!: string;
  idcategorieproduit!: string;

  agreementslimitations!: string;
  categorieproduitID!: string;
  famillepfnlID!: string;
  modeAttribution!: string;
  nomCommercial!: string;
  nomScientifique!: string;
  nomVernaculaire!: string;
  partiesproduitspfnl!: string;
  produitID!: number;
  produitszonesgeographiquesID!: string;

  action!: string;
}
export class ProduitMarche {

  idproduitmarchepfnl !: number;
  created_at !: string;
  created_by !: string;
  nommarche !: string;
  unitemesure !: string;
  idunitemesure !: number;
  idproduitspfnl !: number;
  user_update !: string;
  last_update !: string;
  ip_update !: string;
  prixmarche !: number;

}