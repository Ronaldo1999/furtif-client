import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { Router } from '@angular/router';
import { Caneva } from 'src/app/class/cscaneva/caneva';
import { CsCaneva } from 'src/app/class/cscaneva/cscaneva';
import { ApiService } from 'src/app/services/api.service';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { Organisation } from 'src/app/class/organisation/organisation';
import { Structure } from 'src/app/class/structure/structure';

@Component({
  selector: 'app-caneva',
  templateUrl: './caneva.component.html',
  styleUrls: ['./caneva.component.scss']
})
export class CanevaComponent implements OnInit {

  caneva: Caneva = new Caneva();
  titre: CsCaneva = new CsCaneva();
  organisation: Organisation = new Organisation();
  structure: Structure = new Structure();

  itemsContextTitre: MenuItem[] = [];
  selectedTitre: CsCaneva = new CsCaneva();

  canevas: Caneva[] = [];
  selectedCanevas: Caneva[] = [];
  organisations: Organisation[] = [];
  structures: Structure[] = [];
  listTitres: CsCaneva[] = [];

  btnCancelLabel: string = "";
  action: string = "";
  libelle: string = "";
  message: string = "";
  libelleActivite: string = "";
  ConfirmationLibelle = "";
  color: string = "";
  dialogConfirmAction = false;
  modalNewCan = false;
  dialogDelete = false;
  verified = false;
  dialogGesTitre = false;
  dialogAddTitre = false;
  dialogDeleteCaneva = false;
  dialogDeplacer = false;

  liason: string = "default";
  items: MenuItem[] = [];
  constructor(
    private api: ApiService,
    public router: Router,
    public dialogService: DialogService,
    public translate: TranslateService,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.listOrganisation();
    this.listCaneva('ORG20180017050207.606.950');
    this.items = [
      { label: 'Update', icon: 'pi pi-refresh', command: () => { }, },
      { label: 'Delete', icon: 'pi pi-times', command: () => { }, },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];
  }

  deleteTitre(cscaneva: CsCaneva) {
    this.titre = cscaneva;
    this.action = "delete";
    this.libelle = "Suppression d'un element du caneva"
    this.dialogDeleteCaneva = true;
  }

  deleteCsCaneva(titre: CsCaneva) {
    this.api.deleteCsCaneva(titre.cscanevaID, titre.user_update).subscribe(data => {
      console.log(data);
      this.defineLibelleModal("delete", "Titre");
      this.dialogDeleteCaneva = false;
      this.dialogConfirmAction = true;
      this.listTitre(this.caneva.canevaID);
    }, error => {
      this.defineLibelleModal("errorDelete", "Axe stratégique");
      this.dialogDeleteCaneva = false;
      this.dialogConfirmAction = true;
      console.log(error.error);
      this.listTitre(this.caneva.canevaID);
    });
  }

  updateTitre(titre: CsCaneva) {
    this.titre = { ...titre };
    if (titre.lieCadreLogique == 1 && this.titre.lieDiagnostic == 0) {
      this.liason = "lieCadreLogique";
    } else if (titre.lieDiagnostic == 1 && titre.lieCadreLogique == 0) {
      this.liason = "lieDiagnostic";
    } else if (titre.lieDiagnostic == 0 && titre.lieCadreLogique == 0) {
      this.liason = "default";
    }
    if (titre.parent) { this.Titre = false; } else { this.Titre = true; }
    this.action = "edit";
    console.log(this.action);
    this.defineLibelleModal(this.action, "Titre du caneva");
    this.dialogAddTitre = true;
  }

  addSubTitle(titre: CsCaneva) {
    this.titre = new CsCaneva();
    this.titre.parent = titre.cscanevaID;
    this.action = "new";
    console.log(this.titre);
    this.defineLibelleModal(this.action, "Sous titre");
    this.dialogAddTitre = true;
  }

  deplacementCaneva(cscaneva: CsCaneva) {
    this.titre = cscaneva;
    this.action = "deplacement";
    this.libelle = "Déplacement d'un element du caneva"
    this.dialogDeplacer = true;
  }

  parentID = "";
  deplacer(cscaneva: CsCaneva) {
    this.titre = cscaneva;
    cscaneva.parent = this.parentID;
    cscaneva.sititre = 0;
    this.dialogDeplacer = false;
    this.saveTitre(cscaneva);
  }

  newCaneva() {
    this.caneva = new Caneva();
    this.action = "new";
    this.defineLibelleModal(this.action, "Caneva");
    this.modalNewCan = true;
  }
  description() {
    this.router.navigateByUrl('/csCaneva');
    //this.router.navigate(['/caneva/' + caneva.canevaID + '/new']);
  }
  getRouteq(caneva: Caneva) {
    return "/Controle-gestion/caneva/" + caneva.canevaID;
  }

