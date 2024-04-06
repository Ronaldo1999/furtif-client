import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginActivateGuard } from './auth/_services/login-activate.guard';
import { UsersComponent } from './components/users/users.component';
import { FonctionaliteComponent } from './components/fonctionalite/fonctionalite.component';
import { GroupesComponent } from './components/groupes/groupes.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { AssistanceComponent } from './assistance/assistance.component';
import { AttenteComponent } from './attente/attente.component';
import { HomerComponent } from './homer/homer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GlobalDashboardComponent } from './components/global-dashboard/global-dashboard.component';
import { DocumentComponent } from './components/document/document.component';
import { ActiviteComponent } from './components/activite/activite.component';
import { ArbreCorComponent } from './components/arbre-cor/arbre-cor.component';
import { ArbreListComponent } from './components/arbre-list/arbre-list.component';
import { ArbreComponent } from './components/arbre/arbre.component';
import { ArticleComponent } from './components/article/article.component';
import { AxeStrategiqueComponent } from './components/axe-strategique/axe-strategique.component';
import { CanevaComponent } from './components/caneva/caneva.component';
import { ClientComponent } from './components/client/client.component';
import { MaterielComponent } from './components/materiel/materiel.component';
import { ProjetComponent } from './components/projet/projet.component';
import { RepIndicateurComponent } from './components/rep-indicateur/rep-indicateur.component';
import { TheChangeComponent } from './components/the-change/the-change.component';
import { TheorieChangementComponent } from './components/theorie-changement/theorie-changement.component';
import { LogipageComponent } from './logipage/logipage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';

const routes: Routes = [
  { path: 'home/...', component: HomeComponent },
  { path: 'homer/...', component: HomerComponent },
  { path: 'home...', component: HomeComponent },
  { path: 'homer...', component: HomerComponent },
  { path: 'users/...', component: UsersComponent },

  { path: '*path', redirectTo: 'accueil' },
  { path: 'login', component: LogipageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'aboutpage', component: AboutpageComponent },
  //{ path: '**', pathMatch: 'full', component: PagenotfoundComponent },
/*   { path: '**', redirectTo: '' },
 */  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginActivateGuard],
    children: [
   
      { path: 'users', component: UsersComponent },
      { path: 'groupes', component: GroupesComponent },
      { path: 'droits', component: FonctionaliteComponent },
      { path: 'sdocuments', component: DocumentComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'statistiques', component: GlobalDashboardComponent },

      { path: 'activite', component: ActiviteComponent },
      { path: 'client', component: ClientComponent },
     
      { path: 'gestMercuriale', component: ArticleComponent },
      { path: 'repIndicateur', component: RepIndicateurComponent },
      { path: 'arbreObjectif', component: ArbreListComponent },
      { path: 'arbreGraphic', component: ArbreComponent },
      { path: 'arbreGraphicCor', component: ArbreCorComponent },
      { path: 'caneva', component: CanevaComponent },
      { path: 'axeStrategique', component: AxeStrategiqueComponent },
      { path: 'theoChange', component: TheChangeComponent },
      { path: 'theoChange2', component: TheorieChangementComponent },
      { path: 'smateriel', component: MaterielComponent },
      { path: 'sprojet', component: ProjetComponent },
    
    ],
  },
  {
    path: 'homer',
    component: HomerComponent,
    canActivate: [LoginActivateGuard],
    children: [
      { path: 'assistance', component: AssistanceComponent },
      { path: 'accueil', component: AccueilComponent },
      { path: 'attente', component: AttenteComponent },
      { path: 'help', component: AssistanceComponent },
      { path: 'profil', component: ProfileUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
