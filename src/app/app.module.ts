import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeModule } from './shared/prime.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AccueilComponent } from './accueil/accueil.component';

import { GlobalService } from './services/global.service';
import { DialogService } from 'primeng/dynamicdialog';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';

import { FonctionaliteComponent } from './components/fonctionalite/fonctionalite.component';
import { GroupesComponent } from './components/groupes/groupes.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ConfigService } from './services/config.service';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { AssistanceComponent } from './assistance/assistance.component';
import { AttenteComponent } from './attente/attente.component';
import { HomerComponent } from './homer/homer.component';
import { TreeDragDropService } from 'primeng/api';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ActiviteComponent } from './components/activite/activite.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientComponent } from './components/client/client.component';
import { BudgetComponent } from './components/budget/budget.component';
import { ChantierComponent } from './components/chantier/chantier.component';
import { GlobalDashboardComponent } from './components/global-dashboard/global-dashboard.component';
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ClientDialogComponent } from './dialog/client-dialog/client-dialog.component';
import { CategorieClientDialogComponent } from './dialog/categorie-client-dialog/categorie-client-dialog.component';
import { ArticleComponent } from './components/article/article.component'
import { ArticleDialogComponent } from './dialog/article-dialog/article-dialog.component';
import { RepIndicateurComponent } from './components/rep-indicateur/rep-indicateur.component';
import { ArbreListComponent } from './components/arbre-list/arbre-list.component';
import { NodeService } from './components/the-change/node/node.service';
import { NodeServiceArbre } from './components/arbre/node.service';
import { ArbreComponent } from './components/arbre/arbre.component';
import { AxeStrategiqueComponent } from './components/axe-strategique/axe-strategique.component';
import { DialogComponent } from './components/the-change/dialog.component';
import { NodeBodyComponent } from './components/the-change/node-body/node-body.component';
import { DynamicNodeComponent } from './components/the-change/node/dynamic-node.component';
import { DynamicNode2Component } from './components/the-change/node/dynamic-node2.component';
import { NodeComponent } from './components/the-change/node/node.component';
import { TheChangeComponent } from './components/the-change/the-change.component';
import { TheorieChangementComponent } from './components/theorie-changement/theorie-changement.component';
import { NodesContainerComponent } from './components/theorie-changement/nodes-container.component';
import { NodesContainerComponentArbre } from './components/arbre/nodes-container.component';
import { NodesContainerComponentArbreCor } from './components/arbre-cor/nodes-container.component';
import { ArbreCorComponent } from './components/arbre-cor/arbre-cor.component';
import { CanevaComponent } from './components/caneva/caneva.component';
import { NodeServiceArbreCor } from './components/arbre-cor/node.service';
import { NodeService2 } from './components/theorie-changement/node.service';
import { MaterielComponent } from './components/materiel/materiel.component';
import { ProjetComponent } from './components/projet/projet.component';
import { DocumentComponent } from './components/document/document.component';
import { LogipageComponent } from './logipage/logipage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';

registerLocaleData(localeFr);



export function initConfig(appConfig: ConfigService) {
  return () => appConfig.loadConfig();
}

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,

    LoginComponent,
    MainComponent,
    AccueilComponent,
    UsersComponent,
    ProfileComponent,
    FonctionaliteComponent,
    GroupesComponent,
    ProfileUserComponent,
    AssistanceComponent,
    AttenteComponent,
    HomerComponent,
    PagenotfoundComponent,
    ActiviteComponent,
    DashboardComponent,
    ClientComponent,
    BudgetComponent,
    ChantierComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
    DeleteDialogComponent,
    GlobalDashboardComponent,
    ClientDialogComponent,
    CategorieClientDialogComponent,
    ArticleComponent,
    ArticleDialogComponent,
    RepIndicateurComponent,
    ArbreListComponent,

    DocumentComponent,


    TheorieChangementComponent,
    NodesContainerComponent,
    NodesContainerComponentArbre,
    NodesContainerComponentArbreCor,
    ArbreCorComponent, CanevaComponent,

    ArbreComponent, ArbreListComponent, DialogComponent,
    DynamicNodeComponent, DynamicNode2Component, TheChangeComponent, NodeComponent, AxeStrategiqueComponent,
    NodeBodyComponent, MaterielComponent, ProjetComponent, LogipageComponent, HomepageComponent, AboutpageComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PrimeModule,
    AutocompleteLibModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService],
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    GlobalService,
    DialogService,
    TreeDragDropService, NodeService, NodeService2, NodeServiceArbre, NodeServiceArbreCor,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
