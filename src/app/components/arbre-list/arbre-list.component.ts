import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NodeService } from '../the-change/node/node.service';

import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { jsPlumb } from 'jsplumb';
import { Arbre } from 'src/app/class/arbre';
import { Arbredetail } from 'src/app/class/arbre-detail';
import { ArbreNiveau } from 'src/app/class/arbre-niveau';
import { ArbreType } from 'src/app/class/arbre-type';
import { ApiService } from 'src/app/services/api.service';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { Organisation } from 'src/app/class/organisation/organisation';
import { Structure } from 'src/app/class/structure/structure';

@Component({
  selector: 'app-arbre-list',
  templateUrl: './arbre-list.component.html',
  styleUrls: ['./arbre-list.component.scss'],
  providers: [MessageService, DialogService, DynamicDialogRef]
})
export class ArbreListComponent implements OnInit {


  modalEle = false;
  @Input() jsPlumbInstance: any;
  jsPlumbInstance2 = jsPlumb.getInstance();
  selectedArbres: Arbre[] = [];

  nodesIntrants = [];

  action: string = "";
  ref!: DynamicDialogRef;

  tabOrganisation: any[] = [];
  tabType: ArbreType[] = [];
  arbreType: ArbreType = new ArbreType();
  tabArbreFiltre: Arbre[] = [];

  typeArbre: string = "";
  organisationID: string = "";

  selectedArbre = new Arbre();
  libelle: string = "";
  libelleSupres: string = "";

  listArbreParOrgType: Arbre[] = [];
  items: MenuItem[] = [];
  arbreTypes: any[] = [];
  arbres: any[] = [];

  arbre: Arbre = new Arbre();
  arbreOb: Arbre = new Arbre();
  detailArbre: Arbredetail = new Arbredetail();
  typeArbreID: string = "";

  arbreUpdateModal = false;
  helpDialog = false;

  displayModalOb = false;
  displayModalDel = false;

  structures: Structure[] = [];
  organisations: Organisation[] = [];
  organisation: Organisation = new Organisation();
  structure: Structure = new Structure();

  // loading: boolean = true;

  tabNiveau: ArbreNiveau[] = [];
  maPalletPerso: any[] = [];

  constructor(
    private api: ApiService,
    public messageService: MessageService,
    public router: Router,
    public route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    public nodeService: NodeService,
    public translate: TranslateService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.btnCancel = 'Annuler'
    this.action = "new";
    this.arbre = new Arbre();
    this.arbreOb = new Arbre();
    this.listType();
    this.listOrganisation();
    this.rechercher();
    this.listArbreProbleme();

    // this.helpDialog = true;
    // this.listArbre(this.orgID, this.typeID);
  }

  verif = false;
  color = "";
  verified = false;
  message = "";
  dialogConfirmAction = false;

  verifyField(obj: any) {
    if (!obj.code || !obj.libelleFr) {
      this.verif = false;
      this.color = "red";
      this.verified = false;
      this.message = "Verifier les informations formelles de l'arbre";
      this.dialogConfirmAction = true;
    } else {
      this.verif = true;
      this.verified = true;
    }
  }

  saveArbre() {
    const arbre = this.arbre;
    arbre.organisationID = 'ORG20180017050207.606.950';
    arbre.user_update = this.tokenStorageService.getUser().username;
    arbre.ip_update = "192.168.0.104";
    this.verifyField(arbre);
    if (!arbre.arbreID && this.verified == true) {
      this.api.createArbre(arbre).subscribe(data => {
        console.log(arbre);
        this.defineLibelleModal("new");
        this.dialogConfirmAction = true;
        this.arbre = new Arbre();
        this.listArbre('ORG20180017050207.606.950');
        this.arbreUpdateModal = false;
      }, error => {
        this.defineLibelleModal("errorSave");
        this.dialogConfirmAction = true;
        console.log(error.error);
      })
    } else if (arbre.arbreID && this.verified == true) {
      this.api.updateArbre(arbre).subscribe(data => {
        console.log(arbre);
        this.defineLibelleModal("edit");
        this.dialogConfirmAction = true;
        this.arbre = new Arbre();
        this.listArbre('ORG20180017050207.606.950');
        this.arbreUpdateModal = false;
      }, error => {
        this.defineLibelleModal("errorSave");
        this.dialogConfirmAction = true;
        console.log(error.error);
      })
    }
  }

