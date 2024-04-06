import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface DialogModel {
  title: string;
  questions: { name: '', type: '', color: '' };
}

@Component({
  selector: 'app-dialog',
  template: `
    <div class="modal-content flot-center" style="width:30vw; flot:center">
      <div class="modal-header">
        <h4>{{title}}</h4>
      </div>
      <div class="modal-body">
        <label>Libellé de l'élément</label>
        <input type="text" class="form-control" [(ngModel)]="questions['name']" name="name" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" (click)="close()">Annuler</button>
        <button type="button" class="btn btn-primary" (click)="apply()">Enregistrer</button>
      </div>
    </div>
  `
})
export class DialogComponent extends SimpleModalComponent<DialogModel, DialogModel['questions']> implements DialogModel {
  title: string = "";
  questions: { name: '', type: '', color: '' };
  constructor() {
    super();
    this.questions = { name: '', type: '', color: '' };
  }

  apply() {
    this.result = this.questions;
    this.close();
  }
}
