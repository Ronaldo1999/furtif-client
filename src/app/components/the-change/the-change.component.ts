// import { Component, OnInit } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { ApiService } from 'src/app/services/api.service';
import { NodeService } from './node/node.service';
import { jsPlumb } from 'jsplumb';
import { TheorieChangement } from 'src/app/class/theorie-changement';
import { Exercice } from 'src/app/class/exercice';
import { Indicateur } from 'src/app/class/indicateur.model';
import { Objectif } from 'src/app/class/objectif.model';
import { ActiviteTheorie } from 'src/app/class/activite-theorie';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { MenuItem } from 'primeng/api';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { Organisation } from 'src/app/class/organisation/organisation';

@Component({
  selector: 'app-the-change',
  templateUrl: './the-change.component.html',
  styleUrls: ['./the-change.component.css']
})
export class TheChangeComponent implements OnInit {

  theorie: TheorieChangement = new TheorieChangement();
  organisation: Organisation = new Organisation();
  organisations: Organisation[] = [];
  theories: TheorieChangement[] = [];
  selectedtheories: TheorieChangement[] = [];

  exercices: Exercice[] = []

  nodesIntrants: any[] = [];
  nodesExtrants: any[] = [];
  nodesActivite: any[] = [];
  nodesEffInst: any[] = [];
  nodesCoursT: any[] = [];
  nodesLongT: any[] = [];
  nodes = [];
  connections = [];
  // nodes = [];
  index = 0;
  modalDetail = false;
  libelle: string = "";
  // @Input() node: Node;

  dialogConfirmAction = false;
  ConfirmationLibelle = "";
  color = "";
  message = "";

  btnCancelLabel: string = "";
  action: string = "";
  libelleActivite: string = "";
  modalNewCan = false;
  dialogDelete = false;
  verified = false;
  dialogGesTitre = false;
  dialogAddTitre = false;
  dialogDeletetheorie = false;
  dialogDeplacer = false;
  modalDescripTheorie = false;

  dialogIndicateur = false;
  dialogObjectif = false;
  dialogActivite = false;
  indicateur: Indicateur = new Indicateur();
  objectif: Objectif = new Objectif();
  activite: ActiviteTheorie = new ActiviteTheorie();

  modalEle = false;
  @Input() jsPlumbInstance: any;
  jsPlumbInstance2 = jsPlumb.getInstance();

  constructor(
    public nodeService: NodeService,
    public api: ApiService,
    public router: Router,
    public dialogService: DialogService,
    public translate: TranslateService,
    private tokenStorageService: TokenStorageService,
    // private route: ActivatedRoute,
  ) {

  }

  rechercher() {
    this.listTheorie('ORG20180017050207.606.950');
  }
  listOrganisation() {
    this.api.organisationList('', true).subscribe(data => {
      this.organisations = data;
    });
  }

  listExercice() {
    this.api.listExercice().subscribe((data) => {
      this.exercices = data;
    })
  }

  items: MenuItem[] = [];
  spinner = false;
  listTheorie(organisationID: string) {
    this.spinner = true;
    this.theories = [];
    this.api.listTheorie(organisationID).subscribe(res => {
      this.theories = res;
      this.spinner = false;
      if (this.theories.length == 0) {
        this.defineLibelleModal("notFound", "theorie");
        this.dialogConfirmAction = true;
      }
    })
  }
  newtheorie() {
    this.theorie = new TheorieChangement();
    this.action = "new";
    this.defineLibelleModal(this.action, "theorie");
    this.modalNewCan = true;
  }

  libelle2 = "";

