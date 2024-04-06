export class Article{
    amId!: string;
    bcaID!: string;
    conditionnement!: string;
    designation!: string;
    ip_update!: string;
    last_update!: string;
    numOrdre!: number;
    prixDeReference!: number;
    prixMax!: number;
    prixRef!: number;
    prixUnitaire!: number;
    prixtotal!: number;
    quantite!: number;
    refArticle!: string;
    remise!: number;
    tauxRemise!: number;
    tauxTVA!: number;
    taxes!: number;
    user_update!: string;

    constructor() {

        this.refArticle = ''
        this.designation = ''
        this.quantite = 0
        this.prixDeReference = 0
        this.prixUnitaire = 0
        this.prixtotal = 0

    }
}