  listTitre(canevaID: string) {
    this.listTitres = [];
    this.api.listCsCaneva(canevaID).subscribe(res => {
      this.listTitres = res;
      for (const titre of this.listTitres) {
        titre.color = "#000";
        titre.visibilte = "hidden";
      }
      console.log(this.listTitres);
      console.log(this.listTitres[this.listTitres.length - 1]);

      console.log(this.listTitres);
    }, error => {
      console.log(error.error);
    })
  }

  // cette fonction retourne vrai ou faux si un titre a des fils ou pas

  listCanevaFils(parentID: string): CsCaneva[] {
    let listFils: any[] = [];
    this.api.listCsCanevaByParent(parentID).subscribe(res => {
      listFils = res;
      console.log(listFils);
    })
    return listFils;
  }

  edit(caneva: Caneva) {
    this.caneva = caneva;
    console.log(this.caneva);
    this.action = "edit";
    this.defineLibelleModal(this.action, "caneva");
    this.modalNewCan = true;
  }
  suppress(caneva: Caneva) {
    this.caneva = caneva;
    console.log(this.caneva);
    this.action = "delete";
    this.defineLibelleModal(this.action, "caneva");
    this.dialogDelete = true;
  }

  organisationID: string = "";
  structureID: string = "";
  selectStrucrureID(event: { value: string }) {
    this.structureID = event.value;
    console.log(this.structureID);
  }

  listStructure(event: { value: string }) {
    this.organisationID = event.value;
    console.log(this.organisationID);
    this.api.structureList('fr', event.value).subscribe((data: any) => {
      this.structures = data;
    })
  }

  listOrganisation() {
    this.api.organisationList('', true).subscribe((data: any) => {
      this.organisations = data;
    });
  }

  listCaneva(organisationID: string) {
    this.canevas = [];
    this.api.listCaneva(organisationID).subscribe(res => {
      this.canevas = res;
      if (this.canevas.length == 0) {
        this.defineLibelleModal("notFound", "Caneva");
        this.dialogConfirmAction = true;
      }
    })
  }

  Titre = false;
  addTitre() {
    this.titre = new CsCaneva();
    this.Titre = true;
    this.action = "new";
    this.defineLibelleModal(this.action, "Titre");
    this.dialogAddTitre = true;
  }
  addSousTitre() {
    this.Titre = false;
    this.titre = new CsCaneva();
    this.titre.sititre = 0;
    this.action = "new";
    this.defineLibelleModal(this.action, "Sous titre");
    this.dialogAddTitre = true;
  }


  deleteCan(caneva: Caneva) {
    this.api.deleteCaneva(caneva.canevaID, caneva.user_update).subscribe(data => {
      console.log(data);
      this.defineLibelleModal("delete", "Caneva");
      this.dialogDelete = false;
      this.dialogConfirmAction = true;
      this.listCaneva('ORG20180017050207.606.950');
    }, error => {
      this.defineLibelleModal("errorDelete", "Caneva");
      this.dialogDelete = false;
      this.dialogConfirmAction = true;
      console.log(error.error);
      this.listCaneva('ORG20180017050207.606.950');
    });
  }
  verifyField(obj: any) {
    if (!obj.libelleFr) {
      this.verified = false;
      this.message = "Verifier les informations entrées";
      this.color = "rgb(217, 51, 13)";
      this.dialogConfirmAction = true;
    } else {
      this.verified = true;
    }
  }

  leveToi(caneva: Caneva) {
    this.caneva = caneva;
    console.log(caneva);
    this.listTitre(caneva.canevaID);

    this.dialogGesTitre = true;
    this.itemsContextTitre = [
      { label: 'Modifier', icon: 'pi pi-fw pi-pencil', command: () => this.updateTitre(this.selectedTitre) },
      { label: 'Sous titre', icon: 'pi pi-fw pi-plus', command: () => this.addSubTitle(this.selectedTitre) },
      { label: 'Déplacer', icon: 'pi pi-fw pi-arrow-right', command: () => this.deplacementCaneva(this.selectedTitre) },
      {
        separator: true
      },
      { label: 'Supprimer', icon: 'pi pi-fw pi-trash', command: () => this.deleteTitre(this.selectedTitre) },
    ];
  }

  save() {
    this.caneva.user_update = this.tokenStorageService.getUser().username;
    this.caneva.ip_update = "192.168.0.100";
    this.caneva.organisationID = 'ORG20180017050207.606.950';
    console.log(this.caneva);
    this.verifyField(this.caneva);
    if (!this.caneva.canevaID && this.verified == true) {
      this.api.createCaneva(this.caneva).subscribe(data => {
        console.log(this.caneva);
        this.defineLibelleModal("new", "Caneva");
        this.dialogConfirmAction = true;
        this.caneva = new Caneva();
        this.listCaneva(this.organisationID);
        this.modalNewCan = false;
      }, error => {
        this.message = "Erreur d'enregistrement";
        this.dialogConfirmAction = true;
        console.log(error.error);
      })
    } else if (this.caneva.canevaID && this.verified == true) {
      this.api.createCaneva(this.caneva).subscribe(data => {
        console.log(this.caneva);
        this.defineLibelleModal("edit", "Caneva");
        this.dialogConfirmAction = true;
        this.listCaneva(this.organisationID);
        this.modalNewCan = false;
      }, error => {
        console.log(this.caneva);
        this.defineLibelleModal("errorSave", "Caneva");
        console.log(error.error);
      })
    }
  }

