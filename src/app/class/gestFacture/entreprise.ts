export class Entreprise {

    identifiantfiscal:string=''
    raisonsociale:string=''
    rc:string=''
    telephone:string=''
    adresse:string=''
    statut:number=0
    nom_fournisseur=''
    id_fournisseur=''

    constructor(){
        var aujourdhui = new Date(); 
        var now = new Date();
 
        var annee   = now.getFullYear();
        var mois    = ('0'+now.getMonth()+1).slice(-2);
        var jour    = ('0'+now.getDate()   ).slice(-2);
        var heure   = ('0'+now.getHours()  ).slice(-2);
        var minute  = ('0'+now.getMinutes()).slice(-2);
        var seconde = ('0'+now.getSeconds()).slice(-2);
        this.id_fournisseur='ENT'+annee+''+mois+''+jour+heure+minute+seconde
    }


}
