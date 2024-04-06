import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  errorMessage = ''
  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef) { }


  ngOnInit(): void {
    this.errorMessage = this.config.data.msg
  }

  close(): void {
    this.ref.close();
  }
  delete(): void {
    this.ref.close('delete');
  }

}
