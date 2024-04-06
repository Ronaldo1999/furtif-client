import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { NodeServiceArbre } from './node.service';
import { Location } from '@angular/common'
import { Arbre } from 'src/app/class/arbre';
import { ArbreNiveau } from 'src/app/class/arbre-niveau';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-arbre',
  templateUrl: './arbre.component.html',
  styleUrls: ['./arbre.component.scss']
})
export class ArbreComponent implements OnInit {

  nodes: any = [];
  connections: any = [];
  libeleEntete = "";

  type = "";
  libelle = "";
  message = "";
  color = "";
  dialogConfirmAction = false;
  modalDetail = false;
  title = "";

  diaplayOutils = false;
  diaplayHelp = false;

  arbre: Arbre = new Arbre();
  arbre2: Arbre = new Arbre();
  tabNiveau: ArbreNiveau[] = [];
  maPalletPerso: any[] = [];

  constructor(
    public nodeService: NodeServiceArbre,
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    public api: ApiService,
    private tokenStorageService: TokenStorageService,
  ) { }


  /*  ngAfterContentInit() {
     console.log("je commense le vrai");
 
     if (this.route.snapshot.params.liens) {
       console.log(this.route.snapshot.params.liens);
       this.showNodes(this.route.snapshot.params.liens);
     }
     this.listNiveau(this.route.snapshot.params.typeArbreID);
   } */

  rechargerment() {
    window.location.reload();
  }


  haveOneCor = false;
  tabCorrspodant = [];
  correspondance(arbreID: string) {
    this.api.arbreFindCorrespondant(this.route.snapshot.params.organisationID, arbreID).subscribe(res => {
      console.log(res);
      if (res.length >= 1) {
        this.haveOneCor = true;
      } else if (res.length == 0) {
        this.haveOneCor = false;
      }
    },
      error => {
        console.log(error.error);
      })
  }
  correspondre() {
    this.modalListArbre = true;
  }

  validCorrespondance(arbre: Arbre) {
    this.arbre = arbre;
    console.log(this.arbre);
    this.save(this.arbre);
  }
  modalListArbre = false;

  tabArbrePb = [];


  listArbreProbleme() {
    this.api.listArbreByTypeAndOrg(this.route.snapshot.params.organisationID, "ARBT20220427145445.201.221").subscribe(res => {
      this.tabArbrePb = res;
      console.log(this.tabArbrePb);
    },
      error => {
        console.log(error.error);
      })
  }


  nbFoisLoad = 0;
  ngOnInit() {
    console.log("je commense");
    if (this.route.snapshot.params.liens) {
      console.log(this.route.snapshot.params.liens);
      this.showNodes(this.route.snapshot.params.liens);
    }
    this.correspondance(this.route.snapshot.params.arbreID);
    //this.arbre2 = this.route.snapshot.params.arbre;
    this.arbre.arbreID = this.route.snapshot.params.arbreID;
    this.arbre.organisationID = this.route.snapshot.params.organisationID;
    this.arbre.libelleFr = this.route.snapshot.params.libelleFr;
    this.arbre.libelleUs = this.route.snapshot.params.libelleUs;
    this.arbre.code = this.route.snapshot.params.code;
    this.arbre.user_update = this.route.snapshot.params.user_update;
    this.arbre.ip_update = this.route.snapshot.params.ip_update;
    this.arbre.arbreTypeID = this.route.snapshot.params.typeArbreID;
    console.log(this.arbre);
    this.listNiveau(this.route.snapshot.params.typeArbreID);
    this.listArbreProbleme()
    /* console.log(this.router.url);
    if (this.route.snapshot.params.nbFois == "1") {
      this.rechargerment();
    } else if (this.route.snapshot.params.nbFois == "2") {
      
    } */
  }

  retour() {
    this.location.back();
  }

  position = '';
  posirionHelp = '';

