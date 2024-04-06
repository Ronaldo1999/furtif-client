import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent implements OnInit {

  succesMessage = ''

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef) { }

  ngOnInit(): void { this.succesMessage = this.config.data.msg }
  closeSucces() { this.ref.close('ok') }

}