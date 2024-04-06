import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { User } from 'src/app/class/user';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { FindParam } from 'src/app/class/findparam/find-param';
import { Groupe } from 'src/app/class/groupe/groupe';
import { GroupeGlobal } from 'src/app/class/groupeGlobal/groupe-global';
import { Modules } from 'src/app/class/module/modules';
import { Organisation } from 'src/app/class/organisation/organisation';
import { Role } from 'src/app/class/role/role';
import { Systeme } from 'src/app/class/systeme/systeme';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.scss'],
})
export class GroupesComponent implements OnInit {
  //Groupe
  groupGlobalList: GroupeGlobal[] = [];
  groupes: Groupe[] = [];
  groupe: Groupe = new Groupe();
  groupeSelect: Groupe = new Groupe();
  userGroupeList: User[] = [];
  groupeGlobal: GroupeGlobal = new GroupeGlobal();
  groupeGlobalSelect: GroupeGlobal = new GroupeGlobal();
  itemsGroupe: MenuItem[] = [];

  //Systèmes
  systeme: Systeme = new Systeme();
  systemeSelect: Systeme = new Systeme();
  systemes: Systeme[] = [];
  systemesg: Systeme[] = [];
  groupeSubmitted: boolean = false;

  //Modules
  module: Modules = new Modules();
  moduleSelect: Modules = new Modules();
  modules: Modules[] = [];
  modulesf: Modules[] = [];
  modulesGroupes: Modules[] = [];

  //roles
  role: Role = new Role();
  roleSelect: Role = new Role();
  roles: Role[] = [];
  roleSelectors: Role[] = [];
  roleSelectors2: Role[] = [];

  modulesRoles: Modules[] = [];
  modulesForAddRoles: Modules[] = [];
  duplicate: boolean = false;
  duplicateCode: boolean = false;
  duplicateLibelleFr: boolean = false;
  duplicateLibelleUs: boolean = false;
  confirmMessage = '';
  files1: TreeNode[] = [];
  selectedNodes3: TreeNode[] = [];

  organisations: Organisation[] = [];
  organisationID!: string;
  users: User[] = [];

  rolesUser = new Set<Role>();
  rolesUserFinal = new Set<Role>();
  indexRole!: number;
  displayConfirmRole: boolean = false;
  displayAjoutRole: boolean = false;
  displayAjout: boolean = false;
  displayEditGroup: boolean = false;
  displayUser: boolean = false;
  displayRole: boolean = false;

  fparam: any;

  constructor(
    private api: ApiService,
    private tokenStorageService: TokenStorageService,
    public dialog: DialogService,
    public dialogService: DialogService,
    public translate: TranslateService
  ) {
    this.droits = this.tokenStorageService.getRoles();
    this.fparam = new FindParam('ORG20180017050207.606.850', this.tokenStorageService.getUser().username);
  }
  displaySpinner = false;
  spinner = false;

  ngOnInit(): void {
    this.listGroupess();
    this.listRole();
  }