  showPositionDialog(position: string) {
    this.position = position;
    this.diaplayOutils = true;
  }
  helpMe(position: string) {
    this.posirionHelp = position;
    this.diaplayHelp = true;
  }

  showNodes(liens: string) {
    console.log("dans le wé");
    const data = JSON.parse(liens);
    console.log(data);
    this.nodes = data.nodes;

    this.connections = data.connections;
    console.log(data.nodes);
    console.log(data.connections);
    /* setTimeout(() => {
      this.connections = data.connections;
    }) */
  }

  cleaAll() {
    this.nodes = [];
    this.connections = [];
  }

  loadNodes(liens: string) {
    this.nodeService.removeConnexions(this.route.snapshot.params.liens);
    // this.nodeService.reConnection(this.route.snapshot.params.liens);
    console.log(liens);
    const data = JSON.parse(liens);
    this.connections = data.connections;
    for (const node of data.nodes) {
      this.updateNode(node);
    }
    this.displaySpinner = false;
  }
  node: any = {
    name: "",
    id: "",
    type: "",
    color: "",
  }

  colorItem = "";
  texte = "";
  addNode(item: any) {
    this.node.color = item.color;
    this.libelle = "";
    this.texte = item.text;
    this.title = "Ajout d'un " + this.texte;
    this.colorItem = item.color;
    this.modalDetail = true;
  }

  creUn(libelle: string) {
    let node = {
      name: "",
      id: "",
      type: "",
      color: "",
    }
    node.name = libelle;
    // node.type = this.type;
    node.color = this.colorItem;
    node.id = "id_" + [Math.random().toString(16).slice(2, 8)];
    this.nodeService.addDynamicNodeAbre(node);
    console.log(node);
    this.modalDetail = false;
  }
  updateNode(element: any) {
    this.displaySpinner = true;
    console.log("voici l'element");
    console.log(element);
    switch (element.color) {
      case "rgb(67, 130, 179)":
        element.color = "#C70039";
        //element.id = "id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNodeAbre(element);
        // this.nodeService.addConnection(this.connections);
        break;
      case "rgb(64, 124, 114)":
        element.color = "#581845";
        // element.id = "id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNodeAbre(element);
        // this.nodeService.addConnection(this.connections);
        break;
      case "rgb(242, 113, 62)":
        element.color = "#FF5733";
        // element.id = "id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNodeAbre(element);
        // // this.nodeService.addConnection(this.connections);
        break;
      case "rgb(114, 130, 114)":
        element.color = "#4F9F9B";
        // element.id = "id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNodeAbre(element);
        // this.nodeService.addConnection(this.connections);
        break;
      case "rgb(70, 87, 94)":
        element.color = "#036FAC";
        // element.id = "id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNodeAbre(element);
        break;
      case "rgb(104, 221, 238)":
        element.color = "#688E99";
        // element.id = "id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNodeAbre(element);
        // this.nodeService.addConnection(this.connections);
        break;
      default:
        break;
    }
  }

  displaySpinner = false;
  createNode(element: any) {
    console.log("voici l'element");
    console.log(element);
    let node = {
      id: "",
      top: "",
      name: "",
      left: "",
      type: "",
      color: "",
      height: "",
      width: "",
    }
    switch (element.color) {
      case "#4382B3":
        element.color = "#C70039";
        break;
      case "#407C72":
        element.color = "#581845";
        break;
      case "#F2713E":
        element.color = "#FF5733";
        break;
      case "#728272":
        element.color = "#4F9F9B";
        break;
      case "#46575E":
        element.color = "#036FAC";
        break;
      case "#68DDEE":
        element.color = "#688E99";
        break;
      default:
        break;
    }
    node.name = element.name;
    node.top = element.top;
    node.left = element.left;
    node.height = element.height;
    node.width = element.width;
    // node.type = this.type;

    node.id = "id_" + [Math.random().toString(16).slice(2, 8)];
    this.nodeService.addDynamicNodeAbre(node);
    console.log(node);
  }

