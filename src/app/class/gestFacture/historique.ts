import { Observable } from "rxjs";

export class Historique {

     id:number=0
     user:string='';
     idelement:string='';
     dateoperation:string='';
     typeoperation:string='';
     adresseip:string='';
     adressemac:string='';
     device:string='';
   

    constructor(){
         //Recupere l'adresse IP du client
         this.getIp()

         var now = new Date();
  
         var annee   = now.getFullYear();
         var mois    = now.getMonth()+1;
         var jour    = ('0'+now.getDate()).slice(-2);
         var heure   = ('0'+now.getHours()).slice(-2);
         var minute  = ('0'+now.getMinutes()).slice(-2);
         var seconde = ('0'+now.getSeconds()).slice(-2);
 
         this.dateoperation=annee+'-'+mois+'-'+jour+' '+heure+':'+minute+':'+seconde
     }
     
     getIp() {  
        let adresse:string=''
        fetch('https://api.ipify.org/?format=json')
        .then(results=>results.json())
        .then(data=>this.adresseip=data.ip)
     }
     
}