  defineLibelleModal(action: string, sujet: string) {
    switch (action) {
      case "new":
        this.libelle2 = "Creation d'une " + sujet;
        this.btnCancelLabel = "Annuler";
        this.message = "Bien enregistré";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "edit":
        this.libelle2 = "Edition d'une " + sujet;
        this.btnCancelLabel = "Annuler";
        this.message = "Modification réussie";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "errorSave":
        this.message = "Erreur d'enregistrement";
        this.ConfirmationLibelle = "Attention !";
        this.color = "red";
        break;
      case "noSelected":
        this.message = "Veuillez selectionner une organisation et une structure !";
        this.ConfirmationLibelle = "Attention !";
        this.color = "red";
        break;
      case "errorDelete":
        this.message = "Ce " + sujet + " est lié à d'autre éléments et ne peut etre supprimé !";
        this.ConfirmationLibelle = "Attention !";
        this.color = "red";
        break;
      case "notFound":
        this.message = "Rien trouvé";
        this.ConfirmationLibelle = "Attention !";
        this.color = "rgb(231, 171, 17)";
        break;
      case "view":
        this.libelle2 = "Consultation d'un " + sujet;
        this.btnCancelLabel = "Fermer";
        break;
      case "delete":
        this.message = "Suppression réussie";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "cancel":
        this.message = "Etes-vous certains de vouloir abandonner vos modifications ?";
        this.color = "rgb(5, 197, 27)";
        break;
      default:
        break;
    }
  }

  jsonText = "";
  detail: any;
  modalDetail2 = false;

  consulter2(theorie: TheorieChangement) {
    this.router.navigate(['home/theoChange2', { theoriechangementID: theorie.theoriechangementID, liens: theorie.liens }]);
  }
  consulter3(theorie: TheorieChangement) {
    this.router.navigate(['home/theoChange2', { theoriechangementID: theorie.theoriechangementID, liens: theorie.liens }]);
  }


  consulter(theorie: TheorieChangement) {
    this.nodes = [];
    this.connections = [];
    this.theorie = theorie;
    if (this.theorie.liens) {
      // this.nodeService.vider(this.theorie?.liens);
      console.log(this.theorie?.liens);
      this.nodes = this.nodeService.getNodess(this.theorie?.liens);
      console.log(this.nodes);
      this.connections = this.nodeService.getLinks(this.theorie?.liens);
      console.log(this.connections);
    }
    this.modalDescripTheorie = true;
  }

  saveTheorie() {
    this.theorie.liens = this.nodeService.saveNodeJson();
    this.save(this.theorie);
    this.modalDescripTheorie = false;
    this.defineLibelleModal("new", "théorie");
    this.dialogConfirmAction = true;
  }

  edit(theorie: TheorieChangement) {
    this.theorie = theorie;
    console.log(this.theorie);
    this.action = "edit";
    this.defineLibelleModal(this.action, "théorie");
    this.modalNewCan = true;
  }

  get(theorie: TheorieChangement, action: string) {
    this.action = action;
    this.theorie = theorie;
    this.modalNewCan = true;
  }
  suppress(theorie: TheorieChangement) {
    this.theorie = theorie;
    console.log(this.theorie);
    this.action = "delete";
    this.defineLibelleModal(this.action, "théorie");
    this.dialogDelete = true;
  }

  verifyField(obj: any) {
    if (!obj.libelleFr && !obj.code) {
      this.verified = false;
      this.message = "Verifier les informations entrées";
      this.color = "rgb(217, 51, 13)";
      this.dialogConfirmAction = true;
    } else {
      this.verified = true;
    }
  }



  save(theorie: TheorieChangement) {
    this.theorie = theorie;
    this.theorie.user_update = this.tokenStorageService.getUser().username;
    this.theorie.ip_update = "192.168.0.100";
    this.theorie.organisationID = 'ORG20180017050207.606.950';
    console.log(this.theorie);
    this.verifyField(this.theorie);
    if (!this.theorie.theoriechangementID && this.verified == true) {
      this.api.createTheorie(this.theorie).subscribe(data => {
        console.log(this.theorie);
        this.defineLibelleModal("new", "theorie");
        this.dialogConfirmAction = true;
        this.theorie = new TheorieChangement();
        this.listTheorie('ORG20180017050207.606.950');
        this.modalNewCan = false;
      }, error => {
        this.message = "Erreur d'enregistrement";
        this.dialogConfirmAction = true;
        console.log(error.error);
      })
    } else if (this.theorie.theoriechangementID && this.verified == true) {
      this.api.createTheorie(this.theorie).subscribe(data => {
        console.log(this.theorie);
        this.defineLibelleModal("edit", "theorie");
        this.dialogConfirmAction = true;
        this.listTheorie('ORG20180017050207.606.950');
        this.modalNewCan = false;
      }, error => {
        console.log(this.theorie);
        this.defineLibelleModal("errorSave", "theorie");
        console.log(error.error);
      })
    }
  }

