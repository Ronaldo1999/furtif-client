import { Organisation } from "../organisation/organisation";
import { Sensibilite } from "../sensibilite/sensibilite";
import { Structure } from "../structure/structure";
import { User } from "../user";

export class UserGlobal {

    user:User = new User();
    sensibilites: Sensibilite[] = []
    organisations: Organisation[] = []
    structures: Structure[] = []
    chaine!:string
    profil!:string
    constructor(_user:User,_sensibilites:Sensibilite[]){
        this.user=_user
        this.sensibilites=_sensibilites
    }
    
}
