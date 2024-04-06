import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, TreeNode } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SuccessDialogComponent } from '../../dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialog/error-dialog/error-dialog.component';
import { Activite } from 'src/app/class/activite.model';
import { AxeStrategique } from 'src/app/class/axe-strategique';
import { Exercice } from 'src/app/class/exercice';
import { Indicateur } from 'src/app/class/indicateur.model';
import { ActiviteStrategique } from 'src/app/class/activite-strategique';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { ApiService } from 'src/app/services/api.service';
import { Objectif } from 'src/app/class/objectif.model';
import { Organisation } from 'src/app/class/organisation/organisation';
import { Structure } from 'src/app/class/structure/structure';

@Component({
  selector: 'app-axe-strategique',
  templateUrl: './axe-strategique.component.html',
  styleUrls: ['./axe-strategique.component.scss']
})
export class AxeStrategiqueComponent implements OnInit {

  ref!: DynamicDialogRef;

  organisation: Organisation = new Organisation()
  organisations: Organisation[] = []
  exercice: Exercice = new Exercice()
  structure: Structure = new Structure()
  axeStrategique: AxeStrategique = new AxeStrategique()
  selectedAxe: AxeStrategique = new AxeStrategique()
  objectif: Objectif = new Objectif()
  indicateur: Indicateur = new Indicateur()
  exercices: Exercice[] = []
  axesStrategiques: AxeStrategique[] = []
  activitesStrategiques: ActiviteStrategique[] = []
  activitesStrategiques2: ActiviteStrategique[] = []
  activitesStrategiquesFils: ActiviteStrategique[] = []
  objectifStrategiques: Objectif[] = []
  objectifStrategiques2: Objectif[] = []
  indcateurStrategiques: Indicateur[] = []
  selectedActivite: ActiviteStrategique[] = []
  structures: Structure[] = []
  exerciceList: Exercice[] = []

  activiteStrategique = new ActiviteStrategique()
  activites: Activite[] = [];

  objectifListe: Objectif[] = []

  dialogConfirmAction = false;
  dialogDelete = false;
  dialogDeleteActivite = false;
  modalStrat = false;
  message: string = "";
  btnCancelLabel: string = "";
  action: string = "";
  libelle: string = "";
  libelleActivite: string = "";
  ConfirmationLibelle = "";
  color: string = "";
  sizeAxe: string = "50vw";
  indicateurs: Indicateur[] = [];

  select = false;
  niveauFils = 1;
  btnAdd = 'Nouvel axe stratégique';
  btnAddO = '';

  arbre: TreeNode[] = [];
  arbre2: TreeNode[] = [];
  arbre3: TreeNode[] = [];
  arbre4: TreeNode[] = [];

  selectedNode!: TreeNode;
  selectedNode1!: TreeNode;
  selectedElement!: any
  selectedEvent!: any

  selectID !: string

  loading: boolean = true;

  niveau !: number

  col = [
    { field: 'niveauActiviteID', header: 'N°' },
    { field: 'libelleFr', header: 'Designation' },
  ]

  constructor(
    public api: ApiService,
    public dialogService: DialogService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.listOrganisation();
    this.listExercice();
  }

  listExercice() {
    this.api.listExercice().subscribe((data) => {
      this.exercices = data;
    })
  }


  listOrganisation() {
    this.api.organisationList('', true).subscribe(data => {
      this.organisations = data;
    });
  }


  listAxeStrategiqueByOrgl(organisationID: string) {
    this.api.listAxeStrategiqueByOrg(organisationID).subscribe(res => {
      this.axesStrategiques = res;
      if (this.axesStrategiques.length == 0) {
        this.defineLibelleModal("notFound", "Axe stratégiques");
        this.dialogConfirmAction = true;
      }
    })
  }

  listActiviteStrategique(axestrategiqueID: string) {
    this.activitesStrategiques = [];
    this.api.listActiviteStrategiqueByAxe(axestrategiqueID).subscribe(res => {
      this.activitesStrategiques = res;
      for (const titre of this.activitesStrategiques) {
        titre.color = "#000";
      }
    })
  }
  listObjectif(activiteID: string) {
    this.objectifStrategiques = [];
    this.api.listObjectif(activiteID).subscribe(res => {
      this.objectifStrategiques = res;
      for (const titre of this.objectifStrategiques) {
        titre.color = "#000";
      }
    })
  }
  listIndicateur(objectifID: string) {
    this.indcateurStrategiques = [];
    this.api.listIndicateurByObjectif(objectifID).subscribe(res => {
      this.indcateurStrategiques = res;
      for (const titre of this.indcateurStrategiques) {
        titre.color = "#000";
      }
    })
  }