  tabActivite: ActiviteTheorie[] = [];
  saveActivite(activite: ActiviteTheorie) {
    if (!activite.libelleFr) {
      this.message = "Veuillez entrer un libellé pour cet " + this.type;
      this.color = "red";
      this.dialogConfirmAction = true;
    } else {
      this.newNode(this.type, activite.libelleFr);
      this.dialogActivite = false;
      this.tabActivite.push(activite);
      console.log(this.tabActivite);
    }

  }

  displayModalDel = false;


  deleteTheorie(theorie: TheorieChangement) {
    this.api.deleteTheorie(theorie.theoriechangementID, theorie.user_update).subscribe(data => {
      console.log(data);
      this.defineLibelleModal("delete", "Théorie");
      this.dialogDelete = false;
      this.dialogConfirmAction = true;
      this.listTheorie('ORG20180017050207.606.950');
    }, error => {
      this.defineLibelleModal("errorDelete", "Axe stratégique");
      this.dialogDelete = false;
      this.dialogConfirmAction = true;
      this.listTheorie('ORG20180017050207.606.950');
    });
  }



  ngOnInit() {
    this.listOrganisation();
    this.listExercice();
    this.rechercher();
    this.items = [
      { label: 'Update', icon: 'pi pi-refresh', command: () => { }, },
      { label: 'Delete', icon: 'pi pi-times', command: () => { }, },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];
    // this.addNode(8);
  }

  type: string = "";

  addNodeIntrant() {
    this.type = "Intrant";
    this.title = "Ajout d'un " + this.type
    this.modalDetail = true;
  }
  addNodeExtrant() {
    this.type = "Extrant";
    this.title = "Ajout d'un " + this.type
    this.modalDetail = true;
    // this.newNode(this.type, this.libelle);
  }
  addNodeActivite() {

    this.type = "Activite";
    this.title = "Ajout d'une " + this.type
    this.modalDetail = true;

  }
  addNodeEffLongterme() {
    this.type = "Effet long terme";
    this.title = "Ajout d'un " + this.type
    this.modalDetail = true;
  }

  addNodeEffCourtTerme() {
    this.type = "Effet court terme";
    this.title = "Ajout d'un " + this.type
    this.modalDetail = true;
  }

  addNodeInstant() {
    this.type = "Effet Instantané";
    this.title = "Ajout d'un " + this.type
    this.modalDetail = true;
  }
  title: string = "";
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
        node.color = "rgba(21, 224, 31, 0.87)";
        node.id = "Intrant id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Extrant":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(221, 224, 21, 0.993)";
        node.id = "Extrant id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Activite":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(224, 143, 21, 0.993)";
        node.id = "Activite id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Effet court terme":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(41, 167, 108, 0.966)";
        node.id = "EffetCT id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Effet Instantané":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(123, 236, 30, 0.966)";
        node.id = "EffetIns id_" + [Math.random().toString(16).slice(2, 8)];
        this.nodeService.addDynamicNode(node);
        console.log(node);
        break;
      case "Effet long terme":
        node.name = libelle;
        node.type = type;
        node.color = "rgba(41, 142, 167, 0.966)";
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

  delete(operation: string, client?: TheorieChangement) {
    if (client) {
      this.selectedtheories.push(Object.assign({}, client));
    }
    this.ref = this.dialogService.open(DeleteDialogComponent, {
      header: this.translate.instant('Attention'),
      width: '25vw',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: true,
      data: { msg: this.translate.instant(operation) }
    });
    this.ref.onClose.subscribe((data) => {
      if (data == 'delete') {
        this.api.deleteTheorieList(this.selectedtheories).subscribe(res => {
          this.showSuccesDialog('succes supression');
          this.rechercher();
        })
      }
    });
  }

}