  saveError() {
    this.displayModalError = true;
  }

  testValue() {
    console.log(this.tabType);
  }

  getIndex(index: any) {
    console.log(index);
  }

  displayModalOk = false;
  displayModalError = false;
  saveSuccess() {
    this.listArbre('ORG20180017050207.606.950');
    this.displayModalOb = false;
    this.displayModalOk = true;
    this.arbreOb = new Arbre();
  }
  updateSuccess() {
    this.listArbre('ORG20180017050207.606.950');
    this.displayModalOb = false;
    this.displayModalOk = true;
    this.arbreOb = new Arbre();
  }

  listType() {
    this.api.listArbreType().subscribe(data => {
      this.tabType = data;
    });
  }


  getIdFromLibelle(libelle: string): any {
    let id = '';
    for (const type of this.tabType) {
      if (type.libelleFr == libelle) {
        id = type.arbreTypeID;
      }
    }
    return id;
  }
  getLibelleByID(id: string): any {
    let libelleType = '';
    for (const type of this.tabType) {
      if (type.arbreTypeID == id) {
        libelleType = type.libelleFr;
      }
    }
    return libelleType;
  }

  listOrganisation() {
    this.api.organisationList('', true).subscribe(data => {
      this.organisations = data;
    });
  }

  displayErrSupres = false;
  deleteAbre(arbre: Arbre) {
    this.api.deleteArbre(arbre.arbreID, arbre.user_update).subscribe(data => {
      console.log(data);
      this.defineLibelleModal("delete");
      this.displayModalDel = false;
      this.dialogConfirmAction = true;
      this.rechercher();
    }, error => {
      console.log(error.error);
      this.displayErrSupres = true;
      this.rechercher();
    });
  }
  btnCancel = "";
  // Les actions
  editArbre(item: Arbre) {
    const context = item;
    this.arbreUpdateModal = true;
    this.arbre = context;
    this.action = 'edit'
    this.btnCancel = 'Annuler'
    this.libelle = "Edition d'un " + this.typeArbre;
  }
  editArbreOb(item: Arbre) {
    this.arbreOb = item;
    this.action = 'edit';
    this.btnCancel = 'Annuler';
    this.libelle = "Edition d'un " + this.typeArbre;
    this.displayModalOb = true;
  }

  // action: string;
  consultArbre(item: Arbre) {
    this.arbre = item;
    this.action = 'view'
    this.btnCancel = 'Fermer'
    this.libelle = "Consultation d'un Arbre";
    this.arbreUpdateModal = true;
  }

  confirmDelete(item: Arbre) {
    this.arbre = item;
    this.action = 'delete';
    this.displayModalDel = true;
    this.libelleSupres = "Suppression d'un Arbre";
  }


  orgID: string = "";
  selectOrg(event: any) {
    this.orgID = event.value.organisationID;
    console.log(this.orgID);
    // this.rechercher();
  }

  spinner = false;
  listArbre(organisation: string) {
    this.spinner = true;
    this.tabArbreFiltre = [];
    this.api.listArbreByOrg(organisation).subscribe(res => {
      this.tabArbreFiltre = res;
      this.spinner = false;
      if (this.tabArbreFiltre.length == 0) {
        this.showErrorDialog('notFound');
      }
      console.log(this.tabArbreFiltre);
    },
      error => {
        this.spinner = false;
        this.showErrorDialog('errorTraitement');
        console.log(error.error);
      })
  }

  typeID: string = "";
  selectType(event: any) {
    this.typeID = event.value.arbreTypeID;
    this.typeArbre = event.value.libelleFr;
    console.log(this.tabType);
    /*  if (this.typeArbre == 'ARBRE A PROBLEME') {
       this.items = [
         { label: 'Consulter', icon: 'pi pi-eye', command: () => this.consultArbre(this.selectedArbre) },
         { label: 'Conséquences + effets', icon: 'pi pi-plus', command: () => this.naviger(this.selectedArbre) },
         { label: 'Modifier', icon: 'pi pi-pencil', command: () => this.editArbre(this.selectedArbre) },
         { label: 'Supprimer', icon: 'pi pi-times', command: () => this.confirmDelete(this.selectedArbre) },
       ];
     } else if (this.typeArbre == 'ARBRE A OBJECTIF') {
       this.items = [
         { label: 'Consulter', icon: 'pi pi-eye', command: () => this.consultArbre(this.selectedArbre) },
         { label: 'Objectifs + Résultats', icon: 'pi pi-plus', command: () => this.naviger(this.selectedArbre) },
         { label: 'Modifier', icon: 'pi pi-pencil', command: () => this.editArbreOb(this.selectedArbre) },
         { label: 'Supprimer', icon: 'pi pi-times', command: () => this.confirmDelete(this.selectedArbre) },
       ];
     } */
  }