  getParent(id: string): CsCaneva {
    let result: CsCaneva = new CsCaneva();
    for (const cane of this.listTitres) {
      if (cane.cscanevaID == id) {
        result = cane;
      }
    }
    return result;
  }

  saveTitre(titre: CsCaneva) {

    this.titre = titre;
    if (!this.titre.parent) {
      this.titre.sititre = 1;
    }
    if (this.liason == "lieCadreLogique") {
      this.titre.lieCadreLogique = 1;
      this.titre.lieDiagnostic = 0;
    } else if (this.liason == "lieDiagnostic") {
      this.titre.lieCadreLogique = 0;
      this.titre.lieDiagnostic = 1;
    } else if (this.liason == "default") {
      this.titre.lieCadreLogique = 0;
      this.titre.lieDiagnostic = 0;
    }
    this.titre.user_update = this.tokenStorageService.getUser().username;
    this.titre.ip_update = "192.168.0.104";
    this.titre.organisationID = this.caneva.organisationID;
    this.titre.canevaID = this.caneva.canevaID;
    this.verifyField(this.titre);
    if (!this.titre.cscanevaID && this.verified == true) {
      this.api.createCsCaneva(this.titre).subscribe(data => {
        console.log(this.titre);
        this.defineLibelleModal("new", "Titre");
        this.liason = "default"
        this.dialogConfirmAction = true;
        this.titre = new CsCaneva();
        this.listTitre(this.caneva.canevaID);
      }, error => {
        this.defineLibelleModal("errorSave", "Titre");
        this.dialogConfirmAction = true;
        console.log(this.titre);
        console.log(error.error);
      })
    } else if (this.titre.cscanevaID && this.verified == true) {
      this.api.createCsCaneva(this.titre).subscribe(data => {
        console.log(this.titre);
        this.defineLibelleModal("edit", "Titre");
        this.liason = "default"
        this.dialogConfirmAction = true;
        this.listTitre(this.caneva.canevaID);
      }, error => {
        this.defineLibelleModal("errorSave", "Titre");
        this.dialogConfirmAction = true;
        console.log(this.titre);
        console.log(error.error);
      })
    }

  }

  rechercher() {
    this.listCaneva('ORG20180017050207.606.950');
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
      case "edit":
        this.libelle = "Edition d'un " + sujet;
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
      case "cancel":
        this.message = "Etes-vous certains de vouloir abandonner vos modifications ?";
        this.color = "rgb(5, 197, 27)";
        break;
      default:
        break;
    }
  }

  verifyLength(valeur: any) {
    let val = "" + valeur; // amends the value to an string, even if its undefined or null etc
    if (val.toString().length >= 70) {
      return true
    }
    return false
  }

  defineDescription(libelle: any): string {
    let value = libelle.slice(0, 69)
    return value;
  }
  visibilte = false;

  changeColor(cscaneva: CsCaneva) {
    this.titre = cscaneva;
    for (const csCaneva of this.listTitres) {
      if (csCaneva.cscanevaID == cscaneva.cscanevaID) {
        this.decoloreAncien(csCaneva);
      }
    }
  }

  mouseUp(cscaneva: CsCaneva) {
    for (const csCaneva of this.listTitres) {
      if (csCaneva.cscanevaID == cscaneva.cscanevaID && csCaneva.color == "blue") {
        csCaneva.color = "#000";
        cscaneva.color = "#000";
        cscaneva.visibilte = "hidden";
      } else {
        cscaneva.color = "#000";
        cscaneva.visibilte = "hidden";
      }
    }
  }

  decoloreAncien(cscaneva: CsCaneva) {
    for (const csCaneva of this.listTitres) {
      if (csCaneva.cscanevaID != cscaneva.cscanevaID && csCaneva.color == "blue") {
        csCaneva.color = "#000";
        csCaneva.visibilte = "hidden";
        cscaneva.color = "blue";
        cscaneva.visibilte = "visible";
      } else {
        cscaneva.color = "blue";
        cscaneva.visibilte = "visible";
      }
    }
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

  delete(operation: string, client?: Caneva) {
    if (client) {
      this.selectedCanevas.push(Object.assign({}, client));
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
        this.api.deleteCanevaList(this.selectedCanevas).subscribe(res=>{
          this.showSuccesDialog('succes supression');
          this.rechercher();
        })
      }
    });
  }

}
