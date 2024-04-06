import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from '../auth/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
})
export class AssistanceComponent implements OnInit {
  constructor(
    private api: ApiService,
    public translate: TranslateService,
    private router: Router,
    public tokenStorageService: TokenStorageService
  ) { }
  lang = 'fr';
  displayE = false;
  langue = this.translate.instant('fr');
  logoutDialog = false;
  dialogOnlineMode = false;

  changeLang(event: any) {
    this.translate.use(event);
  }
  ngOnInit(): void {
    this.translate.use('fr');
    this.api
      .roleListByUser(this.tokenStorageService.getUser().username)
      .subscribe(
        (res) => {
          this.droits = res;
        },
        (error) => {
          console.log(error.error);
        }
      );
  }
  droits: string[] = [];
  habilitation(code: string) {
    for (let role of this.droits) {
      if (role == code) {
        return true;
      }
    }
    return false;
  }

  retour() {
    window.history.back();
  }
  moduleDialog = false;
  module = '';
  module2 = '';
  getModule(module: string) {
    this.module2 = module;
    this.module = this.translate.instant(module);
    this.moduleDialog = true;
    this.src = 'assets/icons/' + module + '.png'
  }

  src = '';

  logOut() {
    this.logoutDialog = true;
  }

  logout(): void {
    this.deconnexion();
  }
  deconnexion() {
    return this.api
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
      );
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
}
