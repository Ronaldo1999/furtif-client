import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeService2 } from './node.service';
import { Location } from '@angular/common'
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { TheorieChangement } from 'src/app/class/theorie-changement';
import { TheorieHypothese } from 'src/app/class/theorie-hypothese';
import { ApiService } from 'src/app/services/api.service';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-theorie-changement',
  templateUrl: './theorie-changement.component.html',
  styleUrls: ['./theorie-changement.component.scss']
})
export class TheorieChangementComponent implements OnInit {


  theorie: TheorieChangement = new TheorieChangement();
  hypothese: TheorieHypothese = new TheorieHypothese();
  nodes = [];
  libeleEntete = "";
  connections = [];
  hypotheses = [];
  modalDetail = false;
  diaplayNewHypothese = false;
  type = "";
  titleHypo = "";
  newHypothese = "";
  libelle = "";
  message = "";
  color = "";
  dialogConfirmAction = false;
  title = "";

  typeHypothese = "";

  libelleHypothese = "";
  positionHypothese = "";
  titleListeHypo = "";
  diaplayHypothese = false;

  tabHD: any[] = [];
  listHypothese: any[] = [];
  tabHM: any[] = [];
  tabHBB: any[] = [];
  tabHP: any[] = [];
  tabHR: any[] = [];
  typeOrient = "";


  constructor(
    private nodeService: NodeService2,
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    public api: ApiService,
    public dialogService: DialogService,
    public translate: TranslateService,
    private tokenStorageService: TokenStorageService,
  ) { }
  spinner = false;
  ngOnInit() {
    if (this.route.snapshot.params.liens != null) {
      this.showNodes(this.route.snapshot.params.liens);
    }
    /* this.listTheorie('ORG20180017050207.606.950'); */
    this.listHypotheses();
  }
  showNodes(liens: string) {
    console.log("dans le wé");
    const data = JSON.parse(liens);
    console.log(data);
    this.nodes = data.nodes;
    this.connections = data.connections;
  }

  theories: TheorieChangement[] = [];
  listTheorie() {
    this.theories = [];
    this.api.listTheorie('ORG20180017050207.606.950').subscribe(res => {
      this.theories = res;
      for (const ele of res) {
        if (ele.theoriechangementID == this.route.snapshot.params.theoriechangementID) {
          this.theorie = ele;
        }
      }
    })
  }
  retour() {
    this.location.back();
  }
  posirionHelp = "";
  diaplayHelp = false;
  helpMe(position: string) {
    this.posirionHelp = position;
    this.diaplayHelp = true;
  }


  showHypoList(position: string, type: string) {
    this.titleListeHypo = "Liste des hypothèses " + type;
    this.typeHypothese = type;
    this.getTabByType2(type);
    console.log(this.typeHypothese);
    this.positionHypothese = position;
    this.diaplayHypothese = true;
  }

  listHypotheses() {
    this.api.listTheorieHypothese(this.route.snapshot.params.theoriechangementID).subscribe(res => {
      this.listHypothese = res;
      console.log(this.listHypothese);
      this.getTabByType3(this.typeHypothese, this.listHypothese)
    })
  }