  listNiveau(arbreTypeID: string) {
    console.log(arbreTypeID);
    console.log(this.arbre);
    this.tabNiveau = [];
    this.maPalletPerso = [];
    this.api.listArbreNiveauByType(arbreTypeID).subscribe(async res => {
      this.tabNiveau = res;
      console.log(this.tabNiveau);
      for await (const item of this.tabNiveau) {
        this.maPalletPerso.push(Object.assign({}, {
          idR: item.arbreNiveauID,
          key: item.libelleFr,
          text: item.libelleFr,
          color: item.couleur,
        }));
      }
      this.showPositionDialog('right');

    }, error => {
      console.log(error.error);

    });
  }
  // window.location.reload();

  saving = false;

  backAcc() {
    if (this.saving == true) {
      this.dialogConfirmAction = false;
      this.router.navigate(['home/Controle de gestion/arbreObjectif']);
    } else {
      this.dialogConfirmAction = false;
    }
  }



  save(arbre: any) {
    this.saving = true;
    console.log(arbre);

    if (this.route.snapshot.params.arbreTypeID != "ARBT20220427145445.011.102" && this.route.snapshot.params.arbreCorrespondantID == "null") {
      if (this.route.snapshot.params.arbreCorrespondantID == "null" && this.route.snapshot.params.arbreID != "null") {
        let arbreNew: Arbre = new Arbre();
        arbreNew.arbreCorrespondantID = this.route.snapshot.params.arbreID
        arbreNew.liens = this.nodeService.saveNodeJson();
        arbreNew.user_update = this.tokenStorageService.getUser().username;
        arbreNew.organisationID = this.route.snapshot.params.organisationID;
        arbreNew.libelleFr = this.route.snapshot.params.libelleFr + "Dérivé";
        arbreNew.libelleUs = this.route.snapshot.params.libelleUs;
        arbreNew.code = this.route.snapshot.params.code;
        arbreNew.ip_update = this.route.snapshot.params.ip_update;
        arbreNew.arbreTypeID = "ARBT20220427145445.011.102";

        this.api.createArbre(arbreNew).subscribe(data => {
          console.log(data);
          console.log(arbre);
          this.message = "L'arbre à objectif a bien été enregistré !";
          this.color = "rgb(5, 197, 27)"
          this.dialogConfirmAction = true;
          this.router.navigate(['home/Controle de gestion/arbreObjectif']);
        })
      } else if (this.route.snapshot.params.arbreCorrespondantID != "null" && this.route.snapshot.params.arbreID != "null") {
        console.log(arbre);
        arbre.liens = this.nodeService.saveNodeJson();
        arbre.arbreCorrespondantID = this.route.snapshot.params.arbreCorrespondantID;
        arbre.user_update = this.tokenStorageService.getUser().username;
        this.api.updateArbre(arbre).subscribe(data => {
          console.log(data);
          console.log(arbre);
          this.message = "Modification réussie !";
          this.color = "rgb(5, 197, 27)"
          this.dialogConfirmAction = true;

        }, error => {
          this.message = "Erreur d'enregistrement";
          this.dialogConfirmAction = true;
          this.color = "red"
          console.log(error.error);
        })
      }
    } else {
      console.log(arbre);
      arbre.liens = this.nodeService.saveNodeJson();
      arbre.user_update = this.tokenStorageService.getUser().username;
      this.api.updateArbre(arbre).subscribe(data => {
        console.log(data);
        console.log(arbre);
        this.message = "Modification réussie !";
        this.color = "rgb(5, 197, 27)"
        this.dialogConfirmAction = true;

      }, error => {
        this.message = "Erreur d'enregistrement";
        this.dialogConfirmAction = true;
        this.color = "red"
        console.log(error.error);
      })
    }


    /*  if (this.route.snapshot.params.arbreCorrespondantID == "null" && this.route.snapshot.params.arbreID != "null") {
       let arbreNew: Arbre = new Arbre();
       arbreNew.arbreCorrespondantID = this.route.snapshot.params.arbreID
       arbreNew.liens = this.nodeService.saveNodeJson();
       arbreNew.user_update = this.tokenStorageService.getUser().username;
       arbreNew.organisationID = this.route.snapshot.params.organisationID;
       arbreNew.libelleFr = this.route.snapshot.params.libelleFr;
       arbreNew.libelleUs = this.route.snapshot.params.libelleUs;
       arbreNew.code = this.route.snapshot.params.code;
       arbreNew.ip_update = this.route.snapshot.params.ip_update;
       arbreNew.arbreTypeID = "ARBT20220427145445.011.102";
 
       this.api.createArbre(arbreNew).subscribe(data => {
         console.log(data);
         console.log(arbre);
         this.message = "L'arbre à objectif a bien été enregistré !";
         this.color = "rgb(5, 197, 27)"
         this.dialogConfirmAction = true;
         this.router.navigate(['home/Controle de gestion/arbreObjectif']);
       })
     } else {
       
     } */

  }