  tabCorrspodant = [];
  correspondance(arbreID: string) {
    let resultat = false;
    this.api.arbreFindCorrespondant('ORG20180017050207.606.950', arbreID).subscribe(res => {
      console.log(res);
      if (res.length >= 1) {
        resultat = true;
      } else if (res.length == 0) {
        resultat = false;
      }
    })
    return resultat;
  }

  tabArbrePb: Arbre[] = [];
  listArbreProbleme() {
    this.tabArbrePb = [];
    this.api.listArbreByTypeAndOrg('ORG20180017050207.606.950', "ARBT20220427145445.201.221").subscribe(res => {
      this.tabArbrePb = res;
      console.log(this.tabArbrePb);
    },
      error => {
        console.log(error.error);
      })
  }

  libelleArbre = ";"
  graphicArbreModal = false;
  niveauTrie: any[] = [];

  correspondant: Arbre = new Arbre();
  arbreFindCorrespondant(arbre: Arbre) {
    this.api.arbreFindCorrespondant('ORG20180017050207.606.950', arbre.arbreID).subscribe(data => {
      console.log(data);
      if (data.length >= 1) {
        this.correspondant = data[0];
        this.getArbreObjectif(this.correspondant);
        console.log(this.correspondant);
      } else if (data.length == 0) {
        this.showErrorDialog("notArbreFound")
        this.defineLibelleModal("notArbreFound");
        this.dialogConfirmAction = true;
      }
    })
  }

  getArbreObjectif(arbre: Arbre) {
    if (arbre.liens != null) {
      this.router.navigate(['home/arbreGraphicCor', {
        nbFois: "1",
        arbreID: arbre.arbreID,
        arbreCorrespondantID: arbre.arbreCorrespondantID,
        organisationID: arbre.organisationID,
        liens: arbre.liens,
        libelleFr: arbre.libelleFr,
        libelleUs: arbre.libelleUs,
        code: arbre.code,
        ip_update: arbre.ip_update,
        typeArbreID: arbre.arbreTypeID
      }]);
    } else {
      this.router.navigate(['home/arbreGraphicCor', {
        arbreID: arbre.arbreID,
        arbreCorrespondantID: arbre.arbreCorrespondantID,
        organisationID: arbre.organisationID,
        libelleFr: arbre.libelleFr,
        libelleUs: arbre.libelleUs,
        code: arbre.code,
        ip_update: arbre.ip_update,
        typeArbreID: arbre.arbreTypeID
      }]);
    }
  }

  get(arbre: Arbre, action: string) {
    this.action = action;
    this.arbre = arbre;
    this.arbreUpdateModal = true;
  }