  rechercher() {
    this.axesStrategiques = [];
    if (!this.organisation.organisationID) {
      this.defineLibelleModal("noSelected", "Axe stratégique");
      this.dialogConfirmAction = true;
    } else {
      this.listAxe(this.organisation.organisationID);
    }
  }

  verified = false;
  verifyField(obj: any) {
    if (!obj.numordre) {
      this.verified = false;
      this.message = "Verifier les informations entrées";
      this.color = "rgb(217, 51, 13)";
      this.dialogConfirmAction = true;
    } else if (!obj.organisationID) {
      this.verified = false;
      this.message = "Veuillez selectionner l'organisation et la structure SVP";
      this.color = "rgb(217, 51, 13)";
      this.dialogConfirmAction = true;
    } else {
      this.verified = true;
    }
  }

  saveActivite() {
    this.activiteStrategique.user_update = this.tokenStorageService.getUser().username;
    this.activiteStrategique.ip_update = "192.168.0.100";

    console.log(this.activiteStrategique);
    if (!this.activiteStrategique.activitestrategiqueID) {
      if (this.selectedElement.niveauActiviteID == 1) {
        this.activiteStrategique.niveauActiviteID = 2;
        this.activiteStrategique.activiteParentID = this.selectedElement.activitestrategiqueID;
      } else {
        this.activiteStrategique.niveauActiviteID = 1;
      }
      this.api.createActiviteStrategique(this.activiteStrategique).subscribe(data => {
        console.log(this.activiteStrategique);
        this.defineLibelleModal("newActivite", "Axe Strategique");
        this.dialogConfirmAction = true;
        this.activiteStrategique = new ActiviteStrategique();
        this.listASByNiveau(this.axeStrategique.axestrategiqueID, this.selectedElement.niveauActiviteID);
        this.dialogActivite = false;
      }, error => {
        this.message = "Erreur d'enregistrement";
        this.dialogConfirmAction = true;
        console.log(error.error);
      })
    } else if (this.activiteStrategique.activitestrategiqueID) {

      this.api.createActiviteStrategique(this.activiteStrategique).subscribe(data => {
        console.log(this.activiteStrategique);
        this.defineLibelleModal("newActivite", "Activite Strategique");
        this.dialogConfirmAction = true;
        this.listASByNiveau(this.axeStrategique.axestrategiqueID, this.selectedElement.niveauActiviteID);
        this.dialogActivite = false;
      }, error => {
        console.log(this.activiteStrategique);
        this.defineLibelleModal("errorSave", "Activite Strategique");
        console.log(error.error);
      })
    }
  }
  saveIndicateur() {
    this.indicateur.user_update = this.tokenStorageService.getUser().username;
    this.indicateur.ip_update = "192.168.0.100";
    this.indicateur.objectifID = this.objectif.objectifID;
    this.indicateur.organisationID = this.organisation.organisationID;
    this.indicateur.structureID = this.objectif.structureID;
    console.log(this.indicateur);
    if (!this.indicateur.indicateurID && this.verified == true) {
      this.api.createIndicateur(this.indicateur).subscribe(data => {
        console.log(this.indicateur);
        this.defineLibelleModal("newIndicateur", "Axe Strategique");
        this.dialogConfirmAction = true;
        this.indicateur = new Indicateur();
        this.listIndicateurStrategique(this.objectif.objectifID);
        this.dialogIndicateur = false;
      }, error => {
        console.log(this.indicateur);
        this.defineLibelleModal("errorSave", "Activite Strategique");
        console.log(error.error);
      })
    } else if (this.indicateur.indicateurID && this.verified == true) {
      this.api.createIndicateur(this.indicateur).subscribe(data => {
        console.log(this.indicateur);
        this.defineLibelleModal("editIndicateur", "Indicateur");
        this.dialogConfirmAction = true;
        this.listIndicateurStrategique(this.objectif.objectifID);
        this.dialogActivite = false;
      }, error => {
        console.log(this.indicateur);
        this.defineLibelleModal("errorSave", "Activite Strategique");
        console.log(error.error);
      })
    }
  }
  saveObjectif() {
    this.objectif.user_update = this.tokenStorageService.getUser().username;
    this.objectif.ip_update = "192.168.0.100";
    this.objectif.niveauObjectfifID = 1;
    this.objectif.cadreLogiqueObjectifNiveauID = 1;
    this.objectif.activitestrategiqueID = this.selectedElement.activitestrategiqueID;
    console.log(this.objectif);
    if (!this.objectif.objectifID) {
      this.api.createObjectif(this.objectif).subscribe(data => {
        console.log(data);
        console.log(this.objectif);
        this.defineLibelleModal("newObjectif", "Objectif");
        this.dialogConfirmAction = true;
        this.objectif = new Objectif();
        this.listObjectif(this.activiteStrategique.activitestrategiqueID);
        this.dialogObjectif = false;
      }, error => {
        this.message = "Erreur d'enregistrement";
        this.dialogConfirmAction = true;
        console.log(error.error);
      })
    } else if (this.objectif.objectifID && this.verified == true) {
      this.api.createObjectif(this.objectif).subscribe(data => {
        console.log(this.objectif);
        this.defineLibelleModal("editObjectif", "Objectif");
        this.dialogConfirmAction = true;
        this.listObjectif(this.activiteStrategique.activitestrategiqueID);
        this.dialogObjectif = false;
      }, error => {
        console.log(this.objectif);
        this.defineLibelleModal("errorSave", "Objectif");
        console.log(error.error);
      })
    }
  }