  listModulesGroupes(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modulesGroupes = data;
      });
  }

  /** liste tous les groupes */
  listGroupes() {
    this.groupGlobalList = [];
    this.spinner = true;
    this.fparam.etat = 1;
    this.api.groupeList(this.fparam).subscribe(
      (data) => {
        console.log(data);
        console.log('data');
        this.groupGlobalList = data;
        this.spinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  refrech() {
    this.listGroupess();
  }
  groupess: Groupe[] = [];
  listGroupess() {
    this.groupGlobalList = [];
    this.spinner = true;
    this.fparam.etat = 1;
    this.api.listGroupes('ORG20180017050207.606.850').subscribe(
      (res) => {
        console.log(res);
        console.log('data');
        this.groupGlobalList = res;
        this.spinner = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listModulesForAddRoles(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modulesForAddRoles = data;
      });
  }

  listAllRoles() {
    this.listRole();
  }

  listModulesRoles(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modulesRoles = data;
      });
  }

  /** liste des roles */
  listRole() {
    var arrayToTree = require('array-to-tree');
    this.fparam.etat = 1;
    this.api.roleListByUserData(this.fparam).subscribe(
      (data) => {
        console.log(data);
        this.roleSelectors2 = data;
        this.files1 = [];
        this.roles = data;
        for (let item of data) {
          let file: TreeNode = {
            key: '',
            data: null,
            label: '',
            parent: undefined,
          };
          file.key = item.roleID;
          file.data = item;
          file.label = item.libelleFr;
          file.parent = item.roleParent;
          this.files1.push(file);
        }
        this.files1 = arrayToTree(this.files1, {
          parentProperty: 'parent',
          customID: 'key',
        });
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
  displayEditRole: boolean = false;
  closeDialogEditRole() {
    this.displayEditRole = false;
  }

  closeConfirmRole() {
    this.displayConfirmRole = false;
  }

  rolesByUser(roles: Role[]) {
    let listeRole: Role[] = [];
    let mesRoles: any;
    mesRoles = this.tokenStorageService.getRoles();
    for (let item of mesRoles) {
      roles.forEach((element) => {
        if (item == element.code) {
          this.rolesUser.add(element);
        }
      });
    }
    this.rolesUser.forEach((element) => {
      this.rolesUserFinal.add(element);
    });
    roles.forEach((element) => {
      this.rolesUser.forEach((element2) => {
        if (element.roleID == element2.roleParent) {
          this.rolesUserFinal.add(element);
        }
      });
    });
    this.rolesUserFinal.forEach((element) => {
      listeRole.push(element);
    });
    return listeRole;
  }

  /**liste des utilisateurs par organisation */
  // listUser() {
  //   this.api.userList(this.fparam.organisationID, 'fr').subscribe((data) => {
  //     console.log(data);
  //     for (var i = data.length - 1; i >= 0; i--) {
  //       for (var j = 0; j < this.groupeGlobalSelect.users.length; j++) {
  //         if ((data[i] && (data[i].login === this.groupeGlobalSelect.users[j].login)) || (data[i] && (data[i].login === ''))) {
  //           data.splice(i, 1);
  //         }
  //       }
  //     } this.users = data; this.users = [... this.users];
  //   });
  // liste = liste.concat(data.filter((obj: User) => obj.login != element.login)); console.log(liste);
  // let liste2 = this.groupeGlobalSelect.users.filter((obj: User) => obj.login)
  // this.users = data.filter((val: User) => !this.groupeGlobalSelect.users.includes(val));
  // }

  refres() {
    this.users = [];
    this.groupeGlobal.users = [];
  }
  listUser() {
    this.api.listUsers('ORG20180017050207.606.850').subscribe((data) => {
      console.log(data);
      this.users = data.filter((user: User) => {
        return (!this.groupeGlobal.users.some((gUser) => gUser.login === user.login) && user.login !== '');
      });
      this.users = [...this.users];
    });
  }

  action = '';
  libelle = '';
  showDialogEditGroup(action: string, groupe?: GroupeGlobal) {
    this.action = action;
    if (action == 'edit') {
      this.libelle = 'editGroup';
    } else if (action == 'view') {
      this.libelle = 'consultGroup';
    } else if (action == 'new') {
      this.libelle = 'newGroup';
    }
    if (groupe) {
      this.groupeGlobal = groupe;
    } else {
      this.groupeGlobal = new GroupeGlobal();
    }
    this.displayEditGroup = true;
  }

  closeDialogEditGroup() {
    this.displayEditGroup = false;
  }

  // showDialogRole(groupe: GroupeGlobal) {

  //   this.displayRole = true;
  //   this.selectedNodes3 = []
  //   for (let i = 0; i < groupe.roles.length; i++) {
  //     let elmt: TreeNode<any> = { data: groupe.roles[i], key: groupe.roles[i].roleID, label: groupe.roles[i].libelleFr, partialSelected: false }
  //     this.selectedNodes3.push(elmt);
  //   }

  // }

  showDialogRole(groupe: GroupeGlobal) {
    this.groupeGlobal = groupe;
    this.displayRole = true;
    this.selectedNodes3 = groupe.roles.map((role) => ({
      data: role,
      key: role.roleID,
      label: role.libelleFr,
      partialSelected: false,
    }));
  }

  closeDialogRole() {
    this.displayRole = false;
  }

  showDialogUser(groupe: GroupeGlobal) {
    this.groupeGlobal = groupe;
    this.listUser();
    this.displayUser = true;
  }
  closeDialogUser() {
    //this.refres();
    this.displayUser = false;
  }

  showDialogConfirmGroupe(groupe: GroupeGlobal) {
    console.log(groupe);

    this.groupeGlobal = groupe;
    this.displayConfirmGroupe = true;
  }
  closeConfirmGroupe() {
    this.displayConfirmGroupe = false;
  }

  /** ajouter un groupe */
  addGroupe() {
    this.spinner = true;
    this.groupeSubmitted = true;
    this.groupeGlobal.groupe.organisationID = 'ORG20180017050207.606.850';
    this.groupeGlobal.groupe.user_update = this.tokenStorageService.getUser().username;
    if (this.groupeGlobal.groupe.code && this.groupeGlobal.groupe.libelleFr) {
      this.api.groupeInsert(this.groupeGlobal).subscribe(
        (data: any) => {
          this.refrech();
          this.successDialog = true;
          this.succesMessage = this.translate.instant('Groupe enregistré avec succès');
          this.groupeGlobal = new GroupeGlobal();
          this.groupeSubmitted = false;
          this.spinner = false;
          this.closeDialogEditGroup();
        },
        (error) => {
          console.log(error);
          switch (error.error) {
            case 1001: this.duplicateCode = true; break;
            case 1002: this.duplicateLibelleFr = true; break;
            case 1003: this.duplicateLibelleUs = true; break;

            default:
              this.groupeSubmitted = false;
              this.displayAjout = false;
              this.showDialogError('Une erreur est survenue lors de la création du Groupe');
              break;
          }
        }
      );
    }
  }

  canSave = false;
  dialogAction = false;
  controle(groupe: Groupe) {
    if (!groupe.code) {
      this.spinner = false;
      this.canSave = false;
      this.errorMessage = 'Veuillez renseigner le code svp !';
      this.dialogAction = true;
    } else if (!groupe.libelleFr) {
      this.spinner = false;
      this.canSave = false;
      this.errorMessage = 'Veuillez renseigner le libellé svp !';
      this.dialogAction = true;
    } else {
      this.canSave = true;
    }
  }
  saveGroupe(groupe: Groupe) {
    this.spinner = true;
    console.log(groupe);
    this.controle(groupe);
    groupe.organisationID = 'ORG20180017050207.606.850';
    if (this.canSave == true) {
      this.api.groupeUpdater(groupe).subscribe((data: any) => {
        console.log(data);
        if (!groupe.groupeID) {
          this.showSuccesDialog(this.translate.instant('successCreateGroupe'));
        } else {
          this.showSuccesDialog(this.translate.instant('successUpdateGroupe'));
        }
        this.closeDialogEditGroup();
        this.spinner = false;
        this.refrech();
      }, (error) => {
        this.spinner = false;
        this.showErrorDialog("errorCreateGroupe");
      }
      );
    }
  }
  // dialogs : affichage et hide groupe de fonctionnalités

  //// Modules ////
  listModules(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modules = data;
      });
  }

  listModulesForm(event: { value: string }) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        event.value
      )
      .subscribe((data) => {
        this.modulesf = data;
      });
  }

  listModulesUpd(sysID: string) {
    this.api
      .moduleListByHabilitation(
        this.tokenStorageService.getUser().username,
        sysID
      )
      .subscribe((data) => {
        this.modulesf = data;
      });
  }

  indexGrp!: number;
  /** recupère le groupe selectionné pour traitement */
  recuperer(item: GroupeGlobal, index: number) {
    this.indexGrp = index;
    this.groupeGlobalSelect = item;
    console.log(this.groupeGlobalSelect);

    this.listModulesUpd(this.groupeGlobalSelect.groupe.systemeID);
  }



  /** affecter des utilisateurs au groupe */
  affecterUser() {
    this.spinner = true;
    console.log(this.groupeGlobal);
    this.api.groupeAffecterUser(this.groupeGlobal).subscribe(
      (data: any) => {
        this.spinner = false;
        this.showSuccesDialog(this.translate.instant('successAffectUser'));
        this.users = [];
      },
      (error) => {
        console.log(error);
        this.spinner = false;
        this.showErrorDialog(this.translate.instant('errorAffetUser'));
        this.users = [];
      }
    );
    this.displayUser = false;
  }
  /** affecter des roles au groupe */
  affecterRole(grp: GroupeGlobal) {
    this.spinner = true;
    grp.roles = [];
    for (let element of this.selectedNodes3) {
      grp.roles.push(element.data);
    }
    console.log(grp);
    this.api.groupeAffecterRole(grp).subscribe(
      (data: any) => {
        this.showSuccesDialog(this.translate.instant('successAttribRole'));
        this.spinner = false;
      },
      (error) => {
        console.log(error);
        this.spinner = false;
        this.showErrorDialog(this.translate.instant('errorAttribRole'));
      }
    );
    this.displayRole = false;
  }

  //dialogs : Confirmmation  suppression groupe
  displayConfirmGroupe: boolean = false;
  errorMessage: string = '';
  displayError: boolean = false;
  succesMessage: string = '';
  displaySucces: boolean = false;
  showDialogError(message: string) {
    this.errorMessage = message;
    this.errorDialog = true;
  }

  closeError() {
    this.errorDialog = false;
  }

  showDialogSucces(message: string) {
    this.succesMessage = message;
    this.successDialog = true;
  }

  closeSucces() {
    this.successDialog = false;
  }

  /* ******************* Update state ************ */
  dialogDelete = false;
  successDialog = false;
  errorDialog = false;
  dconfirmActionDialog = false;
  selectedGroupes: any[] = [];
  actif = 0;
  /*  confirmActivation(action: number) {
     if (action == 1) {
       this.actif = 1;
     }
     this.upstate = new UpdateState();
     this.upstate.user_update = this.tokenStorageService.getUser().username;
     this.upstate.action = action;
     this.upstate.typeID = 1;
     this.dconfirmActionDialog = true;
   } */
  droits: string[] = [];
  habilitation(code: string) { for (let role of this.droits) { if (role == code) { return true; } } return false; }
  hideActivation() {
    this.actif = 0;
    this.dconfirmActionDialog = false;
    this.selectedGroupes = [];
  }
  hideDeleteDialog() {
    this.actif = 0;
    this.dialogDelete = false;
    this.selectedGroupes = [];
  }

  ref!: DynamicDialogRef;
  showSuccesDialog(message: string) {
    this.ref = this.dialogService.open(SuccessDialogComponent, {
      header: this.translate.instant('succes'),
      width: '300px',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: true,
      data: { msg: this.translate.instant(message) }
    });

    this.ref.onClose.subscribe((data) => {
      if (data) {
        // this.showErrorDialog('errorDelete');
      }
    });
  }

  showErrorDialog(operation: string) {
    this.ref = this.dialogService.open(ErrorDialogComponent, {
      header: this.translate.instant('Erreur'),
      width: '300px',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: true,
      data: { msg: this.translate.instant(operation) }
    });
  }
  delete(operation: string, groupeID: string) {
    this.ref = this.dialogService.open(DeleteDialogComponent, {
      header: this.translate.instant('Attention'),
      width: '400px',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: true,
      resizable: true,
      data: { msg: this.translate.instant(operation) }
    });
    this.ref.onClose.subscribe((data) => {
      if (data == 'delete') {
        this.spinner = true;
        this.api.groupeDelete(groupeID).subscribe(
          (data) => {
            console.log(data);
            this.spinner = false;
            this.groupGlobalList.splice(this.indexGrp, 1);
            this.refrech();
            this.showSuccesDialog(this.translate.instant('successDeleteGroupe'));
          },
          (error) => {
            this.spinner = false;
            console.log(error);
            this.showErrorDialog('errorDeleteGroupe');
          }
        );
      }
    });
  }

  /** suppression du groupe */
  deleteGroupe() {
    this.spinner = true;
    console.log(this.groupeGlobal.groupe.groupeID);
    this.api.groupeDelete(this.groupeGlobal.groupe.groupeID).subscribe(
      (data) => {
        console.log(data);
        this.spinner = false;
        this.groupGlobalList.splice(this.indexGrp, 1);
        this.refrech();
        this.showDialogSucces(this.translate.instant('Groupe supprimé avec succès'));
      },
      (error) => {
        console.log(error);
        this.showDialogError('Une erreur est survenue lors de la suppression du Groupe');
      }
    );
    this.displayConfirmGroupe = false;
  }
  /* ******************* Update state ************ */
}