  consulter2(arbre: Arbre) {
    console.log(arbre);
    if (arbre.arbreTypeID == 'ARBT20220427145445.201.221') {
      if (arbre.liens != null) {
        this.router.navigate(['home/arbreGraphic', {
          nbFois: "1",
          arbreID: arbre.arbreID,
          arbreCorrespondantID: arbre.arbreCorrespondantID,
          organisationID: arbre.organisationID,
          liens: arbre.liens,
          libelleFr: arbre.libelleFr,
          libelleUs: arbre.libelleUs,
          code: arbre.code,
          ip_update: arbre.ip_update,
          typeArbreID: arbre.arbreTypeID
        }]);
      } else {
        this.router.navigate(['home/arbreGraphic', {
          arbreID: arbre.arbreID,
          arbreCorrespondantID: arbre.arbreCorrespondantID,
          organisationID: arbre.organisationID,
          libelleFr: arbre.libelleFr,
          libelleUs: arbre.libelleUs,
          code: arbre.code,
          ip_update: arbre.ip_update,
          typeArbreID: arbre.arbreTypeID
        }]);
      }
    } else {
      if (arbre.liens != null) {
        this.router.navigate(['home/arbreGraphicCor', {
          nbFois: "1",
          arbreID: arbre.arbreID,
          arbreCorrespondantID: arbre.arbreCorrespondantID,
          organisationID: arbre.organisationID,
          liens: arbre.liens,
          libelleFr: arbre.libelleFr,
          libelleUs: arbre.libelleUs,
          code: arbre.code,
          ip_update: arbre.ip_update,
          typeArbreID: arbre.arbreTypeID
        }]);
      } else {
        this.router.navigate(['home/arbreGraphicCor', {
          arbreID: arbre.arbreID,
          arbreCorrespondantID: arbre.arbreCorrespondantID,
          organisationID: arbre.organisationID,
          libelleFr: arbre.libelleFr,
          libelleUs: arbre.libelleUs,
          code: arbre.code,
          ip_update: arbre.ip_update,
          typeArbreID: arbre.arbreTypeID
        }]);
      }
    }
  }


  listNiveau(arbreTypeID: string) {
    this.tabNiveau = [];
    this.maPalletPerso = [];
    this.api.listArbreNiveauByType(arbreTypeID).subscribe(res => {
      this.tabNiveau = res;
      console.log(this.tabNiveau);
      for (const item of this.tabNiveau) {
        this.maPalletPerso.push(Object.assign({}, {
          idR: item.arbreNiveauID,
          key: item.libelleFr,
          text: item.libelleFr,
          color: item.couleur,
        }));
      }

    }, error => {
      console.log(error.error);

    });
  }

  arbreSelected: Arbre = new Arbre();
  selectArbre(event: any) {
    this.arbreSelected = event.value;
    // this.rechercher();
  }
  type = "";
  title = "";
  colorItem = "";
  texte = "";
  modalDetail = false;
  arbreNiveau: ArbreNiveau = new ArbreNiveau();

  annuler() {
    window.history.back();
  }

  selectArbreCorrespondant(event: any) {

  }

  addArbre() {
    this.arbre = new Arbre();
    this.arbreUpdateModal = true;
    this.action = 'new'
    this.libelle = "Création d'un " + this.typeArbre;
  }

  rechercher() {
    this.listArbre('ORG20180017050207.606.950');
  }

  ConfirmationLibelle = "";
  btnCancelLabel = "";
  defineLibelleModal(action: string) {
    switch (action) {
      case "new":
        this.libelle = "Creation d'un arbre";
        this.btnCancelLabel = "Annuler";
        this.message = "Bien enregistré";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "edit":
        this.libelle = "Edition d'un arbre";
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
        this.message = "Veuillez selectionner une organisation svp!";
        this.ConfirmationLibelle = "Attention !";
        this.color = "red";
        break;
      case "errorDelete":
        this.message = "Cet arbre est lié à un autre et ne peut etre supprimé !";
        this.ConfirmationLibelle = "Attention !";
        this.color = "red";
        break;
      case "notFound":
        this.message = "Rien trouvé";
        this.ConfirmationLibelle = "Attention !";
        this.color = "rgb(231, 171, 17)";
        break;
     
      case "view":
        this.libelle = "Consultation d'un arbre";
        this.btnCancelLabel = "Fermer";
        break;
      case "delete":
        this.message = "Suppression réussie";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "deleteActivite":
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


  saveGraph() {
    this.arbre.liens = this.nodeService.saveNodeJson()
    this.api.updateArbre(this.arbre).subscribe(data => {
      console.log(data);
      console.log(this.arbre);
    })
  }



  delete(operation: string, arbre?: Arbre) {
    if (arbre) {
      this.selectedArbres.push(Object.assign({}, arbre));
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
        this.api.deleteArbreList(this.selectedArbres).subscribe(res => {
          this.showSuccesDialog('succes supression');
          this.rechercher();
        })
      }
    });
  }

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

  showErrorDialog(operation: string) {
    this.ref = this.dialogService.open(ErrorDialogComponent, {
      header: this.translate.instant('Erreur'),
      width: '20vw',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: true,
      data: { msg: this.translate.instant(operation) }
    });
  }


}


