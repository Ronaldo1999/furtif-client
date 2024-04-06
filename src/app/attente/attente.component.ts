import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TokenStorageService } from '../auth/_services/token-storage.service';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { User } from '../class/user';
import { HistoDocument, Document } from '../class/document.model';
import { ErrorDialogComponent } from '../dialog/error-dialog/error-dialog.component';

@Component({
  selector: 'app-attente',
  templateUrl: './attente.component.html',
  styleUrls: ['./attente.component.scss'],
})
export class AttenteComponent implements OnInit {
  dialogOnlineMode = false;
  dialogConfirmSynch = false;
  dialogConfirm = false;
  dialogTabItemsToSynch = false;
  onlineMode = false;

  displaySpinnerSynchData = false;
  displaySpinnerResearchData = false;
  displaySpinnerTentative = false;

  messageSynch = '';
  messageSynchSpinner = '';
  messageTentative = '';
  lang = 'fr';
  parametre = '';
  globalDash = 'home/globalDash';
  accueil = 0;
  tabItemsToSend = [];
  langue = this.translate.instant('fr');
  onLocalDialog = false;

  constructor(
    private router: Router,
    public tokenStorageService: TokenStorageService,
    public primeNGConfig: PrimeNGConfig,
    private api: ApiService,
    public dialogService: DialogService,
    public translate: TranslateService,
    public appConfigService: ConfigService
  ) {
    this.user = this.tokenStorageService.getUser();
  }

  refresh() {
    this.listExpoit();
    this.documentList();
  }
  ngOnInit(): void {
    this.translate.use('fr');
    this.listExpoit();
    this.documentList();
    /*  this.userLoginAll(); */
    /* this.getGG(); */
  }

  documents: Document[] = [];
  documentList() {
    this.documents = [];
    this.api.listDocument().subscribe(res => {
      console.log(res);
      this.documents = res;
    });
  }

  libelleTypeDelai = ''
  typedelai = 1;
  checkTypeDelai(type: number) {
    this.typedelai = type;
  }

  spinner = false;
  expoits: HistoDocument[] = [];
  listExpoit() {
    this.spinner = true;
    this.expoits = [];
    this.api.listExpoit().subscribe(res => {
      this.expoits = res;
      this.spinner = false;
      console.log(res);
    }, error => {
      this.spinner = false;
      this.showErrorDialog('errorServeur')
    })
  }
  ref!: DynamicDialogRef;
  showErrorDialog(operation: string) {
    this.ref = this.dialogService.open(ErrorDialogComponent, {
      header: this.translate.instant('Erreur'),
      width: '300px',
      contentStyle: { "height": "auto", "overflow": "auto" },
      closable: true,
      data: { msg: this.translate.instant(operation) }
    });
  }
  color = '';

  errorDialog = false;
  confirmSynch() {
    this.messageSynch = this.translate.instant('confirmSynch');
    this.dialogTabItemsToSynch = false;
    this.dialogConfirm = true;
  }

  async synchroniser() {
    console.log(this.tabItemsToSend);
    this.dialogConfirm = false;
    this.synchronise();
  }

  fermerStop() {
    this.stopDialog = false;
    this.router.navigate(['/homer/accueil']);
  }
  closeNon() {
    this.dialogConfirm = false;
    this.router.navigate(['/homer/accueil']);
  }
  stopDialog = false;
  stop() {
    this.displaySpinnerSynchData = false;
    this.messageSynch = this.translate.instant('stopMsg');
    this.stopDialog = true;
  }

  confirm() {
    this.dialogConfirmSynch = false;
    this.router.navigate(['/homer/accueil']);
  }
  ping() {
    this.messageTentative = this.translate.instant('tryConnect');
    this.displaySpinnerTentative = true;
    this.api.ping().subscribe(
      (data) => {
        this.displaySpinnerSynchData = true;
        setTimeout(async () => {
          this.api.synchronise(this.tabItemsToSend).subscribe((data) => {
            console.log(data);
            this.api.synchroniseUpdate(data).subscribe((data2) => { });
            this.displaySpinnerSynchData = false;
            this.dialogConfirmSynch = true;
          });
        }, 5000);
      },
      (error: any) => {
        this.color = 'rgb(255, 34, 0)';
        this.messageSynch = this.translate.instant(
          "Pas d'acces au serveur distant"
        );
        this.displaySpinnerTentative = false;
        this.errorDialog = true;
      }
    );
  }
  synchronise() {
    this.ping();
  }