  goOrienteObj() {
    console.log(this.arbre);

    this.router.navigate(['home/Controle de gestion/objectiRI', {
      arbre: this.arbre,
      arbreID: this.route.snapshot.params.arbreID,
      organisationID: this.route.snapshot.params.organisationID,
      libelleFr: this.route.snapshot.params.libelleFr,
      libelleUs: this.route.snapshot.params.libelleUs,
      code: this.route.snapshot.params.code,
      user_update: this.route.snapshot.params.user_update,
      ip_update: this.route.snapshot.params.ip_update,
      arbreTypeID: this.route.snapshot.params.typeArbreID,
      liens: this.route.snapshot.params.liens,
      index: 1
    }]);
  }

  verifyLength(valeur: any) {
    let val = "" + valeur; // amends the value to an string, even if its undefined or null etc
    if (val.toString().length >= 23) {
      return true
    }
    return false
  }


  defineDescription(libelle: any): string {
    let value = libelle.slice(0, 22)
    return value;
  }

  basculer2() {
    if (!this.route.snapshot.params.liens || this.route.snapshot.params.liens == "null") {
      this.message = "Aucunes données à basculer";
      this.color = "red"
      this.dialogConfirmAction = true;
    } else {
      this.router.navigate(['home/Controle de gestion/arbreGraphic', {
        arbreID: this.route.snapshot.params.arbreID,
        arbreCorrespondantID: this.route.snapshot.params.arbreCorrespondantID,
        organisationID: this.route.snapshot.params.organisationID,
        libelleFr: this.route.snapshot.params.libelleFr,
        liens: this.route.snapshot.params.liens,
        libelleUs: this.route.snapshot.params.libelleUs,
        code: this.route.snapshot.params.code,
        ip_update: this.route.snapshot.params.ip_update,
        typeArbreID: "ARBT20220427145445.011.102"
      }]);
      this.listNiveau("ARBT20220427145445.011.102");
      this.loadNodes(this.route.snapshot.params.liens);
    }
  }

  basculer() {
    if (!this.route.snapshot.params.liens || this.route.snapshot.params.liens == "null") {
      this.message = "Aucunes données à basculer";
      this.color = "red"
      this.dialogConfirmAction = true;
    } else {
      this.router.navigate(['home/Controle de gestion/arbreGraphicCor', {
        bascule: 1,
        arbreID: this.route.snapshot.params.arbreID,
        arbreCorrespondantID: this.route.snapshot.params.arbreCorrespondantID,
        organisationID: this.route.snapshot.params.organisationID,
        libelleFr: this.route.snapshot.params.libelleFr,
        liens: this.route.snapshot.params.liens,
        libelleUs: this.route.snapshot.params.libelleUs,
        code: this.route.snapshot.params.code,
        ip_update: this.route.snapshot.params.ip_update,
        typeArbreID: "ARBT20220427145445.011.102"
      }]);
    }
  }
}
