import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { Client, GroupeClient } from 'src/app/class/client.model';
import { ClientDialogComponent } from 'src/app/dialog/client-dialog/client-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from 'src/app/dialog/success-dialog/success-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];
  categories: any[] = [
    { id: 1, libelle: 'Entreprise' },
    { id: 2, libelle: 'Particulier' },
  ];
  items: MenuItem[] = [];
  displayModal = false;
  selectedClients: Client[] = [];
  spinner = false;
  ref!: DynamicDialogRef;
  constructor(
    public dialogService: DialogService,
    private ts: TokenStorageService,
    public gs: GlobalService,
    public translate: TranslateService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.clientList();
    this.listGroupeClent();
    this.items = [
      { label: 'Update', icon: 'pi pi-refresh', command: () => { }, },
      { label: 'Delete', icon: 'pi pi-times', command: () => { }, },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] }
    ];
  }

  loadAll() {
    this.spinner = true;
  }

  clientList() {
    this.spinner = true;
    this.clients = [];
    this.api.listClient().subscribe(res => {
      this.clients = res;
      this.spinner = false;
    }, error => {
      this.spinner = false;
    })
  }
  listGroupeClent() {
    this.groupesClients = [];
    this.api.listGroupeClent().subscribe(res => {
      this.groupesClients = res;
    });
  }

  create() {
    this.action = 'new';
    this.client = new Client();
    this.client.contact = '(+237) '
    this.displayModal = true;
    /* this.createClientDialog('new'); */
  }

  close() {
    this.displayModal = false;
  }

  client: Client = new Client();
  groupesClients: GroupeClient[] = [];
  action = '';
  get(client: Client, action: string) {
    this.action = action;
    this.client = client;
    this.displayModal = true;
  }
  param(client: Client, position: string) {
    /* this.action = action; */
    this.position = position;
    this.client = client;
    this.diaplayOutils = true;
  }

  position = '';
  diaplayOutils = false;
  showPositionDialog(position: string) {
    this.position = position;
    this.diaplayOutils = true;
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
  createClientDialog(action: string, client?: Client) {
    this.ref = this.dialogService.open(ClientDialogComponent, {
      header: this.translate.instant(action + 'Client'),
      width: '50vw',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: false,
      resizable: true,
      draggable: true,
      data: { client: client, action: action }
    });

    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.save(data);
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
  delete(operation: string, client?: Client) {
    if (client) {
      this.selectedClients.push(Object.assign({}, client));
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
        this.api.deleteClient(this.selectedClients).subscribe(res => {
          this.showSuccesDialog('succes supression');
          this.clientList();
        })
      }
    });
  }

  save(client: Client) {
    this.spinner = true;
    client.user_update = this.ts.getUser().username;
    client.ip_update = '127.0.0.1';
    console.log(client);
    if (!client.clientID) {
      this.api.createClient(client).subscribe(data => {
        console.log(data);
        this.spinner = false;
        this.displayModal = false;
        this.clientList();
        this.showSuccesDialog('sucessCreateClient');
      })
    } else {
      this.api.createClient(client).subscribe(data => {
        console.log(data);
        this.spinner = false;
        this.displayModal = false;
        this.clientList();
        this.showSuccesDialog('sucessUpdateClient');
      })
    }

  }

  public countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    },
    {
      id: 13,
      name: 'Switzerland1',
    },
    {
      id: 14,
      name: 'Switzerland2',
    },
    {
      id: 15,
      name: 'Switzerland3',
    },
    {
      id: 16,
      name: 'Switzerland4',
    },
    {
      id: 17,
      name: 'Switzerland5',
    },
    {
      id: 18,
      name: 'Switzerland6',
    },
    {
      id: 19,
      name: 'Switzerland7',
    },
    {
      id: 20,
      name: 'Switzerland8',
    },
  ];
  keyword = 'name';
  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

}
