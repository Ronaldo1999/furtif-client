export class Proforma {

    //id_proforma:string=''
    /* reference:string=''
    designation:string=''
    unite:string=''
    qte:number=0
    prixunitaire:number=0
    prixtotal:number=0 */

    refArticle: string = ''
    designation: string = ''
    qte: number = 0
    prixDeReference: number = 0
    prixUnitaire: number = 0
    prixtotal: number = 0


    constructor() {

        this.refArticle = ''
        this.designation = ''
        this.qte = 0
        this.prixDeReference = 0
        this.prixUnitaire = 0
        this.prixtotal = 0

    }

}
