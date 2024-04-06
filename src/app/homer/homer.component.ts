import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../auth/_services/token-storage.service';
import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-homer',
  templateUrl: './homer.component.html',
  styleUrls: ['./homer.component.scss'],
})
export class HomerComponent implements OnInit {
  lang = 'fr';
  displayE = false;
  langue = this.translate.instant('fr');
  logoutDialog = false;
  droits: string[] = [];
  dialogOnlineMode = false;
  displaySpinnerSynchData = false;
  displaySpinnerResearchData = false;
  dialogConfirm = false;

  mouf = 0;
  accueil = 0;
  parametre = '';
  parametre2 = '';

  langues: any[] = [];
  constructor(
    private api: ApiService,
    public translate: TranslateService,
    private router: Router,
    public appConfigService: ConfigService,
    public tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.droits = this.tokenStorageService.getRoles();
  }

  ngOnInit(): void {
    this.langues = [
      { label: this.translate.instant('francais'), command: () => { this.changeLang('fr'); }, },
      { label: this.translate.instant('anglais'), command: () => { this.changeLang('en'); }, },
    ];
    this.droits = this.tokenStorageService.getRoles();

    this.translate.use('fr');
    this.droits = this.tokenStorageService.getRoles();
    this.status = this.tokenStorageService.getActiveItem();
    this.parametre = this.route.snapshot.params['parametre'];
    this.accueil = this.route.snapshot.params['accueil'] as number;
  }
  status: any = '';
  toggleStatus(val: string) {
    this.status = val;
    this.tokenStorageService.saveActiveItem(val);
  }

  getNiveauLocalite(level: string) { this.router.navigate(['home/' + level]); }
  getTypePep(level: string) { this.router.navigate(['home/plantation', { typePep: level, },]); }

  //#region maregion
  getModule(parametre: string, accueil: number) {
    this.parametre = parametre;
    this.accueil = accueil;
    this.router.navigate([
      'home/',
      { parametre: this.parametre, accueil: this.accueil },
    ]);
  }
  //#endregion

  getGlobalDashbord() {
    this.router.navigate(['homer/globalDash']);
  }

  getRoute(route: string) {
    this.router.navigate(['home/' + route]);
  }

  changeLang(event: any) {
    this.translate.use(event);
  }

  logOut() {
    this.logoutDialog = true;
  }

  logout(): void {
    this.deconnexion();
  }
  deconnexion() {
    this.tokenStorageService.signOut();
    this.router.navigate(['']);
   /*  return this.api.userLogout(this.tokenStorageService.getUser().username).subscribe(
      (data) => {
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
  habilitation(code: string) {
    for (let role of this.droits) {
      if (role == code) {
        return true;
      }
    }
    return false;
  }
  message = '';
  showDialogError(message: string) {
    this.message = message;
    this.displayE = true;
  }

  close() {
    this.logoutDialog = false;
  }
  closeSync() {
    this.dialogOnlineMode = false;
  }
  stopDialog = false;
  stop() {
    this.displaySpinnerSynchData = false;
    this.messageSynch = this.translate.instant('stopMsg');
    this.stopDialog = true;
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


  confirmSynch() {
    this.messageSynch = this.translate.instant('confirmSynch');
    this.dialogTabItemsToSynch = false;
    this.dialogConfirm = true;
  }

  getConnect() {
    if (this.appConfigService.getConfig().serverIP != this.appConfigService.getConfig().serverDistantIP) {
      /* this.ping(); */
      this.getdd();
    } else {
      this.messageSynch = this.translate.instant('Vous etes déjà sur le serveur principale');
      this.onLocalDialog = true;
    }
  }
  async synchroniser() {
    console.log(this.tabItemsToSend);
    this.dialogConfirm = false;
    this.synchronise();
  }
  messageTentative = '';
  displaySpinnerTentative = false;
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
  onLocalDialog = false;
  tabItemsToSend = [];
  color = '';
  errorDialog = false;
  messageSynch = '';
  messageSynchSpinner = '';
  dialogConfirmSynch = false;
  dialogTabItemsToSynch = false;

  goBack(): void {
    this.mouf = 0;
    this.location.back();
  }
}
