import { Proforma } from "./proforma/proforma";

export class Proformaonline {

     id_user:string=''
     id_proforma:string='';
     p:Proforma[]=[];
     entreprise:string='' ;
     comptebancaire :string='';
    
     ht:number=0;
     ir:number=0;
     np:number=0;
     ttc:number=0;
     tauxtva:number=0;
     tauxir:number=0;
     tva:number=0;
     statut:string=''
     besoin:string=''
     objet:string=''
     datecreation:string=''
     lastupdate:string=''
     types:string=''  

     constructor(){

        this.types='PROFORMA'

        var aujourdhui = new Date(); 
        var now = new Date();
 
        var annee   = now.getFullYear();
        var mois    = now.getMonth()+1;
        var jour    = ('0'+now.getDate()).slice(-2);
        var heure   = ('0'+now.getHours()).slice(-2);
        var minute  = ('0'+now.getMinutes()).slice(-2);
        var seconde = ('0'+now.getSeconds()).slice(-2);

        this.id_proforma='PRF'+annee+''+mois+''+jour+heure+minute+seconde
        this.datecreation=annee+'-'+mois+'-'+jour+' '+heure+':'+minute+':'+seconde
        this.lastupdate=annee+'-'+mois+'-'+jour+' '+heure+':'+minute+':'+seconde

     }


 }
