import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { Client } from 'src/app/class/client.model';
import { Document, PetitDocument } from 'src/app/class/document.model';
import { Projet } from 'src/app/class/projet.model';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import print from 'print-js';
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import * as XLSX from 'xlsx';
import { Financement } from 'src/app/class/financement';


@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit {
  urlSafe: SafeResourceUrl | undefined;
  projets: Projet[] = [];
  selectedProjets: Projet[] = [];
  clients: Client[] = [];
  spinner = false;



  name = 'Angular';
  fileName: string = 'SheetJS.xlsx';
  data: any;
  headData: any // excel row header
  constructor(
    public dialogService: DialogService,
    private ts: TokenStorageService,
    public translate: TranslateService,
    public gs: GlobalService,
    private api: ApiService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl("");
    this.projetList();
    this.clientList();
  }

  refresh() {
    this.projetList();
    this.clientList();
  }
  clientList() {
    this.clients = [];
    this.api.listClient().subscribe(res => {
      console.log(res);
      this.clients = res;
    })
  }
  projetList() {
    this.spinner = true;
    this.projets = [];
    this.api.listProjet().subscribe(res => {
      console.log(res);
      this.projets = res;
      this.spinner = false;
    }, error => {
      console.log(error);
      this.spinner = false;
    })
  }
  listFinancement(projetID: string) {
    this.spinner = true;
    this.financements = [];
    this.api.listFinancement(projetID).subscribe(res => {
      console.log(res);
      this.financements = res;
      this.spinner = false;
    }, error => {
      console.log(error);
      this.spinner = false;
    })
  }

  listDoc: any[] = [];

  document: Document = new Document();

  position = '';
  diaplayOutils = false;
  displayModal = false;
  get(projet: Projet, action: string) {
    this.action = action;
    this.projet = { ...projet };
    this.displayModal = true;
    this.listFile(projet.projetID);
    this.listFinancement(projet.projetID);
  }
  getFinancement(financement: Financement, action: string) {
    this.action = action;
    this.financement = { ...financement };
    this.financementUpdateDialog = true;
/*     this.listFile(financement.projetID);
 */  }

  deleteFinancement(i: any) {
    this.financements.splice(i, 1);
  }
  param(projet: Projet, position: string) {
    this.position = position;
    this.projet = projet;
    this.diaplayOutils = true;
    this.listFile(projet.projetID);
  }
  close() {
    this.displayModal = false;
  }
  closeFin() {
    this.financementUpdateDialog = false;
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.diaplayOutils = true;
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
  delete(operation: string, projet?: Projet) {
    if (projet) {
      this.selectedProjets.push(Object.assign({}, projet));
    }
    this.ref = this.dialogService.open(DeleteDialogComponent, {
      width: '400px',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: true,
      resizable: true,
      data: { msg: this.translate.instant(operation) }
    });
    this.ref.onClose.subscribe((data) => {
      if (data == 'delete') {
        this.api.deleteProjet(this.selectedProjets).subscribe(res => {
          this.selectedProjets = [];
          this.showSuccesDialog('succes supression');
          this.refresh();
        })
      }
    });
  }
  action = '';
  projet: Projet = new Projet();
  create() {
    this.action = 'new';
    this.projet = new Projet();
    this.displayModal = true;
  }
  save(projet: Projet) {
    this.spinner = true;
    projet.user_update = this.ts.getUser().username;
    projet.ip_update = '127.0.0.1';
    console.log(projet);
    if (!projet.projetID) {
      this.api.createProjet(projet).subscribe(data => {
        console.log(data);
        this.spinner = false;
        this.displayModal = false;
        this.refresh();
        this.showSuccesDialog('sucessCreateProjet');
      })
    } else {
      this.api.createProjet(projet).subscribe(data => {
        console.log(data);
        this.spinner = false;
        this.displayModal = false;
        this.refresh();
        this.showSuccesDialog('sucessUpdateProjet');
      })
    }

  }
  saveFin(financement: Financement) {
    financement.user_update = this.ts.getUser().username;
    financement.ip_update = '127.0.0.1';
    console.log(financement);
    if (!financement.financementID) {
      financement.financementID = 'FIN' + this.financements.length + 1;
      this.financements.push(Object.assign({}, financement));
      this.financementUpdateDialog = false;
      console.log(this.financements);
    } else {
      for (const ele of this.financements) {
        if (ele.financementID == financement.financementID) {
          ele.financementID = financement.financementID;
          ele.projetID = financement.projetID;
          ele.activiteID = financement.activiteID;
          ele.provenance = financement.provenance;
          ele.ordonnateur = financement.ordonnateur;
          ele.montant = financement.montant;
          ele.description = financement.description;
          ele.parentID = financement.parentID;
          ele.last_update = financement.last_update;
          ele.user_update = financement.user_update;
          ele.created_at = financement.created_at;
          ele.created_by = financement.created_by;
          ele.ip_update = financement.ip_update;
        }
      }
      this.financements = [...this.financements];
      this.financementUpdateDialog = false;
    }

  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.file = file;
    }
  }
  file: any;
  filess: any[] = [];
  typeDoc: any[] = [];
  diaplayDoc = false;

  showDocList() {
    this.position = 'top';
    this.diaplayOutils = false;
    this.diaplayDoc = true;
  }
  backFact() {
    this.position = 'right';
    this.diaplayOutils = true;
    this.diaplayDoc = false;
  }
  docDialog = false;
  doc: PetitDocument = new PetitDocument();
  newDoc() {
    this.doc = new PetitDocument();
    this.position = 'top';
    this.docDialog = true;
  }

  listFile(id: string) {
    this.api.listFichier(id).subscribe(res => {
      this.filess = res;
    })
  }

  supprimeDoc(operation: string, idfile: string) {
    this.ref = this.dialogService.open(DeleteDialogComponent, {
      width: '400px',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: true,
      resizable: true,
      data: { msg: this.translate.instant(operation) }
    });
    this.ref.onClose.subscribe((data) => {
      if (data == 'delete') {
        this.api.deleteFichier(idfile).subscribe(res => {
          this.showSuccesDialog('succes supression');
          this.listFile(this.projet.projetID);
        })
      }
    }, error => {
      console.log(error);
      this.spinner = false;
      this.showErrorDialog('errorDelete');
    })
  }

  download(name: string): void {
    this.spinner = true;
    const encodedFilename = btoa(name);
    this.api.download(name).subscribe(
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
  downloadFor(name: string, userID: string): void {
    this.spinner = true;
    const encodedFilename = btoa(name);
    this.api.downloadFileOfAnProject(name, userID).subscribe(
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

  printPdf(url: string) {
    print({ printable: url, showModal: true });
  }

  typeFichier = '';
  typeFichierList: any[] = [
    { id: 1, libelleFr: 'CONTRAT' },
    { id: 2, libelleFr: 'PLAN ARCHITECHTURALE' },
    { id: 3, libelleFr: 'FACTURE' },
    { id: 4, libelleFr: 'AVENANT' },
  ]
  saveFile() {
    this.spinner = true;
    this.api.upload(this.file, this.projet.projetID, this.typeFichier).subscribe(data => {
      console.log(data);
      this.spinner = false;
      this.docDialog = false;
      this.listFile(this.projet.projetID);
    }, error => {
      console.log(error);
      this.spinner = false;
      this.showErrorDialog('errorSaveFile');
    })
  }

  printFiche(name: string) {
    this.spinner = true;
    this.api.download(name).subscribe((response) => {
      const file = new Blob([response], { type: 'application/json' });
      const fileURL = URL.createObjectURL(file);
      this.printPdf(fileURL);
      this.spinner = false;
    }, error => {
      console.log(error);
      this.spinner = false;
      this.showErrorDialog('errorLoadFile');
    })
  }



  onFileChange(name: string) {
    /* wire up file reader */
    this.api.download(name).subscribe((response) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const target: DataTransfer = <DataTransfer>(response as any);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, range: 10 }));
        console.log(this.data[1]);

        this.headData = this.data[0];
        this.data = this.data.slice(1); // remove first header record

        const ws2: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[1]];
        this.readDataSheet(ws2, 10);
      };
      reader.readAsBinaryString(target.files[0]);
      this.viewerDialog = true;
    });

  }

  private readDataSheet(ws: XLSX.WorkSheet, startRow: number) {
    /* save data */
    let datas = <any>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, range: startRow }));
    console.log(datas[1]);
    let headDatas = datas[0];
    datas = datas.slice(1); // remove first header record

    for (let i = 0; i < this.data.length; i++) {
      this.data[i][this.headData.length] = datas.filter((x: any) => x[12] == this.data[i][0])
    }
    console.log(this.data[1]);
  }

  viewerDialog = false;
  consultDoc() {

  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }




  /* ********************************************************** GEstion des financements ******************************* */
  financements: Financement[] = [];
  financementUpdateDialog = false;
  financement: Financement = new Financement();
  createFinancement() {
    this.financement = new Financement();
    this.financement.projetID = this.projet.projetID;
    this.action = 'new';
    this.financementUpdateDialog = true;
  }
}
