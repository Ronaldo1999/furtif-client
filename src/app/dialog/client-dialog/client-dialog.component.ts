import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Client, GroupeClient } from 'src/app/class/client.model';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {
  succesMessage = ''

  client: Client = new Client();
  groupesClients:GroupeClient[] = [];
  action = '';

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.succesMessage = this.config.data.msg;
    this.action = this.config.data.action;
    this.client = new Client();
    /* if (this.config.data.client) {
      this.client = this.config.data.client;
    } else {
      this.client = new Client();
    } */
    /* this.client = this.config.data.client; 17878720 */
  }
  closeSucces() { this.ref.close('ok') }

  save() {
    this.ref.close(this.client);
  }
  close() {
    this.ref.close();
  }

}
