import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MenuItem,
  MessageService,
  TreeNode,
} from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { FindParam } from 'src/app/class/findparam/find-param';
import { Modules } from 'src/app/class/module/modules';
import { Role } from 'src/app/class/role/role';
import { Systeme } from 'src/app/class/systeme/systeme';
import { ApiService } from 'src/app/services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fonctionalite',
  templateUrl: './fonctionalite.component.html',
  styleUrls: ['./fonctionalite.component.scss'],
})
export class FonctionaliteComponent implements OnInit {
  //Systèmes
  systeme: Systeme = new Systeme();
  systemeSelect: Systeme = new Systeme();
  systemes: Systeme[] = [];
  systemesg: Systeme[] = [];
  roleSubmitted: boolean = false;
  itemsRole: MenuItem[] = [];
  //roles

  roleSelect: Role = new Role();
  roles: Role[] = [];
  roleSelectors: Role[] = [];
  roleSelectors2: Role[] = [];
  modulesRoles: Modules[] = [];
  modulesForAddRoles: Modules[] = [];
  files1: TreeNode[] = [];
  files2: TreeNode[] = [];

  rolesUser = new Set<Role>();
  rolesUserFinal = new Set<Role>();

  indexRole!: number;
  nodeRoot: TreeNode = {};
  nodeChild: TreeNode = {};

  fparam: any;

  constructor(
    private api: ApiService,
    private confirmationService: ConfirmationService,
    private tokenStorageService: TokenStorageService,
    public dialog: DialogService,
    private message: MessageService,
    public translate: TranslateService
  ) {
    this.fparam = new FindParam(
      'ORG20180017050207.606.850',
      this.tokenStorageService.getUser().username
    );
  }

  ngOnInit(): void {
    this.listRole();
    this.listSysteme();
  }

  //// SYSTEME ////

  listSysteme() {
    this.api.systemList().subscribe((data) => {
      this.systemes = data;
    });
  }

  //// Roles ////