  listHypo: any[] = [];
  getTabByType2(type: any) {
    this.listHypo = [];

    for (const element of this.listHypothese) {
      if (element.typeHypothese == type) {
        switch (element.typeHypothese) {
          case 'HD':
            this.listHypo.push(element);
            break;
          case 'HM':
            this.listHypo.push(element);
            break;
          case 'HBB':
            this.listHypo.push(element);
            break;
          case 'HP':
            this.listHypo.push(element);
            break;
          case 'HR':
            this.listHypo.push(element);
            break;

          default:
            break;
        }
      }
    }
    console.log(this.listHypo);
  }
  getTabByType3(type: any, tab: any[]) {
    this.listHypo = [];
    for (const element of tab) {
      if (element.typeHypothese == type) {
        switch (element.typeHypothese) {
          case 'HD':
            this.listHypo.push(element);
            break;
          case 'HM':
            this.listHypo.push(element);
            break;
          case 'HBB':
            this.listHypo.push(element);
            break;
          case 'HP':
            this.listHypo.push(element);
            break;
          case 'HR':
            this.listHypo.push(element);
            break;

          default:
            break;
        }
      }
    }
    console.log(this.listHypo);
  }
  getTabByType(type: any) {
    let tabResult: any[] = [];
    this.tabHD = [];
    this.tabHM = [];
    this.tabHBB = [];
    this.tabHP = [];
    this.tabHR = [];
    for (const element of this.listHypothese) {
      if (element.typeHypothese == type) {
        switch (element.typeHypothese) {
          case 'HD':
            this.tabHD.push(element);
            tabResult = this.tabHD;
            break;
          case 'HM':
            this.tabHM.push(element);
            tabResult = this.tabHM;
            break;
          case 'HBB':
            this.tabHBB.push(element);
            tabResult = this.tabHBB;
            break;
          case 'HP':
            this.tabHP.push(element);
            tabResult = this.tabHP;
            break;
          case 'HR':
            this.tabHR.push(element);
            tabResult = this.tabHR;
            break;

          default:
            break;
        }
      }

    }
    return tabResult;
  }

  newHypothesee() {
    this.titleHypo = "Ajout d'une hypothèse"
    this.hypothese = new TheorieHypothese();
    this.hypothese.typeHypothese = this.typeHypothese;
    this.hypothese.theoriechangementID = this.route.snapshot.params.theoriechangementID;
    this.hypothese.organisationID = this.route.snapshot.params.organisationID;
    this.diaplayNewHypothese = true;
  }
  editHypo(hypothese: any) {
    this.titleHypo = "Edition d'une hypothèse"
    this.hypothese = hypothese;
    this.diaplayNewHypothese = true;
  }
  suppress(hypothese: any) {
    this.hypothese = hypothese;
    this.dialogDelete = true;
  }

  addNodeIntrant() {
    this.type = "Intrant";
    this.title = "Ajout d'un " + this.type;
    this.modalDetail = true;
  }
  addNodeExtrant() {
    this.type = "Extrant";
    this.title = "Ajout d'un " + this.type;
    this.modalDetail = true;
  }
  addNodeActivite() {

    this.type = "Activite";
    this.title = "Ajout d'une " + this.type;
    this.modalDetail = true;

  }
  addNodeEffLongterme() {
    this.type = "Effet long terme";
    this.title = "Ajout d'un " + this.type;
    this.modalDetail = true;
  }
  addNodeEffCourtTerme() {
    this.type = "Effet court terme";
    this.title = "Ajout d'un " + this.type;
    this.modalDetail = true;
  }
  addNodeInstant() {
    this.type = "Effet Instantané";
    this.title = "Ajout d'un " + this.type;
    this.modalDetail = true;
  }
  defineActionBuType(type: string, libelle: string) {
    let node = {
      name: "",
      id: "",
      type: "",
      color: "",
    }
    switch (type) {
      case "Intrant":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(189, 193, 197)";
        node.id = "Intrant id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Activite":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(117, 194, 182)";
        node.id = "Activite id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Extrant":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(183, 234, 220)";
        node.id = "Extrant id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Effet court terme":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(230, 184, 59)";
        node.id = "EffetCT id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Effet Instantané":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(236, 157, 30)";
        node.id = "EffetIns id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Effet long terme":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(95, 101, 103)";
        node.id = "EffetLT id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      default:
        break;
    }
  }
  newNode(type: string, libelle: string) {
    this.defineActionBuType(type, libelle)
  }