  saveAxe() {
    this.axeStrategique.user_update = this.tokenStorageService.getUser().username;
    this.axeStrategique.ip_update = "192.168.0.100";
    this.axeStrategique.organisationID = this.organisation.organisationID;
    console.log(this.axeStrategique);
    this.verifyField(this.axeStrategique);
    if (!this.axeStrategique.axestrategiqueID && this.verified == true) {
      this.api.createAxeStrategique(this.axeStrategique).subscribe(data => {
        console.log(this.axeStrategique);
        this.defineLibelleModal("new", "Axe Strategique");
        this.dialogConfirmAction = true;
        this.axeStrategique = new AxeStrategique();
        this.listAxeStrategiqueByOrg0(this.organisation.organisationID);
        this.modalStrat = false;
      }, error => {
        this.message = "Erreur d'enregistrement";
        this.dialogConfirmAction = true;
        console.log(error.error);
      })
    } else if (this.axeStrategique.axestrategiqueID && this.verified == true) {
      this.api.createAxeStrategique(this.axeStrategique).subscribe(data => {
        console.log(this.axeStrategique);
        this.defineLibelleModal("edit", "Axe Strategique");
        this.dialogConfirmAction = true;
        this.listAxeStrategiqueByOrg0(this.organisation.organisationID);
        this.modalStrat = false;
      }, error => {
        console.log(this.axeStrategique);
        this.defineLibelleModal("errorSave", "Axe Strategique");
        console.log(error.error);
      })
    }
  }
  defineLibelleModal(action: string, sujet: string) {
    switch (action) {
      case "new":
        this.libelle = "Creation d'un " + sujet;
        this.btnCancelLabel = "Annuler";
        this.message = "Bien enregistré";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "newActivite":
        this.libelleActivite = "Creation d'une " + sujet;
        this.btnCancelLabel = "Annuler";
        this.message = "Bien enregistré";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "newObjectif":
        this.libelleObjectif = "Creation d'un " + sujet;
        this.btnCancelLabel = "Annuler";
        this.message = "Bien enregistré";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "newIndicateur":
        this.libelleIndicateur = "Creation d'un " + sujet;
        this.btnCancelLabel = "Annuler";
        this.message = "Bien enregistré";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "edit":
        this.libelle = "Edition d'un " + sujet;
        this.btnCancelLabel = "Annuler";
        this.message = "Modification réussie";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "editActivite":
        this.libelleActivite = "Edition d'une " + sujet;
        this.btnCancelLabel = "Annuler";
        this.message = "Modification réussie";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "editObjectif":
        this.libelleObjectif = "Edition d'un " + sujet;
        this.btnCancelLabel = "Annuler";
        this.message = "Modification réussie";
        this.ConfirmationLibelle = "Confirmation";
        this.color = "rgb(5, 197, 27)";
        break;
      case "editIndicateur":
        this.libelleIndicateur = "Edition d'un " + sujet;
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
        this.libelle = "Consultation d'un " + sujet;
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
  addAxe() {
    if (!this.organisation.organisationID) {
      this.defineLibelleModal("noSelected", "Axe stratégique");
      this.dialogConfirmAction = true;
    } else {
      this.axeStrategique = new AxeStrategique();
      this.action = "new";
      this.sizeAxe = "50vw";
      this.defineLibelleModal(this.action, "Axe stratégique");
      this.modalStrat = true;
    }

  }



  listIndicateurStrategique(objectifID: string) {
    this.api.listIndicateurByObjectif(objectifID).subscribe(res => {

    })
  }
  edition() {
    this.activiteStrategique = this.selectedElement
    // this.showDynamicDialog('update')
  }

  editer() {
    if (this.selectedElement.numordre) {
      this.axeStratEdit(this.selectedElement);
    } else if (!this.selectedElement.numordre && this.selectedElement.niveauActiviteID == 1) {
      this.activiteStratEdit(this.selectedElement);
    } else if (!this.selectedElement.numordre && this.selectedElement.niveauActiviteID == 2) {
      this.activiteStratEdit(this.selectedElement);
    } else if (this.selectedElement.sigle) {
      this.objectifEdit(this.selectedElement);
    } else if (this.selectedElement.indicateurID) {
      this.niveau = 4;
    }
  }

  createObj() {
    if (this.select == true && this.newObjForProgram == true) {
      this.activiteAddObjectif(this.selectedElement);
    }
  }
  create() {
    if (this.select == false) {
      this.addAxe();
    } else if (this.select == true && this.selectedElement.numordre) {
      this.axeStratAddActivite(this.selectedElement);
    } else if (this.select == true && !this.selectedElement.numordre && this.selectedElement.niveauActiviteID == 1) {
      this.axeStratAddActivite(this.selectedElement);
    } else if (this.select == true && !this.selectedElement.numordre && this.selectedElement.niveauActiviteID == 2) {
      this.activiteAddObjectif(this.selectedElement);
    } else if (this.select == true && this.selectedElement.sigle) {
      // this.showDynamicDialog('insert');
    } else if (this.selectedElement.indicateurID) {
      this.niveau = 4;
    }
  }

  supprimer(element: any) {
    if (element.numordre) {
      this.deleteCl(element);
    } else if (!element.numordre && element.niveauActiviteID == 1) {
      this.deleteActiviteStrat(element);
    } else if (!element.numordre && element.niveauActiviteID == 2) {
      this.deleteActiviteStrat(element);
    } else if (element.sigle) {
      this.deleteObjectif(element);
    } else if (element.indicateurID) {
      this.niveau = 4;
    }
  }
  axeStratEdit(axe: AxeStrategique) {
    this.axeStrategique = axe;
    this.listActiviteStrategique(this.axeStrategique.axestrategiqueID);
    console.log(this.activitesStrategiques);
    this.action = "edit";
    this.defineLibelleModal(this.action, "Axe stratégique");
    this.sizeAxe = "70vw";
    this.modalStrat = true;
  }

  activiteStratEdit(activite: ActiviteStrategique) {
    this.activiteStrategique = activite;
    this.listObjectif(this.activiteStrategique.activitestrategiqueID);
    this.actionActivite = "editActivite";
    this.defineLibelleModal(this.actionActivite, "Activité stratégique");
    this.sizeActivite = "70vw";
    this.dialogActivite = true;
  }
  objectifEdit(objectif: Objectif) {
    this.objectif = objectif;
    this.actionObjectif = "editObjectif";
    this.defineLibelleModal(this.actionObjectif, "Objectif");
    this.sizeObjetif = "70vw";
    this.dialogObjectif = true;
  }
  dialogDeleteObjectif = false;
  deleteObjectif(objectif: Objectif) {
    this.objectif = objectif;
    this.actionObjectif = "deleteObjectif";
    this.defineLibelleModal(this.actionObjectif, "Objectif");
    this.dialogDeleteObjectif = true;
  }

  editionObjectif(objectif: Objectif) {
    this.objectif = objectif
    // this.showDynamicDialog('update')

  }
  activiteStratDelete(activite: ActiviteStrategique) {
    this.activiteStrategique = activite;
    this.actionActivite = "deleteActivite";
    this.defineLibelleModal(this.actionActivite, "Activité stratégique");
    this.dialogDeleteActivite = true;
  }

  axeStratDelete(axe: AxeStrategique) {
    this.axeStrategique = axe;
    this.action = "delete";
    this.defineLibelleModal(this.action, "Axe stratégique");
    this.dialogDelete = true;
  }
  dialogActivite = false;
  dialogObjectif = false;
  dialogIndicateur = false;
  actionActivite = "";
  actionObjectif = "";
  sizeObjetif = "50vw";
  sizeActivite = "50vw";
  actionIndicateur = "";
  libelleObjectif = "";
  libelleIndicateur = "";

  axeStratAddActivite(axe: AxeStrategique) {
    this.activiteStrategique = new ActiviteStrategique();
    this.axeStrategique = axe;
    console.log(axe);
    this.actionActivite = "newActivite";
    this.activiteStrategique.organisationID = this.selectedElement.organisationID;
    this.activiteStrategique.structureID = this.selectedElement.structureID;
    this.activiteStrategique.axestrategiqueID = this.selectedElement.axestrategiqueID;

    // this.activiteStrategique.niveauActiviteID = 1;
    this.defineLibelleModal(this.actionActivite, "Activité");
    this.sizeActivite = "50vw";
    this.dialogActivite = true;
  }
  activiteAddObjectif(activite: ActiviteStrategique) {
    this.objectif = new Objectif();
    this.activiteStrategique = activite;
    console.log(activite);
    this.actionObjectif = "newObjectif";
    this.objectif.organisationID = this.activiteStrategique.organisationID;
    this.objectif.structureID = this.activiteStrategique.structureID;
    this.objectif.activitestrategiqueID = this.activiteStrategique.activitestrategiqueID;
    // this.objectif. = 1;
    this.defineLibelleModal(this.actionObjectif, "Objectif");
    this.sizeObjetif = "50vw";
    this.dialogObjectif = true;
  }
  addIndicateur(objectif: Objectif) {
    this.indicateur = new Indicateur();
    this.objectif = objectif;
    console.log(objectif);
    this.actionIndicateur = "newIndicateur";
    this.indicateur.organisationID = this.objectif.organisationID;
    this.indicateur.structureID = this.objectif.structureID;
    this.indicateur.objectifID = this.objectif.objectifID;
    // this.objectif. = 1;
    this.defineLibelleModal(this.actionIndicateur, "Objectif");
    this.dialogIndicateur = true;
  }

  deleteCl(axe: AxeStrategique) {
    this.api.deleteAxeStrategique(axe.axestrategiqueID, axe.user_update).subscribe(data => {
      console.log(data);
      this.defineLibelleModal("delete", "Axe stratégique");
      this.dialogDelete = false;
      this.dialogConfirmAction = true;
      this.listAxeStrategiqueByOrg0(this.organisation.organisationID);
    }, error => {
      this.defineLibelleModal("errorDelete", "Axe stratégique");
      this.dialogDelete = false;
      this.dialogConfirmAction = true;
      console.log(error.error);
      this.listAxeStrategiqueByOrg0(this.organisation.organisationID);
    });
  }
  deleteActiviteStrat(activite: ActiviteStrategique) {
    this.api.deleteActiviteStrategique(activite.activitestrategiqueID, activite.user_update).subscribe(data => {
      console.log(data);
      this.defineLibelleModal("deleteActivite", "Activité stratégique");
      this.dialogDeleteActivite = false;
      this.dialogConfirmAction = true;
      this.listAxeStrategiqueByOrg0(this.organisation.organisationID);
    }, error => {
      console.log(error.error);
      this.listAxeStrategiqueByOrg0(this.organisation.organisationID);
    });
  }

  delObjectifStrat(objectif: Objectif) {
    this.api.deleteObjectif(objectif.objectifID, objectif.user_update).subscribe(data => {
      console.log(data);
      this.defineLibelleModal("deleteActivite", "Objectif stratégique");
      this.dialogDeleteActivite = false;
      this.dialogConfirmAction = true;
      this.listAxeStrategiqueByOrg0(this.organisation.organisationID);
    }, error => {
      console.log(error.error);
      this.listAxeStrategiqueByOrg0(this.organisation.organisationID);
    });
  }


  displaySpinner = false;

  newObjForProgram = false;
  /**evenement après selection d'un element de l'arbre */
  nodeSelect(event: any) {

    // this.changeColor(event);
    console.log(event);
    if (event.numordre) {
      this.niveau = 0;
      this.newObjForProgram = false;
    } else if (!event.numordre && event.niveauActiviteID == 1) {
      this.newObjForProgram = true;
      this.btnAddO = "Nouvel objectif"
      this.niveau = 1;
    } else if (!event.numordre && event.niveauActiviteID == 2) {
      this.newObjForProgram = false;
      this.niveau = 2;
    } else if (event.sigle) {
      this.newObjForProgram = false;
      this.niveau = 3;
    } else if (event.indicateurID) {
      this.newObjForProgram = false;
      this.niveau = 4;
    }

    this.select = true
    this.selectID = event.activiteID
    this.selectedElement = event;
    console.log(this.selectedElement);
    this.selectedEvent = event

    switch (this.niveau) {
      case 0:
        this.btnAdd = 'Nouveau programme'
        break;

      case 1:
        this.btnAdd = 'Nouvelle action'
        break;

      case 2:
        this.btnAdd = 'Nouvel objectif'
        break;

      case 3:
        this.btnAdd = 'Nouvel indicateur'
        break;

      case 4:
        this.btnAdd = ' '
        break;

      default:
        this.btnAdd = ' '
        break;
    }

  }

  async objectifList(activiteParentID: string) {
    this.arbre2 = []
    let rs = await this.api.listObjectif(activiteParentID).toPromise();

    for await (const item2 of rs) {
      let op: TreeNode = {
        key: "",
        data: null,
        type: "",
        parent: undefined
      }
      op.key = item2.cgoperationID
      op.data = item2
      op.parent = item2.cgactiviteID

      this.arbre2.push(op)
    }

    return this.arbre2
  }



  /** affiche les boites de dialog d'insertion et de modification
   *  * @param operation : type d'operation a effectuer 
  */
/*   showDynamicDialog(operation: string) {

    if (operation == 'insert') {

      this.ref = this.dialogService.open(IndicateurDialogComponent, {
        header: this.translate.instant('Indicateur'),
        width: '70vw',
        contentStyle: { "height": "80vh", "overflow": "auto" },
        closable: false,
        data: { param: operation }
      });

    } else {

      this.ref = this.dialogService.open(IndicateurDialogComponent, {
        header: this.translate.instant('modifier'),
        width: '70vw',
        contentStyle: { "height": "80vh", "overflow": "auto" },
        closable: false,
        data: { param: operation, indicateur: this.indicateur, objectifID: this.selectedElement.objectifID }
      });

    }


    // lors de la fermeture des formulaire appelés
    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.indicateur = data
        if (operation == 'insert') {
          this.api.indicateurInsert(this.indicateur).subscribe(data => {
            this.showSuccesDialog('controle_gestion.succes insertion')
          }, error => {
            this.showErrorDialog('controle_gestion.erreur insertion')
            console.log(error.error);
          })
        } else { // alors c'est une modification ou update
          this.api.indicateurUpdate(this.indicateur).subscribe(data => {
            this.showSuccesDialog('controle_gestion.succes update')
          }, error => {
            this.showErrorDialog('controle_gestion.erreur update')
            console.log(error.error);
          })
        }
        this.reload()
      }
    });
  } */



  /** affiche les boites de dialog d'insertion et de modification
  *  * @param operation : type d'operation a effectuer 
 */
  showSuccesDialog(message: string) {
    this.ref = this.dialogService.open(SuccessDialogComponent, {
      header: this.translate.instant('succes'),
      width: '20vw',
      contentStyle: { "height": "20vh", "overflow": "auto" },
      closable: false,
      data: { msg: this.translate.instant(message) }
    });

    this.ref.onClose.subscribe((data) => {
      this.reload()
    });

  }

  /** affiche les boites de dialog d'erreur  */
  showErrorDialog(operation: string) {
    this.ref = this.dialogService.open(ErrorDialogComponent, {
      header: this.translate.instant('Erreur'),
      width: '20vw',
      contentStyle: { "height": "20vh", "overflow": "auto" },
      closable: true,
      data: { msg: this.translate.instant(operation) }
    });
  }

  /** evenement apres deselection */
  nodeUnselect(event: any) {
    this.select = false

    this.btnAdd = 'Nouvel axe stratégique'
    this.niveauFils = 1
  }

  /** evenement apres expand */
  async onNodeExpand(event: any) {
    const node = event.node;
    if (node.data.numordre) {
      node.children = await this.listASByNiveau(node.data.axestrategiqueID, 1);
      this.arbre = [...this.arbre];
    } else if (!node.data.numordre && node.data.niveauActiviteID == 1) {
      node.children = await this.listASByNiveau(node.data.axestrategiqueID, 2)
      this.arbre = [...this.arbre];
    } else if (!node.data.numordre && node.data.niveauActiviteID == 2) {
      node.children = await this.listObjByActiv(node.data.activitestrategiqueID)
      this.arbre = [...this.arbre];
    }
  }

  listAxeStrategiqueByOrg0(organisationID: string) {
    var arrayToTree = require('array-to-tree');
    this.arbre = [];
    this.axesStrategiques = [];
    this.api.listAxeStrategiqueByOrg(organisationID).subscribe(async res => {
      this.axesStrategiques = res;
      for await (const item2 of res) {
        let op: TreeNode = {
          key: "",
          data: null,
          type: "",
          parent: undefined,
          children: [{ data: {} }]
        }
        op.key = item2.axestrategiqueID
        op.data = item2
        // op.parent = null

        this.arbre.push(op)
      }
      this.arbre = arrayToTree(this.arbre, {
        parentProperty: 'parent',
        customID: 'key'
      });
      if (this.axesStrategiques.length == 0) {
        this.defineLibelleModal("notFound", "Axe stratégiques");
        this.dialogConfirmAction = true;
      }
    })
  }

  async listASByNiveau(axestrategiqueID: string, niveau: number) {
    var arrayToTree = require('array-to-tree');
    this.arbre2 = [];
    this.activitesStrategiques = [];
    let rs = await this.api.listASByNiveau(axestrategiqueID, niveau).toPromise();
    console.log(rs);

    for await (const item2 of rs) {
      let op: TreeNode = {
        key: "",
        data: null,
        type: "",
        parent: undefined,
      }
      op.key = item2.activitestrategiqueID
      op.data = item2;
      if (item2.niveauActiviteID == 1) {
        op.parent = item2.axestrategiqueID;
      } else if (item2.niveauActiviteID == 2) {
        op.parent = item2.activiteParentID;
      }

      this.arbre2.push(op)
    }
    this.arbre2 = arrayToTree(this.arbre2, {
      parentProperty: 'parent',
      customID: 'key'
    });


    return this.arbre2;
  }
  async listObjByActiv(activitestrategiqueID: string) {
    var arrayToTree = require('array-to-tree');
    this.arbre2 = [];
    this.objectifStrategiques = [];
    let rs = await this.api.listObjectif(activitestrategiqueID).toPromise();
    for await (const item2 of rs) {
      let op: TreeNode = {
        key: "",
        data: null,
        type: "",
        parent: undefined,
      }
      op.key = item2.objectifID
      op.data = item2
      op.parent = item2.activitestrategiqueID

      this.arbre3.push(op)
    }
    this.arbre3 = arrayToTree(this.arbre3, {
      parentProperty: 'parent',
      customID: 'key'
    });

    return this.arbre3;
  }


  defineType(element: any): string {
    let value = ''
    if (element.numordre) {
      value = 'Axe strategique'
    } else if (!element.numordre && element.niveauActiviteID == 1) {
      value = 'Programme'
    } else if (!element.numordre && element.niveauActiviteID == 2) {
      value = 'Action'
    } else if (element.sigle) {
      value = 'Objectif'
    } else if (element.indicateurID) {
      value = 'Indicateur'
    }
    return value;
  }


  confirm() {
    this.confirmationService.confirm({
      message: this.translate.instant('state'),
      icon: "pi pi-exclamation-triangle text-danger",
      acceptLabel: this.translate.instant('oui'),
      rejectLabel: this.translate.instant('non'),
      rejectButtonStyleClass: "p-button-sm p-button-text",
      acceptButtonStyleClass: "p-button-sm",
      accept: () => {
        this.supprimer(this.selectedElement)
      }
    });
  }


  /**modifier les enfants d'un noeud de l'arbre 
   *  * @param {TreeNode} node
   *  * @param liste
  */
  private async modifierParentChildren(node: TreeNode) {
    this.displaySpinner = true;
    // node.parent!.children = await this.operationList(node.parent!.data.activiteID)
    console.log("parent");


    setTimeout(async () => {

      this.arbre = [...this.arbre];
      this.displaySpinner = false;
    }, 450);
  }

  deleteAction(selectedELement: any) {
    if (selectedELement.indicateurID) {
      this.api.deleteIndicateur(this.selectedElement.indicateurID, this.tokenStorageService.getUser().username).subscribe(data => {
        console.log(data);
        this.modifierParentChildren(this.selectedNode1)
        this.showSuccesDialog('supprimé avec succès')
      }, error => console.log(error))
    } else {
      this.api.deleteAxeStrategique(this.selectedElement.axestrategiqueID, this.tokenStorageService.getUser().username).subscribe(data => {
        console.log(data);
        this.reload()
        this.showSuccesDialog('supprimé avec succès')
      })
    }
  }

  reload() {
    this.displaySpinner = true
    this.select = false
    this.listAxeStrategiqueByOrg0(this.organisation.organisationID);
  }

  verifyLength(valeur: any) {
    let val = "" + valeur; // amends the value to an string, even if its undefined or null etc
    if (val.toString().length >= 45) {
      return true
    }
    return false
  }

  defineDescription(libelle: any): string {
    let value = libelle.slice(0, 49)
    return value;
  }

  closeDialog() {
    // this.displayInitialDialog = false
    this.displaySpinner = true
    // this.activiteList(this.organisation.organisationID, this.exercice.millesime)

  }


  /* Dernier tour */

  listAxe(organisationID: string) {
    this.api.listAxeStrategiqueByOrg(organisationID).subscribe(res => {
      this.axesStrategiques = res;
      for (const titre of this.axesStrategiques) {
        titre.color = "#000";
      }
      console.log(this.axesStrategiques);
    })
  }

  listActivite(axestrategiqueID: string, niveau: number) {
    this.activitesStrategiques = [];
    this.api.listASByNiveau(axestrategiqueID, niveau).subscribe(res => {
      this.activitesStrategiques = res;
      for (const titre of this.activitesStrategiques) {
        titre.color = "#000";
      }
      console.log(this.activitesStrategiques);
    })
  }

  listActiviteByParent(activitestrategiqueID: string) {
    this.activitesStrategiquesFils = [];
    this.api.listASByParent(activitestrategiqueID).subscribe(res => {
      this.activitesStrategiquesFils = res;
      for (const titre of this.activitesStrategiquesFils) {
        titre.color = "#000";
      }
      console.log(this.activitesStrategiquesFils);
    })

  }
  listActivite2(axestrategiqueID: string, niveau: number) {
    this.activitesStrategiques2 = [];
    this.api.listASByNiveau(axestrategiqueID, niveau).subscribe(res => {
      this.activitesStrategiques2 = res;
      for (const titre of this.activitesStrategiques2) {
        titre.color = "#000";
      }
      console.log(this.activitesStrategiques2);
    })
  }


  checker(element: any) {
    this.selectedElement = element;
    this.changeColor(this.selectedElement);
  }

  changeColor(element: any) {
    if (element.numordre) {
      for (const ele of this.axesStrategiques) {
        if (ele.axestrategiqueID == element.axestrategiqueID) {
          this.decoloreAncien(ele);
        }
      }
    } else if (!element.numordre && element.niveauActiviteID == 1) {
      for (const ele of this.activitesStrategiques) {
        if (ele.activitestrategiqueID == element.activitestrategiqueID) {
          this.decoloreAncien(ele);
        }
      }
    } else if (!element.numordre && element.niveauActiviteID == 2) {
      for (const ele of this.activitesStrategiques2) {
        if (ele.activitestrategiqueID == element.activitestrategiqueID) {
          this.decoloreAncien(ele);
        }
      }
    } else if (element.sigle) {
      for (const ele of this.objectifStrategiques) {
        if (ele.objectifID == element.objectifID) {
          this.decoloreAncien(ele);
        }
      }
    } else if (element.sigle) {
      this.listIndicateur(element.objectifID);
    }

  }

  decoloreAncien(element: any) {
    if (element.numordre) {
      for (const ele of this.axesStrategiques) {
        if (ele.axestrategiqueID != element.axestrategiqueID && element.color == "blue") {
          ele.color = "#000";
          element.color = "blue";
        } else {
          element.color = "blue";
        }
      }
    } else if (!element.numordre && element.niveauActiviteID == 1) {
      for (const ele of this.activitesStrategiques) {
        if (ele.activitestrategiqueID != element.activitestrategiqueID && element.color == "blue") {
          ele.color = "#000";
          element.color = "blue";
        } else {
          element.color = "blue";
        }
      }
    } else if (!element.numordre && element.niveauActiviteID == 2) {
      for (const ele of this.activitesStrategiques2) {
        if (ele.activitestrategiqueID != element.activitestrategiqueID && element.color == "blue") {
          ele.color = "#000";
          element.color = "blue";
        } else {
          element.color = "blue";
        }
      }
    } else if (element.sigle) {
      for (const ele of this.objectifStrategiques) {
        if (ele.activitestrategiqueID != element.activitestrategiqueID && element.color == "blue") {
          ele.color = "#000";
          element.color = "blue";
        } else {
          element.color = "blue";
        }
      }
    } else if (element.periodicite) {
      for (const ele of this.indcateurStrategiques) {
        if (ele.indicateurID != element.indicateurID && element.color == "blue") {
          ele.color = "#000";
          element.color = "blue";
        } else {
          element.color = "blue";
        }
      }
    }

  }

  getChild(element: any) {

    if (element.numordre) {
      this.listActiviteStrategique(element.axestrategiqueID);
    } else if (!element.numordre && element.niveauActiviteID == 1) {
      this.listActiviteByParent(element.activitestrategiqueID);
    } else if (!element.numordre && element.niveauActiviteID == 2) {
      this.listObjectif(element.activitestrategiqueID);
    } else if (element.sigle) {
      this.listIndicateur(element.objectifID);
    }
  }

  indicateurList(references: any) {
    this.api.indicateurList(references).subscribe((data) => {
      console.log(data);
      this.indicateurs = data
      this.loading = false;
    }, error => console.log(error))
  }

  rechercher1() {
    this.indicateurList([this.organisation.organisationID, this.structure.structureID ? this.structure.structureID : null, this.objectif.objectifID ? this.objectif.objectifID : null])
  }


}