  /** liste des roles */
  displaySpinner = false;
  listRole() {
    this.displaySpinner = true;
    console.log(this.fparam);

    var arrayToTree = require('array-to-tree');
    this.fparam.etat = 1;
    this.api.roleListByUserData(this.fparam).subscribe(
      (data) => {
        console.log(data);
        this.roleSelectors2 = data;
        this.files1 = [];
        this.roles = data;
        for (let item of data) {
          if (item.code != 'GA01') {
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
        }
        this.files1 = arrayToTree(this.files1, {
          parentProperty: 'parent',
          customID: 'key',
        });
        this.displaySpinner = false;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  listRoleByModule(event: { value: string }) {
    this.files2 = [];
    var arrayToTree = require('array-to-tree');
    this.api.listRoleByModule(event.value).subscribe((data) => {
      this.roleSelectors2 = data;
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
      console.log(this.files1);
      console.log(this.files2);

      this.files1 = [...this.files1];
    });
  }

  // rolesByUser(roles: Role[]) {

  //   let listeRole: Role[] = [];
  //   let mesRoles: any
  //   mesRoles = this.tokenStorageService.getRoles()

  //   for (let item of mesRoles) {
  //     roles.forEach(element => {
  //       if (item == element.code) {
  //         this.rolesUser.add(element)
  //       }
  //     });
  //   }
  //   this.rolesUser.forEach(element => {
  //     this.rolesUserFinal.add(element)
  //   });

  //   roles.forEach(element => {
  //     this.rolesUser.forEach(element2 => {
  //       if (element.roleID == element2.roleParent) {
  //         this.rolesUserFinal.add(element)
  //       }
  //     })
  //   });
  //   this.rolesUserFinal.forEach(element => {
  //     listeRole.push(element)
  //   });
  //   return listeRole
  // }

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

  expandAll() {
    this.files1.forEach((node) => {
      this.expandRecursive(node, true);
    });
    this.files1 = [...this.files1];
  }

  collapseAll() {
    this.files1.forEach((node) => {
      this.expandRecursive(node, false);
    });
    this.files1 = [...this.files1];
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  /** ajout role */
  editRole() {
    this.roleSelect.organisationID = this.fparam.organisationID;
    this.roleSelect.user_update = this.fparam.userID;
    this.roleSubmitted = true;
    this.api.roleInsert(this.roleSelect).subscribe(
      (data: any) => {
        this.showDialogSucces('Role enregistré avec succès');
        this.displayEditRole = false;
        this.roleSelect = new Role();
        this.listRole();
      },
      (error) => {
        console.log(error);
        this.showDialogError(
          'Une erreur est survenue lors de la Création du Role'
        );
      }
    );
  }

  /** supression role */
  deleteRole(role: Role) {
    console.log(role.roleID);
    this.api.roleDelete(role.roleID).subscribe(
      (data) => {
        this.files1 = [];
        this.listRole();
        this.roles.splice(this.indexRole, 1);
        this.succesMessage = this.translate.instant(
          'Role supprimé avec succès !!'
        );
      },
      (error) => {
        console.log(error);
        if (error.error == 1) {
          this.showDialogError('erreur suppression role parent');
        } else {
          this.showDialogError(
            'Une erreur est survenue lors de la suppression du Role'
          );
        }
      }
    );
    this.displayConfirmRole = false;
  }

  displayEditRole: boolean = false;
  showDialogEditRole(role?: Role) {
    if (role) {
      this.roleSelect = role;
    } else {
      this.roleSelect = new Role();
    }
    this.displayEditRole = true;
  }

  getModule(code: string) {
    let module = '';
    switch (code) {
      case 'PFNL01': module = 'assets/icons/mod1.png'; break;
      case 'PFNL02': module = 'assets/icons/mod2.png'; break;
      case 'PFNL03': module = 'assets/icons/mod3.png'; break;
      case 'PFNL04': module = 'assets/icons/mod4.png'; break;
      case 'PFNL05': module = 'assets/icons/mod5.png'; break;
      case 'PFNL06': module = 'assets/icons/mod6.png'; break;
      case 'PFNL07': module = 'assets/icons/mod7.png'; break;
      case 'PFNL08': module = 'assets/icons/mod8.png'; break;
      case 'PFNL09': module = 'assets/icons/mod9.png'; break;
      case 'PFNL10': module = 'assets/icons/mod10.png'; break;
      case 'PFNL11': module = 'assets/icons/mod11.png'; break;
      case 'PFNL12': module = 'assets/icons/mod12.png'; break;

      default:
        break;
    }
    return module;
  }

  confirm(role: any) {
    this.confirmationService.confirm({
      message: this.translate.instant('state'),
      icon: 'pi pi-exclamation-triangle text-danger',
      acceptLabel: this.translate.instant('oui'),
      rejectLabel: this.translate.instant('non'),
      rejectButtonStyleClass: 'p-button-sm p-button-text',
      acceptButtonStyleClass: 'p-button-sm',
      accept: () => {
        this.deleteRole(role);
      },
    });
  }

  closeDialogEditRole() {
    this.displayEditRole = false;
  }

  //dialogs : affichage succès
  succesMessage: string = '';
  displaySucces: boolean = false;

  showDialogSucces(message: string) {
    this.succesMessage = this.translate.instant(message);
    this.displaySucces = true;
  }
  closeSucces() {
    this.displaySucces = false;
  }

  //dialogs : Confirmmation  suppression role
  displayConfirmRole: boolean = false;
  showDialogConfirmRole(role: Role, i: number) {
    this.displayConfirmRole = true;
  }

  closeConfirmRole() {
    this.displayConfirmRole = false;
  }

  //dialogs : affichage erreurs
  errorMessage: string = '';
  displayError: boolean = false;
  showDialogError(message: string) {
    this.errorMessage = message;
    this.displayError = true;
  }
  closeError() {
    this.displayError = false;
  }
}
