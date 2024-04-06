import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../auth/_services/token-storage.service';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ApiService } from '../services/api.service';
import * as $ from 'jquery';
import { User } from '../class/user';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../services/config.service';
import { Location } from '@angular/common';


declare function maFonction(): any;
//declare function newBouton() :any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss', './main.component.css'],
})
export class MainComponent implements OnInit {
  droits: string[] = [];
  user: any;
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    public primeNGConfig: PrimeNGConfig,
    public translate: TranslateService,
    private api: ApiService,
    public appConfigService: ConfigService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.droits = this.tokenStorageService.getRoles();
    this.user = this.tokenStorageService.getUser();
    (window as any).pdfWorkerSrc = '/assets/js/pdf.worker.min.js';

    this.router.events.subscribe((res) => {
      if (this.route.snapshot.params['accueil']) {
        this.accueil = this.route.snapshot.params['accueil'];
        this.libelleModule = this.translate.instant(this.accueil);
        this.src = 'assets/icons/' + this.accueil + '.png';
      }
    });
  }

  accueil = '';
  accueilcache = '';
  mouf = 0;
  parametre = '';
  parametre2 = '';

  status: any = '';
  toggleStatus(val: string) {
    this.status = val;
    this.tokenStorageService.saveActiveItem(val);
  }
  toggleLang(val: string) {
    this.lang = val;
    this.libelleModule = this.translate.instant(this.accueil);
    this.tokenStorageService.saveActiveLang(val);
  }
  src = '';
  module = '';
  inline = false;
  libelleModule = '';
  langue = '';

  ngOnInit(): void {
    console.log(this.tokenStorageService.getActiveLang());
    console.log(this.tokenStorageService.getCurrentModule());
    this.module = this.tokenStorageService.getCurrentModule();
    this.translate.use(this.tokenStorageService.getActiveLang());
    if (this.tokenStorageService.getActiveLang() == 'fr') {
      this.langu = this.translate.instant('een');
    } else {
      this.langu = this.translate.instant('efr');
    }

    maFonction();

    this.itemsMenu = [
      { label: 'New', icon: 'pi pi-fw pi-plus' },
      { label: 'Open', icon: 'pi pi-fw pi-download' },
      { label: 'Undo', icon: 'pi pi-fw pi-refresh' }
    ];
    this.langues = [
      { label: this.translate.instant('francais'), command: () => { this.changeLang('fr'); }, },
      { label: this.translate.instant('anglais'), command: () => { this.changeLang('en'); }, },
    ];

    this.user = this.tokenStorageService.getUser();

    this.droits = this.tokenStorageService.getRoles();

    this.status = this.tokenStorageService.getActiveItem();

    this.accueil = this.route.snapshot.params['accueil'];
    this.libelleModule = this.translate.instant(this.accueil);
    this.src = 'assets/icons/' + this.accueil + '.png';
    this.mouf = 0;

    this.dockBasicItems = [
      { label: 'mod1', icon: "assets/icons/mod1.png", command: () => { this.getModule('mod1'); } },
      { label: 'mod2', icon: "assets/icons/mod2.png", command: () => { this.getModule('mod2'); } },
      /*"assets/icons/home.png", command: () => { this.router.navigate(['/homer/accueil']); } }, */
      { label: 'mod4', icon: "assets/icons/mod4.png", command: () => { this.getModule('mod4'); } },
      { label: 'mod5', icon: "assets/icons/mod5.png", command: () => { this.getModule('mod5'); } },
      { label: 'mod6', icon: "assets/icons/mod6.png", command: () => { this.getModule('mod6'); } },
      { label: 'mod7', icon: "assets/icons/mod7.png", command: () => { this.getModule('mod7'); } },
      { label: 'mod8', icon: "assets/icons/mod8.png", command: () => { this.getModule('mod8'); } },
      { label: 'mod9', icon: "assets/icons/mod9.png", command: () => { this.getModule('mod9'); } },
      { label: 'mod10', icon: "assets/icons/mod10.png", command: () => { this.getModule('mod10'); } },
      { label: 'mod11', icon: "assets/icons/mod11.png", command: () => { this.getModule('mod11'); } },
      { label: 'mod12', icon: "assets/icons/mod12.png", command: () => { this.getModule('mod12'); } },

    ];
  }

  back() {
    this.accueil = this.accueilcache;
    this.mouf = 0;
    this.router.navigate(['home/', { accueil: this.accueil },]);
  }
  getModule(module: string) {
    this.tokenStorageService.saveModule(module);
    this.module = module;
    this.mouf = 0;
    this.router.navigate(['home/', { accueil: this.module },]);
  }
  langues: any[] = [];
  navigation: any[] = [];
  spinner = false;
  itemsMenu: MenuItem[] = [];
  dockBasicItems: MenuItem[] = [];

  langu = '';
  changLg() {
    if (this.tokenStorageService.getActiveLang() == 'fr') {
      this.langu = this.translate.instant('efr');
      this.changeLang('en');
    } else {
      this.langu = this.translate.instant('een');
      this.changeLang('fr');
    }
  }
  changeLang(event: any) {
    this.translate.use(event);
    this.toggleLang(event);
  }
  /** chargement des habilitations et vérification */
  habilitation(code: string) { for (let role of this.droits) { if (role == code) { return true; } } return false; }

  getGlobalDashbord() { this.router.navigate(['homer/globalDash']); }
  getDashboardByModule(type: string) { this.router.navigate(['home/tabBoard', { mode: type, },]); }


  getNiveauLocalite(level: string) { this.router.navigate(['home/' + level]); }
  getTypePep(level: string) { this.router.navigate(['home/plantation', { typePep: level, },]); }
  getRoute(route: string) { this.router.navigate(['home/' + route]); }


  getUsersByType(type: string) { if (type == 'attrib-localite') { this.router.navigate(['home/attrib-localite']); } else { this.router.navigate(['home/users', { typeUser: type, },]); } }

  logoutDialog = false;
  displayE = false;
  message = '';
  logOut() { this.logoutDialog = true; }

  logout(): void { this.deconnexion(); }

  deconnexion() {
    this.tokenStorageService.signOut();
    this.router.navigate(['']);
    /* return this.api
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
  showDialogError(message: string) {
    this.message = message;
    this.displayE = true;
  }
  close() {
    this.logoutDialog = false;
  }

  color = '';

  errorDialog = false;
  confirmSynch() {
    this.messageSynch = this.translate.instant('confirmSynch');
    this.dialogTabItemsToSynch = false;
    this.dialogConfirm = true;
  }
  closeNon() {
    this.dialogConfirm = false;
    this.router.navigate(['/homer/accueil']);
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
        this.messageSynch = this.translate.instant("Pas d'acces au serveur distant");
        this.displaySpinnerTentative = false;
        this.errorDialog = true;
      }
    );
  }
  synchronise() {
    this.ping();
  }

  getConnect() {
    if (this.appConfigService.getConfig().serverIP != this.appConfigService.getConfig().serverDistantIP) {
      this.inline = false;
    } else {
      this.inline = true;
      this.messageSynch = this.translate.instant('Vous etes déjà sur le serveur principale');
      this.onLocalDialog = true;
    }
  }


  stopDialog = false;
  stop() {
    this.displaySpinnerSynchData = false;
    this.messageSynch = this.translate.instant('stopMsg');
    this.stopDialog = true;
  }
  messageSynch = '';
  messageSynchSpinner = '';
  lang = 'fr';
  globalDash = 'home/globalDash';
  tabItemsToSend = [];
  onLocalDialog = false;
  dialogOnlineMode = false;
  dialogConfirmSynch = false;
  dialogConfirm = false;
  dialogTabItemsToSynch = false;
  onlineMode = false;

  displaySpinnerSynchData = false;
  displaySpinnerResearchData = false;

  defineDescription(libelle: any): string {
    return libelle.slice(0, 10);
  }

  verifyLength(valeur: any) {
    let val = '' + valeur;
    if (val.toString().length >= 11) {
      return true;
    }
    return false;
  }

  getModuleImg(code: string) {
    return 'assets/icons/modules/' + code + '.png';
  }

  goBack(): void {
    this.mouf = 0;
    this.location.back();
  }
}
