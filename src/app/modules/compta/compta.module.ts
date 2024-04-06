import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComptaRoutingModule } from './compta-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ConfigComponent } from './components/config/config.component';


@NgModule({
  declarations: [
    HomeComponent,
    ConfigComponent
  ],
  imports: [
    CommonModule,
    ComptaRoutingModule
  ]
})
export class ComptaModule { }