  getdd() {
    this.messageSynchSpinner = this.translate.instant('searchSyn');
    this.displaySpinnerResearchData = true;
    setTimeout(async () => {
      this.displaySpinnerResearchData = false;
    }, 5000);
  }
  fermer() {
    this.errorDialog = false;
    this.router.navigate(['/homer/accueil']);
  }
  fermer2() {
    this.onLocalDialog = false;
    this.router.navigate(['/homer/accueil']);
  }
  fermer3() {
    this.dialogTabItemsToSynch = false;
    this.router.navigate(['/homer/accueil']);
  }
  conn = 1;
  user: User = new User();
  getGG() {
    console.log(this.user);
    if (this.appConfigService.getConfig().serverIP != this.appConfigService.getConfig().serverDistantIP) {
      this.ping();
    } else {
      this.messageSynch = this.translate.instant('Vous etes déjà sur le serveur principale');
      this.onLocalDialog = true;
    }
  }
  userLoginAll() {
    this.api.getUserDetail(this.tokenStorageService.getUser().username).subscribe((data) => {
      this.userT = data;
      if (data.connecter == 1) {
        if (this.appConfigService.getConfig().serverIP != this.appConfigService.getConfig().serverDistantIP) {
          this.ping();
        } else {
          this.messageSynch = this.translate.instant('Vous etes déjà sur le serveur principale');
          this.onLocalDialog = true;
        }
      } else {
        this.changePass();
      }
      console.log(data);
    });
  }

  changePassDialog = false;

  changePass() {
    this.changePassDialog = true;
  }
  newUser: User = new User();
  confirmPass = '';
  errorMessage = '';
  successDialog = false;
  displayError = false;
  errMessageLog = '';
  errDialogLog = false;
  userT: User = new User();
  confirmChangePass() {
    if (this.newUser.password == this.userT.password) {
      this.errorMessage = "Mauvais mot de passe";
      this.errMessageLog = "Veuillez entrer un mot de passe different de l'ancien svp !";
      this.displayError = true;
    } else {
      this.api.changePassword(this.userT.login, this.newUser.password).subscribe(
        (res) => { this.successDialog = true; },
        (error) => { this.errorDialog = true; }
      );
    }
  }

  changeLang(event: any) { this.translate.use(event); }

  getModule(parametre: string, accueil: number) {
    this.parametre = parametre;
    this.accueil = accueil;
    this.router.navigate(['home/', { parametre: this.parametre, accueil: this.accueil },]);
  }
  reloadPage(): void { window.location.reload(); }
  getProfil(): void { this.router.navigate(['home/profil']); }

  getGlobalDashbord() { this.router.navigate(['/globalDash']); }
  getvalidation() { this.router.navigate(['/home/vendeur']); }
  goToLogin() { this.router.navigate(['']); }
  logoutDialog = false;
  displayE = false;
  logOut() { this.logoutDialog = true; }

  logout(): void { this.deconnexion(); }

  deconnexion() {
    this.tokenStorageService.signOut();
    this.router.navigate(['']);
    /* return this.api.userLogout(this.tokenStorageService.getUser().username).subscribe((data) => {
      this.tokenStorageService.signOut();
      this.router.navigate(['']);
    },
      (error) => {
        console.log(error);
        this.showDialogError(error.error);
        this.close();
      }
    ); */
  }
  message = '';
  showDialogError(message: string) {
    this.message = message;
    this.displayE = true;
  }
  close() { this.logoutDialog = false; }
  closeSync() { this.dialogOnlineMode = false; }

  verifyLength(valeur: any) {
    let val = '' + valeur;
    if (val.toString().length >= 30) {
      return true;
    }
    return false;
  }

  defineDescription(libelle: any): string {
    return libelle.slice(0, 29);
  }


  // Fonction pour calculer la différence entre une date donnée et la date actuelle en mois, semaines, jours et heures
  differenceDates(dateTime: any) {
    let reult = '';
    console.log(dateTime);
    const date = new Date(dateTime.substring(0, 10));
    console.log(date);
    const dateActuelle = new Date();
    const difference = date.getTime() - dateActuelle.getTime();

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const millisecondsInHour = 1000 * 60 * 60;
    const millisecondsInWeek = millisecondsInDay * 7;
    const millisecondsInMonth = millisecondsInDay * 30.44; // Moyenne de jours dans un mois

    const mois = Math.floor(difference / millisecondsInMonth);
    const restMois = difference % millisecondsInMonth;

    const semaines = Math.floor(restMois / millisecondsInWeek);
    const restSemaines = restMois % millisecondsInWeek;

    const jours = Math.floor(restSemaines / millisecondsInDay);
    const restJours = restSemaines % millisecondsInDay;

    const heures = Math.floor(restJours / millisecondsInHour);
    console.log(`La différence entre la date donnée et la date actuelle est de : ${mois} mois, ${semaines} semaines, ${jours} jours et ${heures} heures.`);
    return `${mois} mois, ${semaines} semaines, ${jours} jours et ${heures} heures.`;
  }


}
