import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { GlobalLocalite } from 'src/app/class/global-localite';
import { PfnlUser, User } from 'src/app/class/user';
import { UserActeur } from 'src/app/class/user-acteur';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { FindParam } from 'src/app/class/findparam/find-param';
import { UserGlobal } from 'src/app/class/userGlobal/user-global';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  userDialog = false;
  user: User = new User();

  files1: TreeNode[] = [];

  selectedUsers: any[] = [];
  action = '';
  submitted = false;
  switcherCollecte = 1;

  displayError = false;
  region: GlobalLocalite = new GlobalLocalite();
  departement: GlobalLocalite = new GlobalLocalite();
  arrondissement: GlobalLocalite = new GlobalLocalite();
  localite: GlobalLocalite = new GlobalLocalite();
  regions: GlobalLocalite[] = [];
  departements: GlobalLocalite[] = [];
  departementsByReg: GlobalLocalite[] = [];
  arrondissements: GlobalLocalite[] = [];
  arrondissementDs: GlobalLocalite[] = [];
  localiteDs: GlobalLocalite[] = [];
  localites: GlobalLocalite[] = [];
  alllocalites: GlobalLocalite[] = [];
  selectedLocalite: number[] = [];
  selectedRegions: number[] = [];
  selectedDepartement: number[] = [];
  selectedArrondi: number[] = [];
  profils = [
    { id: 1, libelle: 'Top management' },
    { id: 1, libelle: 'Responsable de programme' },
    { id: 1, libelle: 'Responsable d’action' },
    { id: 1, libelle: 'Responsable d’activites' },
    { id: 1, libelle: 'Referent d’action' },
    { id: 1, libelle: 'Coordonnateur du Controle de Gestion ' },
    { id: 1, libelle: 'Controleur de gestion ' },
    { id: 1, libelle: 'Responsable operationnel' },
    { id: 1, libelle: 'Referant departemental' },
    { id: 1, libelle: 'Responsable d’unites administratives ' },
  ];
  groupes = [
    { id: 1, libelle: 'ADMINISTRATEUR' },
    { id: 2, libelle: 'GESTIONNAIRE' },
    { id: 3, libelle: 'UTILISATEUR' },
  ];
  fparam: any;
  ref!: DynamicDialogRef;
  succesMessage: string = '';
  constructor(
    public route: ActivatedRoute,
    public ts: TokenStorageService,
    public dialogService: DialogService,
    public translate: TranslateService,
    private api: ApiService
  ) {
    this.droits = this.ts.getRoles();
    this.fparam = new FindParam('ORG20180017050207.606.850', this.ts.getUser().username);
  }
  typeUser = '';

  ngOnInit(): void {
    this.userGlobal.user.userUpdate = this.ts.getUser().username;
    this.liste();
    this.typeUser = this.route.snapshot.params['typeUser'];
  }

  getNiveauIntervention(typeuser: number) {
    let libelle = '';
    switch (typeuser) {
      case 1:
        libelle = 'CENTRALE';
        break;
      case 2:
        libelle = 'REGIONALE';
        break;
      case 3:
        libelle = 'DEPARTEMENTALE';
        break;

      default:
        break;
    }
    return libelle;
  }
  spinner = false;

  listDescendants() {
    this.spinner = true;
    this.files1 = [];
    var arrayToTree = require('array-to-tree');
    this.api
      .userListByLogin('ORG20180017050207.606.850', this.ts.getUser().username)
      .subscribe(
        (data) => {
          this.users = data;

          for (let item of data) {
            let file: TreeNode = {
              key: '',
              data: null,
              label: '',
              parent: undefined,
            };
            file.key = item.login;
            file.data = item;
            file.label = item.nom + ' ' + item.prenom;
            file.parent = item.loginParent;
            this.files1.push(file);
          }
          this.files1 = arrayToTree(this.files1, {
            parentProperty: 'parent',
            customID: 'key',
          });
          this.spinner = false;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  listByGroupe(groupeID: number) {
    this.users = [];
    this.api.listByGroupe(groupeID).subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
  }
  liste() {
    this.users = [];
    this.spinner = true;
    this.api.listUsers('ORG20180017050207.606.850').subscribe(
      (res) => {
        this.users = res;
        this.spinner = false;
        console.log(this.users);
      },
      (error) => { console.log(error); this.spinner = false; }
    );
  }
  libelle = '';
  modifierTree() {
    this.trieTree(this.files1);
  }
  droits: string[] = [];

  habilitation(code: string) { for (let role of this.droits) { if (role == code) { return true; } } return false; }

  dialogActivation = false;
  mesageActivation = '';
  acti = 0;

  confirmActive(action: number) {
    if (action == 1) {
      this.mesageActivation = 'Êtes-vous certains de vouloir activer cet utilisateur ?';
      this.acti = action;
    } else {
      this.mesageActivation = 'Êtes-vous certains de vouloir desactiver cet utilisateur ?';
      this.acti = action;
    }
    this.dialogActivation = true;
  }

  active(user: PfnlUser) {
    this.api.activeUser(user.userID, this.acti).subscribe((res: any) => { this.listByGroupe(this.switcherCollecte); });
  }
  usersUpdateList = new Set<User>();
  trieTree(topNode: TreeNode[]) {
    for (let index = 0; index < topNode.length; index++) {
      topNode[index].data.loginParent = null;
      this.AffecterNodeParent(topNode[index]);
    }
    console.log(this.usersUpdateList);
    this.api.userListUpdate(this.usersUpdateList).subscribe(
      (data: any) => {
        this.showDialogSucces('succès reseau update');
        this.usersUpdateList = new Set<User>();
      },
      (error) => {
        console.log(error);
        this.showErrorDialog('erreur reseau update');
      }
    );
  }
  AffecterNodeParent(topNode: TreeNode) {
    this.usersUpdateList.add(topNode.data);
    if (topNode.children != null) {
      var i;
      for (i = 0; i < topNode.children.length; i++) {
        topNode.children[i].data.loginParent = topNode.key;
        this.usersUpdateList.add(topNode.children[i].data);
        if (topNode.children[i].children != null) {
          this.AffecterNodeParent(topNode.children[i]);
        }
      }
    } else return;
  }

  close() {
    this.userDialog = false;
    this.submitted = false;
  }
  dialogConfirmAction = false;
  canSave = false;
  errorMessage = '';
  controle(bse: PfnlUser) {
    if (!bse.loginuser) {
      this.canSave = false;
      this.errorMessage = 'Veuillez entrer un login svp !';
      this.dialogConfirmAction = true;
    } else if (!bse.passworduser) {
      this.canSave = false;
      this.errorMessage = 'Veuillez entrer le mot de passe svp !';
      this.dialogConfirmAction = true;
    } else if (!bse.nomuser) {
      this.canSave = false;
      this.errorMessage = 'Veuillez entrer le nom svp !';
      this.dialogConfirmAction = true;
    } else {
      this.canSave = true;
    }
  }


  closeError() {
    this.displayError = false;
  }

  showDialogSucces(message: string) {
    this.succesMessage = message;
    this.successDialog = true;
  }

  expandAll() {
    this.files1.forEach((node) => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.files1.forEach((node) => {
      this.expandRecursive(node, false);
    });
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  ua: UserActeur = new UserActeur();
  uas: UserActeur[] = [];
  affectDialog = false;
  listType: any[] = [
    { id: 1, label: 'CENTRALE' },
    { id: 2, label: 'REGIONNALE' },
    { id: 3, label: 'DEPARTEMENTALE' },
  ];
  type = 0;

  affecter(user: any) {
    this.ua = new UserActeur();

    this.ua.userID = user.login;
    this.affectDialog = true;
  }

  hideDialog() {
    this.affectDialog = false;
  }

  /* ******************* Update state ************ */
  dialogDelete = false;
  successDialog = false;
  errorDialog = false;
  dconfirmActionDialog = false;
  actif = 0;

  confirmActivationForOne(user: User, action: number) {
    this.actif = action;
    this.selectedUsers.push(Object.assign({}, user));
    this.dconfirmActionDialog = true;
  }
  hideActivation() {
    this.actif = 0;
    this.dconfirmActionDialog = false;
    this.selectedUsers = [];
  }
  hideDeleteDialog() {
    this.actif = 0;
    this.dialogDelete = false;
    this.selectedUsers = [];
  }

  refresh() {
    this.actif = 0;
    this.liste();
  }

  getListDepartementByRegID(id: number) {
    this.departementsByReg = [];
    for (const ele of this.departements) {
      if (ele.idregions == id) {
        this.departementsByReg.push(Object.assign({}, ele));
      }
    }
  }
  getListArronByRegID(id: number) {
    this.arrondissementDs = [];
    for (const ele of this.arrondissements) {
      if (ele.iddepartements == id) {
        this.arrondissementDs.push(Object.assign({}, ele));
      }
    }
  }
  getListLocalieByRegID(id: number) {
    this.localiteDs = [];
    for (const ele of this.alllocalites) {
      if (ele.idcommunes == id) {
        this.localiteDs.push(Object.assign({}, ele));
      }
    }
  }

  createUser() {
    this.duplicateUserName = false;
    this.duplicateEmail = false;
    this.actionUser = 'new'
    this.libelle = "Création d'un nouvel utilisateur"
    this.userGlobal = new UserGlobal(new User(), []);
    this.userUpdateDialog = true;
  }

  userGlobal: UserGlobal = new UserGlobal(new User(), []);
  username: any;
  allfields = false;
  duplicateUserName = false;
  duplicateEmail = false;
  userUpdateDialog = false;

  userGlobalInsert(object: UserGlobal, action: string) {
    object.user.organisationID = this.fparam.organisationID;
    object.user.userUpdate = this.ts.getUser().username;
    this.spinner = true;
    if (action=='new') {
      this.api.userGlobalInsert(object, 'fr').subscribe(
        (data: any) => {
          this.showSuccesDialog(this.translate.instant('successCreateUser'));
          this.spinner = false;
          this.userUpdateDialog = false;
          this.refresh();
        },
        (error) => {
          this.spinner = false;
          console.log(error);
          this.showErrorDialog("errorCreateUser");
          switch (error.error) {
            case 1001: this.duplicateUserName = true; break;
            case 1002: this.duplicateEmail = true; break;
            default: ; break;
          }
        }
      );
    } else {
      this.api.userGlobalInsert(object, 'fr').subscribe(
        (data: any) => {
          this.showSuccesDialog(this.translate.instant('successUpdateUser'));
          this.spinner = false;
          this.userUpdateDialog = false;
          this.refresh();
        },
        (error) => {
          this.spinner = false;
          console.log(error);
          this.showErrorDialog("errorUpdateUser");
          switch (error.error) {
            case 1001: this.duplicateUserName = true; break;
            case 1002: this.duplicateEmail = true; break;
            default: ; break;
          }
        }
      );
    }
    
  }

  userGlobalUpdate(user: UserGlobal, language: string) {
    this.api.userGlobalUpdate(user, language).subscribe(
      (data: any) => {
        this.showSuccesDialog(this.translate.instant('successUpdateUser'));
        this.spinner = false;
        this.userUpdateDialog = false;
        this.refresh();
      },
      (error) => {
        this.spinner = false;
        console.log(error);
        this.showErrorDialog("errorUpdateUser");
        switch (error.error) {
          case 1001: this.duplicateUserName = true; break;
          case 1002: this.duplicateEmail = true; break;
          default: ; break;
        }
      }
    );
  }

  actionUser = '';
  saveUser() {

    this.userGlobal.user.organisationID = 'ORG20180017050207.606.850';
    this.submitted = true;
    if (
      this.userGlobal.user.login &&
      this.userGlobal.user.password &&
      this.userGlobal.user.organisationID &&
      this.userGlobal.user.nom &&
      this.userGlobal.user.telephone &&
      this.userGlobal.user.email
    ) {
      this.allfields = true;
      if (this.actionUser == 'new') {
        console.log(this.userGlobal);
        this.userGlobalInsert(this.userGlobal, this.actionUser);
      } else if (this.actionUser == 'edit') {
        this.userGlobalInsert(this.userGlobal, this.actionUser);
      }
    }
  }
  passRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
  confirmPass = '';
  validerPass() {
    console.log('pass is ' + (this.passRegex.test(this.userGlobal.user.password) ? 'correct' : 'incorrect'));
    return this.passRegex.test(this.userGlobal.user.password);
  }

  getUser(user: User, action: string) {
    console.log(user);
    this.actionUser = action;
    this.libelle = this.translate.instant('user' + action);
    this.userGlobal.user = { ...user };
    this.confirmPass = user.password;
    this.userUpdateDialog = true;
    // this.spinner = true;
    /*  this.api.userGlobalFind(user.login, 'fr').subscribe((data: any) => {
       this.spinner = false;
       this.userGlobal = data;
       this.confirmPass = user.password;
       this.userUpdateDialog = true;
     }); */
  }

  vue = false;
  vuec = false;
  togglePasswordVisibility() {
    this.vue = !this.vue;
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
  togglePasswordVisibilityCon() {
    this.vuec = !this.vuec;
    const passwordInput = document.getElementById('passwordInputC') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  noSame = true;
  getConfirm(pass: string) {
    let reu = false;
    if (pass == this.userGlobal.user.password) {
      this.noSame = true;
      reu = true;
    } else {
      this.noSame = false;
      reu = false;
    }
    return reu;
  }


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
  delete(operation: string, element: User) {
    this.user = element;
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
        this.actif = 0;
        this.spinner = true;
        this.api.userDelete(this.user.login).subscribe((res) => {
          this.selectedUsers = [];
          this.showSuccesDialog(this.translate.instant('Suppression réussie'));
          this.spinner = false;
          this.refresh();
        });
      }
    });
  }

}
