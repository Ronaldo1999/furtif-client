import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ElementRef } from 'jsplumb';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { Document, HistoDocument, PartiePrenante, StatutDocument, TypeDocument } from 'src/app/class/document.model';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import $ from 'jquery';
import 'jqueryui';
import { FindParam } from 'src/app/class/findparam/find-param';

// declare var $: any;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

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

  namepiece = 'Nom de la piece jointe';
  fparam: any;
  droits: string[] = [];
  constructor(
    public dialogService: DialogService,
    private ts: TokenStorageService,
    public translate: TranslateService,
    private api: ApiService,
  ) { this.droits = this.ts.getRoles();
    this.fparam = new FindParam('ORG20180017050207.606.850', this.ts.getUser().username);}

  ngOnInit(): void {
    $(function () {
      $(".box").draggable();
    });
    this.documentList();
    this.listTypeDocument();
    this.listStatutDocument();
    this.listExpoit();
  }

  habilitation(code: string) { for (let role of this.droits) { if (role == code) { return true; } } return false; }

  action = '';
  position = '';
  diaplayOutils = false;
  libeType = this.translate.instant('allDoc');
  getTypeLibelle(typedocumentID: string) {
    for (const ele of this.typeDocuments) {
      if (ele.typedocumentID == typedocumentID) {
        this.libeType = ele.libelleFr;
      }
    }
  }

  listTypeDocument() {
    this.typeDocuments = [];
    this.items = [];
    this.api.listTypeDocument().subscribe(res => {
      this.typeDocuments = res;
      for (const ele of res) {
        this.items.push(Object.assign({}, { label: ele.libelleFr, icon: 'pi pi-bookmark-fill', command: () => { this.filterByType(ele.typedocumentID); }, },))
      }
    });
  }
  listStatutDocument() {
    this.itemsStatuts = [];
    this.statutDocuments = [];
    this.api.listStatutDocument().subscribe(res => {
      this.statutDocuments = res;
      console.log(res);
      for (const ele of res) {
        this.itemsStatuts.push(Object.assign({}, { label: ele.libelleFr, icon: 'pi pi-bookmark-fill', command: () => { this.filterByStatut(ele.statutdocumentID); }, },))
      }
    });
  }
  parametreDialog = false;
  getParametres() {
    this.parametreDialog = true;
  }
  filterByType(type: string) {
    this.documents = [];
    for (const ele of this.documentsdebase) {
      if (ele.typedocumentID == type) {
        this.documents.push(Object.assign({}, ele));
      }
    }
    this.getTypeLibelle(type);
  }
  filterByStatut(statut: string) {
    this.documents = [];
    for (const ele of this.documentsdebase) {
      if (ele.statutdocumentID == statut) {
        this.documents.push(Object.assign({}, ele));
      }
    }
  }

  close() {
    this.histDialog = false;
    this.displayModal = false;
    this.signataires = [];
    this.sign1 = new PartiePrenante();
    this.sign2 = new PartiePrenante();
  }
  actionType = '';
  closeType() {
    this.typeDialog = false;
  }
  create() {
    this.action = 'new';
    this.selectedFile = null;
    this.document = new Document();
    this.displayModal = true;
  }



  statusDialog = false;
  statusUpdateDialog = false;
  sendtojustice(document: Document, position: string, action: string) {
    this.histo = new HistoDocument();
    this.action = action;
    this.position = position;
    this.document = document;
    for(const ele of this.expoits){
      if(ele.documentID==document.documentID){
        this.histo = ele;
      }
    }
    this.statusDialog = true;
  }

  expoits: HistoDocument[] = [];
  listExpoit() {
    this.spinner = true;
    this.expoits = [];
    this.api.listExpoit().subscribe(res => {
      this.expoits = res;
      console.log(this.expoits);
      this.spinner = false;
      console.log(res);
    }, error => {
      this.spinner = false;
      this.showErrorDialog('errorServeur')
    })
  }
  signataires: PartiePrenante[] = [];
  sign1: PartiePrenante = new PartiePrenante();
  sign2: PartiePrenante = new PartiePrenante();
  get(document: Document, action: string) {
    this.action = action;
    this.document = { ...document };
    this.displayModal = true;
    if (document.partieprenante) {
      this.signataires = JSON.parse(document.partieprenante);
      this.sign1 = this.signataires[0];
      this.sign2 = this.signataires[1];
    }
    if (document.nomfichier) {
      this.selectedFile.name = document.nomfichier;
    }
  }

  getSignataires(document: Document) {
    let signataires = 'Aucun signataire';
    let tab: any[] = [];
    for (const ele of this.documentsdebase) {
      if (ele.documentID == document.documentID) {
        if (document.partieprenante) {
          tab = JSON.parse(document.partieprenante);
          signataires = tab[0].nom + ' & ' + tab[1].nom;
        } else {
          signataires = 'Aucun signataire';
        }
      }
    }
    return signataires;
  }

  getStatut(document: Document) {
    let statut: StatutDocument = new StatutDocument();
    for (const ele of this.statutDocuments) {
      if (document.statutdocumentID == ele.statutdocumentID) {
        statut = ele;
      }
    }
    return statut;
  }

  documentList() {
    this.spinner = true;
    this.libeType = this.translate.instant('allDoc');
    this.documents = [];
    this.documentsdebase = [];
    this.select = false;
    this.selectedDocument = [];
    this.api.listDocument().subscribe(res => {
      console.log(res);
      this.documents = res;
      this.documentsdebase = res;
      this.spinner = false;
    }, error => {
      this.spinner = false;
    })
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
        /* this.showErrorDialog('errorDelete'); */
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

  delete(operation: string, client?: Document) {
    if (client) {
      this.selectedDocument.push(Object.assign({}, client));
    }
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
        this.api.deleteDocument(this.selectedDocument).subscribe(res => {
          this.showSuccesDialog('succes supression');
          this.documentList();
        })
      }
    });
  }
  deleteType(operation: string, typeDoc?: TypeDocument) {
    if (typeDoc) {
      this.selectedTypeDocument.push(Object.assign({}, typeDoc));
    }
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
        this.api.deleteTypeDocument(this.selectedTypeDocument).subscribe(res => {
          this.listTypeDocument();
          this.showSuccesDialog('succes supression');
          this.documentList();
        })
      }
    });
  }
  deleteStatut(operation: string, statut?: StatutDocument) {
    if (statut) {
      this.selectedStatutDocument.push(Object.assign({}, statut));
    }
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
        this.api.deleteStatutDocument(this.selectedStatutDocument).subscribe(res => {
          this.listStatutDocument();
          this.showSuccesDialog('succes supression');
          this.documentList();
        })
      }
    });
  }
  deleteHisto(operation: string, statut?: HistoDocument) {
    if (statut) {
      this.selectedHistoDocument.push(Object.assign({}, statut));
    }
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
        this.api.deleteHistoDocument(this.selectedHistoDocument).subscribe(res => {
          this.listHisto();
          this.showSuccesDialog('succes supression');
          this.documentList();
        })
      }
    });
  }

  /* save(document: Document) {
    this.spinner = true;
    document.user_update = this.ts.getUser().username;
    document.ip_update = '127.0.0.1';
    this.signataires.push(Object.assign({}, this.sign1));
    this.signataires.push(Object.assign({}, this.sign2));
    document.partieprenante = JSON.stringify(this.signataires);
    console.log(document);
    if (!document.documentID) {
      this.api.uploadOnlyFile(this.selectedFile).subscribe(res => {
        console.log(res);
        this.api.createDocument(document).subscribe(data => {
          console.log(data);
          this.api.backMonFichier(data[0].documentID).subscribe(result => {
            console.log(result);
            this.spinner = false;
            this.displayModal = false;
            this.documentList();
            this.showSuccesDialog('sucessCreateDocument');
          })
        }, error => {
          this.spinner = false;
          this.showErrorDialog('errorCreateDocument')
        })
      })
    } else {
      this.api.uploadOnlyFile(this.selectedFile).subscribe(async (res: any) => {
        console.log(res);
        this.api.createDocument(document).subscribe(data => {
          console.log(res);
          this.api.backMonFichier(data[0].documentID).subscribe(result => {
            console.log(result);
            this.spinner = false;
            this.displayModal = false;
            this.documentList();
            this.showSuccesDialog('sucessUpdateDocument');
          })
        }, error => {
          this.spinner = false;
          this.showErrorDialog('errorUpdateDocument')
        })
      })
    }
  }
 */

  async save(document: Document) {
    this.spinner = true;
    document.user_update = this.ts.getUser().username;
    document.ip_update = '127.0.0.1';
    this.signataires.push(Object.assign({}, this.sign1));
    this.signataires.push(Object.assign({}, this.sign2));
    document.partieprenante = JSON.stringify(this.signataires);
    console.log(document);
    if (!document.documentID) {
      this.api.createDocument(document).subscribe(async (data: any) => {
        console.log(data);
       /*  if (data) {
          this.api.uploadOnlyFile(this.selectedFile).subscribe(res => {
            console.log(res);
          }, error => {
            this.spinner = false;
            console.log(error.text);
          })
          this.api.backMonFichier(data[0].documentID).subscribe(result => {
            console.log(result);
            this.spinner = false;
            this.displayModal = false;
            this.documentList();
            this.showSuccesDialog('sucessCreateDocument');
          }, error => {
            this.spinner = false;
          })
        } */
      }, error => {
        this.spinner = false;
        this.showErrorDialog('errorCreateDocument')
      })
    } else {
      this.api.createDocument(document).subscribe(async (data: any) => {
        console.log(data);
        if (data) {
         /*  this.api.uploadOnlyFile(this.selectedFile).subscribe(res => {
            console.log(res);
          }, error => {
            this.spinner = false;
            console.log(error.text);
          }) */
          this.api.backMonFichier(data[0].documentID).subscribe(result => {
            console.log(result);
            this.spinner = false;
            this.displayModal = false;
            this.documentList();
            this.showSuccesDialog('sucessUpdateDocument');
          }, error => {
            this.spinner = false;
          })
        }
      }, error => {
        this.spinner = false;
        this.showErrorDialog('errorUpdateDocument')
      })
    }
  }

  /* ***************************************************************** Les types de documents /***************************/
  typeDialog = false;
  createType() {
    this.actionType = 'new';
    this.typeDocument = new TypeDocument();
    this.typeDialog = true;
  }

  getType(type: TypeDocument, action: string) {
    this.actionType = action;
    this.typeDocument = { ...type };
    this.typeDialog = true;
  }

  saveType(type: TypeDocument) {
    this.spinner = true;
    type.user_update = this.ts.getUser().username;
    type.ip_update = '127.0.0.1';
    console.log(type);
    if (!type.typedocumentID) {
      this.api.createTypeDocument(type).subscribe(data => {
        console.log(data);
        this.spinner = false;
        this.typeDialog = false;
        this.listTypeDocument();
        this.showSuccesDialog('sucessCreateTypeDocument');
      }, error => {
        this.spinner = false;
        this.showErrorDialog('errorCreateTypeDocument')
      })
    } else {
      this.api.createTypeDocument(type).subscribe(data => {
        console.log(data);
        this.spinner = false;
        this.typeDialog = false;
        this.listTypeDocument();
        this.showSuccesDialog('sucessUpdateTypeDocument');
      }, error => {
        this.spinner = false;
        this.showErrorDialog('errorUpdateTypeDocument')
      })
    }

  }



  /* ***************************************************************** Les types de documents /***************************/

  createStatut() {
    this.actionType = 'new';
    this.statutDocument = new StatutDocument();
    this.statusUpdateDialog = true;
  }

  getStat(statut: StatutDocument, action: string) {
    this.actionType = action;
    this.statutDocument = { ...statut };
    this.statusUpdateDialog = true;
  }

  closeStatutList() {
    this.statusDialog = false;
    this.documentList();
  }

  saveStatut(statut: StatutDocument) {
    this.spinner = true;
    statut.user_update = this.ts.getUser().username;
    statut.ip_update = '127.0.0.1';
    console.log(statut);
    if (!statut.statutdocumentID) {
      this.api.createStatutDocument(statut).subscribe(data => {
        console.log(data);
        this.spinner = false;
        this.statusUpdateDialog = false;
        this.listStatutDocument();
        this.showSuccesDialog('sucessCreateStatutDocument');
      }, error => {
        this.spinner = false;
        this.showErrorDialog('errorCreateStatutDocument')
      })
    } else {
      this.api.createStatutDocument(statut).subscribe(data => {
        console.log(data);
        this.spinner = false;
        this.statusUpdateDialog = false;
        this.listStatutDocument();
        this.showSuccesDialog('sucessUpdateStatutDocument');
      }, error => {
        this.spinner = false;
        this.showErrorDialog('errorUpdateStatutDocument')
      })
    }

  }



  /* ***************************************************************** Histo documents /***************************/

  historiques: HistoDocument[] = [];
  histDialog = false;
  getHisto(document: Document) {
    this.spinner = true;
    this.position = 'right';
    this.api.listHistoDocumentByDocument(document.documentID).subscribe(data => {
      console.log(data);
      this.historiques = data;
      console.log(data);
      this.histDialog = true;
      this.spinner = false;
    }, error => {
      this.spinner = false;
      this.showErrorDialog('errorCreateHistoDocument')
    })
  }

  listHisto() {
    this.spinner = true;
    this.position = 'right';
    this.historiques = [];
    this.api.listHistoDocumentByDocument(this.document.documentID).subscribe(data => {
      console.log(data);
      this.historiques = data;
      console.log(data);
      this.spinner = false;
    }, error => {
      this.spinner = false;
      this.showErrorDialog('errorListHistoDocument')
    })
  }

  histo: HistoDocument = new HistoDocument();

  saveHisto() {
    this.spinner = true;
    this.histo.user_update = this.ts.getUser().username;
    this.histo.ip_update = '127.0.0.1';
    this.histo.documentID = this.document.documentID;
    console.log(this.histo);
    this.api.createHistoDocument(this.histo).subscribe(data => {
      console.log(data);
      this.spinner = false;
      this.statusDialog = false;
      this.documentList();
      this.showSuccesDialog('sucessCreateHistoDocument');
    }, error => {
      this.spinner = false;
      this.showErrorDialog('errorCreateHistoDocument')
    })

  }

  public files: File[] = [];
  onFileChange(pFileList: File[]) {
    this.files = Object.keys(pFileList).map((key: any) => pFileList[key]);
  }

  selectedFile: any;
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedFile = file;
    }
    console.log(this.selectedFile);
  }

  /* onUpload(documentID: string) {
    this.api.upload(this.selectedFile, documentID, '1').subscribe((res) => {
      console.log('bien entre');
    });
  } */

  deletePj() {
    this.selectedFile = null;
  }

  download(): void {
    console.log(this.document);
    this.spinner = true;
    const encodedFilename = btoa(this.document.nomfichier);
    this.api.download(this.document.nomfichier).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = atob(encodedFilename);
        link.click();
        window.URL.revokeObjectURL(url);
        this.spinner = false;
        this.showSuccesDialog('successDownload');
      }, error => {
        this.spinner = false;
        this.showErrorDialog('errorDownloadFile')
      });
  }

  onRowSelect(event: any) {
    this.select = true;
    if (this.selectedDocument.length == 1) {
      this.document = this.selectedDocument[0];
    }
  }
  onRowUnselect(event: any) {
    if (this.selectedDocument.length == 0) {
      this.select = false;
      this.selectedDocument = [];
    }
  }
  select = false;
  itemsMenu: MenuItem[] = [];
  onDropMenu() {
    this.itemsMenu = [];
    if (this.selectedDocument.length == 1) {
      this.itemsMenu = [
        { label: this.translate.instant('Consult'), visible: this.habilitation('DU010103'), icon: 'pi pi-eye', command: () => { this.get(this.document, 'view'); }, },
        { label: this.translate.instant('modifier'), visible: this.habilitation('DU010102'), icon: 'pi pi-pencil', command: () => { this.get(this.document, 'edit'); }, },
        { label: this.translate.instant('telecharger'), visible: this.habilitation('DU010101'), disabled: !this.document.nomfichier, icon: 'pi pi-download', command: () => { this.download(); }, },
        { separator: true },
        { label: this.translate.instant('supprimer'), visible: this.habilitation('DU010104'), icon: 'pi pi-trash', command: () => { this.delete('delDoc', this.document); }, },
      ];
    } else if (this.selectedDocument.length > 1) {
      this.itemsMenu = [
        { label: this.translate.instant('supprimer'), visible: this.habilitation('DU010104'), icon: 'pi pi-trash', command: () => { this.delete('delDocList'); }, },
      ];
    }
  }

  verifyLengthStatut(valeur: any) {
    let val = '' + valeur;
    if (val.toString().length >= 15) {
      return true;
    }
    return false;
  }

  defineDescriptionStatut(libelle: any): string {
    return libelle.slice(0, 14);
  }



}
