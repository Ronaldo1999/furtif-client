import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalLocalite } from '../class/global-localite';
import { PartieProduit } from '../class/partie-produit';
import { Permis } from '../class/permis';
import { Permissionnaire } from '../class/permissionnaire';
import { Produit } from '../class/produit';
import { UniteMesure } from '../class/unite-mesure';
import { Certificat } from '../class/certificat';
import { OrigineProduit } from '../class/origine';
import { ApiService } from './api.service';
import { Vendeur } from '../class/vendeur';
import { ConfigService } from './config.service';
import { Client, GroupeClient } from '../class/client.model';

@Injectable()
export class GlobalService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  constructor(
    private http: HttpClient,
    public api: ApiService,
    private appConfigService: ConfigService
  ) { }

  getUrlServeur(url: string): string {
    return url;
  }

  /*  async serUrlServeur() {
    let tabColle = [...(await this.api.listCollecte().toPromise())];

    for await (const ele of tabColle) {
      console.log(ele);
      this.urlserveur = this.appConfigService.getConfig().serverDistantIP;
      await this.createCollecte(ele).toPromise();
    }
    console.log(this.urlserveur);
  } */

  public getPermissionnaire(id: number, permissionnaireList: Permissionnaire[]): string {
    let libelle = '';
    for (const ele of permissionnaireList) {
      if (ele.iDPermissionnairesPNFL == id) { libelle = ele.nomouraisonsociale; break; }
    }
    return libelle;
  }
  public getLocalite(id: number, localites: GlobalLocalite[]): string {
    let libelle = '';
    for (const ele of localites) {
      if (ele.idpfnlgloballocalite == id) { libelle = ele.nom; break; }
    }
    return libelle;
  }
  public getLocaliteObj(id: number, localites: GlobalLocalite[]): GlobalLocalite {
    let localite: GlobalLocalite = new GlobalLocalite();
    for (const ele of localites) {
      if (ele.idpfnlgloballocalite == id) { localite = ele; break; }
    }
    return localite;
  }
  public getLibellePermis(id: number, permiss: Permis[]) {
    let libelle = '';
    for (const ele of permiss) {
      if (ele.idpermis == id) {
        libelle = ele.numeropermis;
        break;
      }
    }
    return libelle;
  }
  public getClient(id: string, clientList: Client[]) {
    let client = new Client();
    for (const ele of clientList) {
      if (ele.clientID == id) {
        client = ele;
        break;
      }
    }
    return client;
  }
  public getGroupeClient(id: string, list: GroupeClient[]) {
    let gc = new GroupeClient();
    for (const ele of list) {
      if (ele.groupeClientID == id) {
        gc = ele;
        break;
      }
    }
    return gc;
  }

  public getLibelleProduit(id: number, partieProduits: PartieProduit[]) {
    let libelle = '';
    for (const ele of partieProduits) {
      if (ele.idpartiesproduitspfnl == id) {
        libelle = ele.nomcommercial + ' (' + ele.nompartierecoltee + ' )';
        break;
      }
    }
    return libelle;
  }

  public getPartieProduit(id: number, partieProduits: PartieProduit[]) {
    let partie = new PartieProduit();
    for (const ele of partieProduits) {
      if (ele.idpartiesproduitspfnl == id) {
        partie = ele;
      }
    }
    return partie;
  }
  public getLibelleProduitPartie(id: number, partieProduits: PartieProduit[]) {
    let libelle = '';
    for (const ele of partieProduits) {
      if (ele.idproduitspfnl == id) {
        libelle = ele.nomcommercial;
        /* libelle = ele.nomcommercial + ' (' + ele.nompartierecoltee + ' )'; */
        break;
      }
    }
    return libelle;
  }
  public getProduit(id: number, partieProduits: Produit[]) {
    let libelle = '';
    for (const ele of partieProduits) {
      if (ele.produitID == id) {
        libelle = ele.nomCommercial;
        break;
      }
    }
    return libelle;
  }
  public getLibelleUniteMesure(id: number, unites: UniteMesure[]) {
    let libelle = '';
    for (const ele of unites) {
      if (ele.idunitemesure == id) {
        libelle = ele.libelleunitemesure;
        break;
      }
    }
    return libelle;
  }
  public getLibellCertificatOrigine(id: number, certificats: Certificat[]) {
    let libelle = '';
    for (const ele of certificats) {
      if (ele.idcertificatorigine == id) {
        libelle = ele.numeroco;
        break;
      }
    }
    return libelle;
  }
  public getLibellePays(id: number, pays: GlobalLocalite[]) {
    let libelle = '';
    for (const ele of pays) {
      if (ele.idpfnlgloballocalite == id) {
        libelle = ele.nompays;
        break;
      }
    }
    return libelle;
  }
  public getLibelleDepartement(id: number, departements: GlobalLocalite[]) {
    let libelle = '';
    for (const ele of departements) {
      if (ele.idpfnlgloballocalite == id) {
        libelle = ele.nomdepartement;
        break;
      }
    }
    return libelle;
  }
  public getGlobalLocalite(id: number, list: GlobalLocalite[]) {
    let globalLocalite: GlobalLocalite = new GlobalLocalite();
    for (const ele of list) {
      if (ele.idpfnlgloballocalite == id) {
        globalLocalite = ele;
        break;
      }
    }
    return globalLocalite;
  }

  public getArrondissement(id: number, list: GlobalLocalite[]) {
    let globalLocalite: GlobalLocalite = new GlobalLocalite();
    for (const ele of list) {
      if (ele.idpfnlgloballocalite == id) {
        globalLocalite = ele;
        break;
      }
    }
    return globalLocalite;
  }

  public getLibellePoste(id: number, postes: GlobalLocalite[]) {
    let libelle = '';
    for (const ele of postes) {
      if (ele.idpfnlgloballocalite == id) {
        libelle = ele.intituleposte;
        break;
      }
    }
    return libelle;
  }
  public getLibelleOrigine(id: number, origines: OrigineProduit[]) {
    let libelle = '';
    for (const ele of origines) {
      if (ele.idoriginespnfls == id) {
        libelle = ele.nomsource;
        break;
      }
    }
    return libelle;
  }
  public getLibelleLocalite(id: number, localites: GlobalLocalite[]) {
    let libelle = '';
    for (const ele of localites) {
      if (ele.idpfnlgloballocalite == id) {
        libelle = ele.nomlocalite;
        break;
      } else {

      }
    }
    return libelle;
  }

  getLibellePartie(id: number, parties: PartieProduit[]) {
    let libelle = '';
    for (const ele of parties) {
      if (ele.idpartiesproduitspfnl == id) {
        libelle = ele.nompartierecoltee;
        break;
      }
    }
    return libelle;
  }
  public getLibelleRegion(id: number, regions: GlobalLocalite[]) {
    let libelle = '';
    for (const ele of regions) {
      if (ele.idpfnlgloballocalite == id) {
        libelle = ele.nomregion;
        break;
      }
    }
    return libelle;
  }
  public getRegion(id: number, regions: GlobalLocalite[]) {
    let region: GlobalLocalite = new GlobalLocalite();
    for (const ele of regions) {
      if (ele.idpfnlgloballocalite == id) {
        region = ele;
        break;
      }
    }
    return region;
  }
  public getNomPermissionnaire(
    id: number,
    permissionnaireList: Permissionnaire[]
  ) {
    let libelle = '';
    for (const ele of permissionnaireList) {
      if (ele.iDPermissionnairesPNFL == id) {
        libelle = ele.nomouraisonsociale;
        break;
      }
    }
    return libelle;
  }
  public getNomActeur(id: number, acteurs: Vendeur[]) {
    let libelle = '';
    for (const ele of acteurs) {
      if (ele.idvendeur == id) {
        libelle = ele.nom;
        break;
      }
    }
    return libelle;
  }
  public getNomvendeur(id: number, vendeurs: Vendeur[]) {
    let libelle = '';
    for (const ele of vendeurs) {
      if (ele.idvendeur == id) {
        libelle = ele.nom;
        break;
      } else {
        libelle = 'Vendeur invalide';
      }
    }
    return libelle;
  }

  defineDescription(libelle: any): string {
    return libelle.slice(0, 44);
  }

  verifyLength(valeur: any) {
    let val = '' + valeur;
    if (val.toString().length >= 55) {
      return true;
    }
    return false;
  }

  deleteSelectedElements(tab: any[], selectedElements: any[]) {
    tab = tab?.filter((val) => !selectedElements?.includes(val));
    selectedElements = [];
  }

  estVoyelle(mot: string): boolean {
    const voyelles = ['a', 'e', 'i', 'o', 'u', 'y'];
    return voyelles.includes(mot[0].toLowerCase());
  }

  /* public getLibelleLocalite(id: number, niveau: number) {
    let libelle = '';
      let tab: GlobalLocalite[] = [];
      switch (niveau) {
        case 1:
          break;

        default:
          break;
      }
    for (const ele of tab) {
      if (ele.idpfnlgloballocalite == id) {
        libelle = ele.libelleunitemesure;
        break;
      }
    }
    return libelle;
  } */
}
