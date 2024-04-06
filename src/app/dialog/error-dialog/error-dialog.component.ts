import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {


  errorMessage = ''
  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef) { }


  ngOnInit(): void {
    this.errorMessage = this.config.data.msg
  }

  close(): void {
    this.ref.close()
   }
}