  dialogDelete = false;
  deleteHypothese(hypothese: TheorieHypothese) {
    this.api.deleteTheorieHypothese(hypothese.theorieHypotheseID, hypothese.user_update).subscribe(data => {
      console.log(data);
      this.dialogDelete = false;
      this.message = "Suppression réussie";
      this.color = "rgb(5, 197, 27)"
      this.dialogConfirmAction = true;
      this.listHypotheses();
    }, error => {
      console.log(error.error);
      this.dialogDelete = false;
      this.dialogConfirmAction = true;
    });
  }


  saveObject() {
    if (!this.libelle) {
      this.message = "Veuillez entrer un libellé pour cet " + this.type;
      this.color = "red";
      this.dialogConfirmAction = true;
    } else {
      this.newNode(this.type, this.libelle);
      this.modalDetail = false;
      this.libelle = "";
    }

  }

  recharger() {
    window.location.reload();
  }

  saveTheorie() {
    this.theorie.liens = this.nodeService.saveNodeJson();
    this.theorie.user_update = this.tokenStorageService.getUser().username;
    this.save(this.theorie);
  }

  save(theorie: TheorieChangement) {
    this.spinner = true;
    this.api.createTheorie(theorie).subscribe(data => {
      console.log(data);
      console.log(theorie);
      this.spinner = false;
      this.showSuccesDialog('sucessCreateTheorie');
    }, error => {
      this.spinner = false;
      this.showErrorDialog('errorCreateTheorie');
      console.log(error.error);
    })
  }

  showErrorDialog(operation: string) {
    this.ref = this.dialogService.open(ErrorDialogComponent, {
      header: this.translate.instant('Erreur'),
      width: '20vw',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: true,
      data: { msg: this.translate.instant(operation) }
    });
  }
  ref!: DynamicDialogRef;
  showSuccesDialog(message: string) {
    this.ref = this.dialogService.open(SuccessDialogComponent, {
      header: this.translate.instant('succes'),
      width: '20vw',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: false,
      data: { msg: this.translate.instant(message) }
    });

    this.ref.onClose.subscribe((data) => {
      if (data) {
        /* this.showErrorDialog('errorDelete'); */
      }
    });
  }

  saveHypothese(hypothese: TheorieHypothese) {
    this.hypothese = hypothese;
    this.hypothese.user_update = this.tokenStorageService.getUser().username;
    this.hypothese.ip_update = "192.168.0.100";
    this.hypothese.organisationID = this.route.snapshot.params.organisationID;
    console.log(this.hypothese);
    if (!this.hypothese.theorieHypotheseID) {
      this.api.createTheorieHypothese(this.hypothese).subscribe(data => {
        console.log(this.hypothese);
        this.color = "rgb(5, 197, 27)"
        this.message = "Bien enregistré";
        this.dialogConfirmAction = true;
        this.hypothese = new TheorieHypothese();
        this.listHypotheses();
        this.diaplayNewHypothese = false;
      }, error => {
        this.message = "Erreur d'enregistrement";
        this.dialogConfirmAction = true;
        console.log(error.error);
      })
    } else if (this.hypothese.theorieHypotheseID) {
      this.api.createTheorieHypothese(this.hypothese).subscribe(data => {
        console.log(data);
        this.color = "rgb(5, 197, 27)"
        this.message = "Bien enregistré";
        this.dialogConfirmAction = true;
        this.hypothese = new TheorieHypothese();
        this.listHypotheses();
        this.diaplayNewHypothese = false;
      }, error => {
        console.log(this.theorie);
        console.log(error.error);
      })
    }
  }

  goOrienteObj() {
    this.router.navigate(['home/Controle de gestion/objectiRI', {
      user_update: this.tokenStorageService.getUser().username,
      ip_update: "192.168.0.100",
      organisationID: this.route.snapshot.params.organisationID,
      theoriechangementID: this.route.snapshot.params.theoriechangementID,
      code: this.route.snapshot.params.code,
      libelleFr: this.route.snapshot.params.libelleFr,
      libelleUs: this.route.snapshot.params.libelleUs,
      liens: this.route.snapshot.params.liens,
      index: 1
    }]);
  }

}