import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { TokenStorageService } from '../auth/_services/token-storage.service';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../class/user';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfigService } from '../services/config.service';
import $ from 'jquery';
import 'jqueryui';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit {
  user: User = new User();
  droits: string[] = [];
  dialogOnlineMode = false;
  dialogConfirmSynch = false;
  dialogConfirm = false;
  dialogTabItemsToSynch = false;
  onlineMode = false;

  displaySpinnerSynchData = false;
  displaySpinnerResearchData = false;

  messageSynch = '';
  messageSynchSpinner = '';
  lang = 'fr';
  parametre = '';
  globalDash = 'home/globalDash';
  accueil = '';
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
    public appConfigService: ConfigService,
    private route: ActivatedRoute
  ) {
    this.droits = this.tokenStorageService.getRoles();

    (window as any).pdfWorkerSrc = '/assets/js/pdf.worker.min.js';
  }
  habilitation(code: string) {
    for (let role of this.droits) {
      if (role == code) {
        return true;
      }
    }
    return false;
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


  ping() {
    this.api.ping().subscribe(
      (data) => {
        this.getdd();
      },
      (error: any) => {
        this.color = 'rgb(255, 34, 0)';
        this.messageSynch = this.translate.instant("Pas d'acces au serveur distant");
        this.errorDialog = true;
      }
    );
  }
  synchronise() {
    this.displaySpinnerSynchData = true;
    setTimeout(async () => {
      this.api.synchronise(this.tabItemsToSend).subscribe((data) => {
        console.log(data);
        this.api.synchroniseUpdate(data).subscribe((data2) => { });
        this.displaySpinnerSynchData = false;
        this.dialogConfirmSynch = true;
      },
        (error: any) => {
          this.color = 'rgb(255, 34, 0)';
          this.messageSynch = this.translate.instant('errorToSynch');
          this.errorDialog = true;
        });
    }, 5000);
  }

  getdd() {
    this.messageSynchSpinner = this.translate.instant('searchSyn');
    this.displaySpinnerResearchData = true;
    setTimeout(async () => {
      this.displaySpinnerResearchData = false;
    }, 5000);
  }
  ngOnInit(): void {
    $(function() {
      $( ".box" ).draggable();
    });
    this.load();
    console.log(this.tokenStorageService.getActiveLang());
    this.user = this.tokenStorageService.getUser();
    this.translate.use(this.tokenStorageService.getActiveLang());
    this.api
      .roleListByUser(this.tokenStorageService.getUser().username)
      .subscribe(
        (res) => {
          this.droits = res;
          console.log(this.droits);
        },
        (error) => {
          console.log(error.error);
        }
      );
    console.log(this.droits);
  }
  async changeLang(event: any) {
    this.spinner = true;
    setTimeout(async () => {
      this.translate.use(event);
      this.toggleLang(event);
      this.spinner = false;
    }, 3000);
  }

  toggleLang(val: string) {
    this.tokenStorageService.saveActiveLang(val);
  }
  spinner = false;
  async load() {
    this.spinner = true;
    setTimeout(async () => {
      this.spinner = false;
    }, 1000);
  }


  getModule(accueil: string) {
    this.tokenStorageService.saveModule(accueil);
    this.router.navigate(['home/', { accueil: accueil },]);
  }
  reloadPage(): void {
    window.location.reload();
  }
  getProfil(): void {
    this.router.navigate(['homer/profil']);
  }

  getGlobalDashbord() {
    this.router.navigate(['homer/globalDash']);
  }

  goToLogin() {
    this.router.navigate(['']);
  }
  logoutDialog = false;
  displayE = false;
  logOut() {
    this.logoutDialog = true;
  }

  logout(): void {
    this.deconnexion();
  }

  deconnexion() {
    this.tokenStorageService.signOut();
    this.router.navigate(['']);
   /*  return this.api
      .userLogout(this.tokenStorageService.getUser().username)
      .subscribe(
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
  stateOptions: any[] = [
    { label: 'Fr', value: 'fr' },
    { label: 'En', value: 'en' }
  ];
  languer: string = '';
  swithLang(lang: string) {
    this.translate.use(lang);
  }
}
