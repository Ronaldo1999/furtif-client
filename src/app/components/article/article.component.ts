import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { Exercice } from 'src/app/class/exercice';
import { ApiService } from 'src/app/services/api.service';
import { BcaArticle } from 'src/app/class/BcaArticle';
import { ArticleDialogComponent } from '../../dialog/article-dialog/article-dialog.component';
import { MenuItem, TreeNode } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { SuccessDialogComponent } from '../../dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  ref!: DynamicDialogRef;
  exercices: Exercice[] = [];
  exercice: Exercice = new Exercice();
  articleList: any[] = [];
  fileOrDb = false;
  select = false;
  username!: string;
  fparam: any;
  libellOrg = '';
  org = '';
  droits: any[] = [];

  article: BcaArticle = new BcaArticle();
  articles: BcaArticle[] = [];
  selectedElement!: any;
  action: string = '';
  libelle: string = '';
  message: string = '';
  color: string = '';
  ConfirmationLibelle = '';
  dialogConfirmAction = false;
  displaySpinner = false;

  pages: any[] = [
    { id: 1, libelle: 'Programme 1', libelle1: 'Programme 1', libelle2: 'Programme 1' },
  ];

  constructor(
    public api: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    public tokenStorageService: TokenStorageService,
    public dialogService: DialogService,
    public translate: TranslateService
  ) {
    this.droits = this.tokenStorageService.getRoles();
    this.username = this.tokenStorageService.getUser().username;
  }

  ngOnInit(): void {
    this.listExercice();


    this.items = [
      {
        label: this.translate.instant('Consulter'),
        icon: 'pi pi-eye',
        command: () => {
          this.consult();
        },
      },
      //{ label: 'Modifier', icon: 'pi pi-pencil', command: () => { this.editer(); } },
      { separator: true },
      {
        label: this.translate.instant('supprimer'),
        icon: 'pi pi-trash',
        command: () => {
          this.dialogConfirmAction = true;
        },
      },
    ];
  }
  /* listOrganisation() {
    this.api.organisationList('', true).subscribe((data: any) => {
      this.organisations = data;
      for (const ele of data) {
        if ((ele.organisaionID = this.organisation.organisationID)) {
          this.libellOrg = ele.libelleFr;
          break;
        }
      }
    });
  } */

  listExercice() {
    this.api.listExercice().subscribe((data: any) => {
      this.exercices = data;
      if (data.length == 1) {
        this.exercice = data[0];
        this.listRubrique(data[0].millesime, 0);
        registerLocaleData(es);
        //this.rechercher();
      }
    });
  }
  /** chargement des habilitations et vérification */
  habilitation(code: string) {
    for (let role of this.droits) {
      if (role == code) {
        return true;
      }
    }
    return false;
  }
  /*  getOrganisation() {
     this.organisation.organisationID =
       this.tokenStorageService.getOrganisation();
   } */

  listAricle(millesime: string) {
    this.displaySpinner = true;
    this.articles = [];
    this.api.listArticle(millesime).subscribe((res) => {
      if (res.length == 0) {
        /* this.confirmDialog('Aucun article trouvé', 1, 'red'); */
        this.displaySpinner = false;
      } else {
        this.articles = res;
        this.displaySpinner = false;
      }

      console.log(res);
    });
  }

  typeMercuriale = 2;
  interne = 0;
  inter = 2;
  listAricleBySrID(millesime: string, srId: string) {
    this.displaySpinner = true;
    this.articles = [];
    this.api.listArticleBySrID(millesime, srId).subscribe((res) => {
      if (res.length == 0) {
        this.defineLibelleModal('notFound', 'facture');
        this.dialogConfirmAction = true;
        this.displaySpinner = false;
      } else {
        this.articles = res;
        this.displaySpinner = false;
      }

      console.log(res);
    });
  }

  arbre: TreeNode[] = [];
  arbre2: TreeNode[] = [];
  selectedNodes: any[] = [];
  nodeSelect(event: any) {
    const sr = event.node.data;
    console.log(sr);

    if (sr.srId) {
      this.listAricleBySrID(this.exercice.millesime, sr.srId);
    }
  }
  nodeUnselect(event: any) {
    this.articles = [];
  }
  async onNodeExpand(event: any) {
    const node = event.node;
    if (node.data.ruId) {
      node.children = await this.listSrubrique(node.data.numRubrique);
      this.arbre = [...this.arbre];
    }
  }

  rubriques: any[] = [];
  listRubrique(millesime: string, interne: number) {
    console.log(interne);
    this.displaySpinner = true;
    var arrayToTree = require('array-to-tree');
    this.arbre = [];
    this.rubriques = [];
    this.api.listRubrique(millesime, interne).subscribe(async (res: any) => {
      if (res.length == 0) {
        this.defineLibelleModal('notFound', 'facture');
        this.dialogConfirmAction = true;
        this.displaySpinner = false;
      } else {
        this.rubriques = res;
        console.log(this.rubriques);
        for await (const item2 of res) {
          let op: TreeNode = {
            key: '',
            data: null,
            type: '',
            parent: undefined,
            children: [{ data: {} }],
          };
          op.key = item2.ruId;
          op.data = item2;
          op.type = 'rubrique';
          this.arbre.push(op);
        }
        this.arbre = arrayToTree(this.arbre, {
          parentProperty: 'parent',
          customID: 'key',
        });
        console.log(this.rubriques);
        this.displaySpinner = false;
        this.initialise();
      }
    });
  }

  initialise() {
    this.selectedNodes = [];
    this.select = false;

    this.selectedElement = null;
  }

  async listSrubrique(numRubrique: string) {
    this.arbre2 = [];
    let rs = await this.api
      .listSRubrique(this.exercice.millesime, numRubrique)
      .toPromise();
    console.log(rs);
    for await (const item2 of rs) {
      let op: TreeNode = {
        key: '',
        data: null,
        type: '',
        parent: undefined,
      };
      op.key = item2.srId;
      op.data = item2;
      op.parent = item2.ruId;
      op.type = 'sous-rubrique';
      this.arbre2.push(op);
    }
    return this.arbre2;
  }

  onRowSelect(event: any) {
    const article = event.data;
    console.log(article);
    this.select = true;
    this.selectedElement = article;
    this.article = article;
  }

  onRowUnselect(event: any) {
    this.select = false;
  }

  create() {
    // this.showDynamicDialog('new');
  }
  editer() {
    // this.showDynamicDialog('edit');
  }
  consult() {
    // this.showDynamicDialog('view');
  }

  actionByResult(result: number) {
    if (result == 1) {
    }
  }
  items: MenuItem[] = [];

  /* confirmDialog(message: string, nature: number, color: string) {
    this.ref = this.dialogService.open(ConfirmDialogComponent, {
      header: 'Confirm dialog',
      width: '20vw',
      contentStyle: { height: '20vh', overflow: 'auto' },
      closable: false,
      data: {
        msg: this.translate.instant(message),
        nature: nature,
        color: color,
      },
    });
    this.ref.onClose.subscribe((data) => {
      //this.actionByResult(data);
    });
  } */

  /*  showDynamicDialog(operation: string) {
     if (operation == 'new') {
       this.ref = this.dialogService.open(ArticleDialogComponent, {
         header: this.translate.instant('Nouvel article'),
         width: '50vw',
         contentStyle: { height: '20vw', overflow: '50vw' },
         closable: false,
         data: {
           param: operation,
           millesime: this.exercice.millesime,
           org: this.organisation.organisationID,
         },
       });
     } else if (operation == 'edit') {
       this.ref = this.dialogService.open(ArticleDialogComponent, {
         header: this.translate.instant("Edition d'un article"),
         width: '50vw',
         contentStyle: { height: '20vw', overflow: '50vw' },
         closable: false,
         data: {
           param: operation,
           article: this.selectedElement,
           millesime: this.exercice.millesime,
           org: this.organisation.organisationID,
         },
       });
     } else if (operation == 'view') {
       this.ref = this.dialogService.open(ArticleDialogComponent, {
         header: this.translate.instant("Consultation d'un article"),
         width: '50vw',
         contentStyle: { height: '20vw', overflow: '50vw' },
         closable: false,
         data: {
           param: operation,
           article: this.article,
           millesime: this.exercice.millesime,
           org: this.organisation.organisationID,
         },
       });
     }
 
     // lors de la fermeture des formulaire appelés
     this.ref.onClose.subscribe((data) => {
       if (data) {
         this.article = data;
         if (operation == 'new') {
           this.api.createArticle(this.article).subscribe(
             (data) => {
               this.showSuccesDialog('succes insertion');
             },
             (error) => {
               this.showErrorDialog('insert');
               console.log(error.error);
             }
           );
         } else {
           // alors c'est une modification ou update
           this.api.updateArticle(this.article).subscribe(
             (data) => {
               this.showSuccesDialog('succes update');
             },
             (error) => {
               this.showErrorDialog('insert');
               console.log(error.error);
             }
           );
         }
       } else {
         //this.rechercher();
       }
     });
   }
  */
  showSuccesDialog(message: string) {
    this.ref = this.dialogService.open(SuccessDialogComponent, {
      header: this.translate.instant('succes'),
      width: '20vw',
      contentStyle: { height: '20vh', overflow: 'auto' },
      closable: false,
      data: { msg: this.translate.instant(message) },
    });
  }

  showErrorDialog(operation: string) {
    this.ref = this.dialogService.open(ErrorDialogComponent, {
      header: this.translate.instant('Erreur'),
      width: '20vw',
      contentStyle: { height: '20vh', overflow: 'auto' },
      closable: true,
      data: { msg: this.translate.instant(operation) },
    });
  }

  rechercher() {
    this.articles = [];
    this.listRubrique(this.exercice.millesime, this.typeMercuriale);
  }

  verifyLength(valeur: any) {
    let val = '' + valeur;
    if (val.toString().length >= 32) {
      return true;
    }
    return false;
  }
  defineDescription(libelle: any): string {
    let value = libelle.slice(0, 31);
    return value;
  }

  verifyLength2(valeur: any) {
    let val = '' + valeur;
    if (val.toString().length >= 65) {
      return true;
    }
    return false;
  }
  defineDescription2(libelle: any): string {
    let value = libelle.slice(0, 64);
    return value;
  }

  defineLibelleModal(action: string, sujet: string) {
    switch (action) {
      case 'new':
        this.libelle = this.translate.instant(
          'Enregistrement dun ' + this.translate.instant(sujet)
        );
        this.message = this.translate.instant('Bien enregistré');
        this.ConfirmationLibelle = this.translate.instant('Confirmation');
        this.color = 'rgb(5, 197, 27)';
        break;
      case 'confirmOperation':
        this.message = this.translate.instant('Opération réussie');
        this.ConfirmationLibelle = 'Confirmation';
        this.color = 'rgb(5, 197, 27)';
        break;
      case 'edit':
        this.libelle = this.translate.instant(
          'Édition dun ' + this.translate.instant(sujet)
        );
        this.message = this.translate.instant('Modification réussie');
        this.ConfirmationLibelle = this.translate.instant('Confirmation');
        this.color = 'rgb(5, 197, 27)';
        break;
      case 'sEdit':
        this.libelle = this.translate.instant(
          "Édition d'un " + this.translate.instant(sujet)
        );
        this.message = this.translate.instant('Modification réussie');
        this.ConfirmationLibelle = 'Confirmation';
        this.color = 'rgb(5, 197, 27)';
        break;
      case 'cp':
        this.libelle = this.translate.instant('Contrôle de procédure');
        this.message = this.translate.instant('Opération réussie');
        this.ConfirmationLibelle = this.translate.instant('Confirmation');
        this.color = 'rgb(5, 197, 27)';
        break;
      case 'cf':
        this.libelle = this.translate.instant('Contrôle financier');
        this.message = this.translate.instant('Opération réussie');
        this.ConfirmationLibelle = this.translate.instant('Confirmation');
        this.color = 'rgb(5, 197, 27)';
        break;
      case 'errorSave':
        this.message = this.translate.instant('Erreur denregistrement');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'notCode':
        this.message = this.translate.instant('noActivity');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'noSelected':
        this.message = this.translate.instant('selectOrgAndMillesime');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'selectTypeMer':
        this.message = this.translate.instant('selectTypeMer');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'errorFieldTache':
        this.message = this.translate.instant('selectTache');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'errorFieldOrdo':
        this.message = this.translate.instant('errorFieldOrdo');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'errorFieldObjet':
        this.message = this.translate.instant('errorFieldObjet');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'errorFieldMotif':
        this.message = this.translate.instant('errorFieldMotif');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'errorFieldMontt':
        this.message = this.translate.instant('errorFieldMontt');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'errorFieldFour':
        this.message = this.translate.instant('errorFieldFour');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'errorFieldNbJours':
        this.message = this.translate.instant('errorFieldNbJours');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'errorFieldLieu':
        this.message = this.translate.instant('errorFieldLieu');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'errorDelete':
        this.message = this.translate.instant('errorDelete');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'red';
        break;
      case 'notFound':
        this.message = this.translate.instant('notFound');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'rgb(231, 171, 17)';
        break;
      case 'notFoundArticle':
        this.message = this.translate.instant('notFoundArticle');
        this.ConfirmationLibelle = this.translate.instant('Attention');
        this.color = 'rgb(231, 171, 17)';
        break;
      case 'view':
        this.libelle = this.translate.instant(
          'view' + this.translate.instant('sujet')
        );
        break;
      case 'delete':
        this.message = this.translate.instant('Suppression réussie');
        this.ConfirmationLibelle = this.translate.instant('Confirmation');
        this.color = 'rgb(5, 197, 27)';
        break;
      case 'cancel':
        this.message = this.translate.instant('cancel');
        this.color = 'rgb(5, 197, 27)';
        break;
      default:
        break;
    }
  }
}
