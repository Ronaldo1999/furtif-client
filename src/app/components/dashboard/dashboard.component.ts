import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { PartiePrenante, TypeDocument, StatutDocument, HistoDocument, Document, Stat } from 'src/app/class/document.model';
import { ApiService } from 'src/app/services/api.service';
import $ from 'jquery';
import 'jqueryui';
import { GroupeGlobal } from 'src/app/class/groupeGlobal/groupe-global';
import { FindParam } from 'src/app/class/findparam/find-param';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gr = 0;
  us = 0;
  docs = 0;
  typs = 0;
  stats = 0;
  document: Document = new Document();
  documents: Document[] = [];
  documentsdebase: Document[] = [];

  partie: PartiePrenante = new PartiePrenante();
  parties: PartiePrenante[] = [];

  typeDocument: TypeDocument = new TypeDocument();
  typeDocuments: TypeDocument[] = [];

  statutDocument: StatutDocument = new StatutDocument();
  statutDocuments: StatutDocument[] = [];

  items: MenuItem[] = [];
  itemsStatuts: MenuItem[] = [];
  displayModal = false;
  selectedDocument: Document[] = [];
  selectedTypeDocument: TypeDocument[] = [];
  selectedStatutDocument: StatutDocument[] = [];
  selectedHistoDocument: HistoDocument[] = [];
  spinner = false;
  ref!: DynamicDialogRef;

  action = '';
  position = '';
  diaplayOutils = false;
  libeType = this.translate.instant('allDoc');

  namepiece = 'Nom de la piece jointe';
  droits: string[] = [];
  constructor(
    public dialogService: DialogService,
    private ts: TokenStorageService,
    public translate: TranslateService,
    private api: ApiService,
  ) { this.droits = this.ts.getRoles();
    this.fparam = new FindParam('ORG20180017050207.606.850', this.ts.getUser().username); }

  ngOnInit(): void {
    $(function () {
      $(".box").draggable();
    });
    this.documentList();
    this.liste();
    this.listGroupess();
  }

  documentList() {
    this.spinner = true;
    this.documents = [];
    this.docc = 0;
    this.selectedDocument = [];
    this.typeDocuments = [];
    this.items = [];
    this.itemsStatuts = [];
    this.statutDocuments = [];
    this.api.listDocument().subscribe(res => {
      console.log(res);
      this.documents = res;
      this.selectedDocument = res;
      this.docs = this.documents.length;
      this.docc = this.documents.length;
      this.api.listTypeDocument().subscribe(res => {
        this.typeDocuments = res;
        this.typs = this.typeDocuments.length;
        for (const ele of res) {
          this.items.push(Object.assign({}, { label: ele.libelleFr, icon: 'pi pi-bookmark-fill', command: () => { this.listDocumentByType(ele.typedocumentID); }, },))
        }
        this.api.listStatutDocument().subscribe(res => {
          this.statutDocuments = res;
          this.stats = this.statutDocuments.length;
          console.log(res);
          for (const ele of res) {
            this.itemsStatuts.push(Object.assign({}, { label: ele.libelleFr, icon: 'pi pi-bookmark-fill', command: () => { this.listDocumentByStatut(ele.statutdocumentID); }, },))
          }
        });
      });
      this.stat();
      this.spinner = false;
    }, error => {
      this.spinner = false;
    })
  }


  docc = 0;
  filterByType(type: string) {
    console.log(type);
    this.documents = [];
    for (const ele of this.documentsdebase) {
      if (ele.typedocumentID == type) {
        this.documents.push(Object.assign({}, ele));
        console.log(this.documentsdebase);
        console.log(this.documents);
        this.docc = this.docc + 1;
      }
    }
    console.log(this.documents);
    this.getTypeLibelle(type);
  }

  filterByStatut(statut: string) {
    console.log(statut);
    this.documents = [];
    for (const ele of this.documentsdebase) {
      if (ele.statutdocumentID == statut) {
        this.documents.push(Object.assign({}, ele));
        this.docc = this.docc + 1;
      }
    }
    console.log(this.documents);
  }

  getTypeLibelle(typedocumentID: string) {
    for (const ele of this.typeDocuments) {
      if (ele.typedocumentID == typedocumentID) {
        this.libeType = ele.libelleFr;
      }
    }
  }

  listDocumentByType(typedocumentID: string) {
    this.documents = [];
    this.api.listDocumentByType(typedocumentID).subscribe(res => {
      this.documents = res;
    });
  }
  listDocumentByStatut(statutdocumentID: string) {
    this.documents = [];
    this.api.listDocumentByStatut(statutdocumentID).subscribe(res => {
      this.documents = res;
    });
  }

  groupGlobalList: GroupeGlobal[] = [];
  fparam: any;
  users: User[] = [];

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

  liste() {
    this.users = [];
    this.api.listUsers('ORG20180017050207.606.850').subscribe(
      (res) => {
        this.users = res;
        console.log(this.users);
      },
      (error) => { console.log(error); this.spinner = false; }
    );
  }
  data: any;
  chartOptions: any;

  state: Stat = new Stat();
  stat() {
    this.api.listDocumentStat().subscribe((data) => {
      this.state = data[0];
      this.data = {
        labels: ['DOCUMENTS', 'TYPES', 'STATUTS'],
        datasets: [
          {
            data: [this.state.doc, this.state.typedoc, this.state.statdoc],
            backgroundColor: [
              "#42A5F5",
              "#66BB6A",
              "#FFA726"
            ],
            hoverBackgroundColor: [
              "#64B5F6",
              "#81C784",
              "#FFB74D"
            ]
          }
        ]
      };
    },
      (error) => {
        console.log(error);
      }
    );
    
  }

}
