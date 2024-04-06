import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { User } from '../class/user';
import { ApiService } from '../services/api.service';
import { UserGlobal } from '../class/userGlobal/user-global';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})
export class ProfileUserComponent implements OnInit {
  userGlobal: UserGlobal = new UserGlobal(new User(), []);

  constructor(
    public translate: TranslateService,
    private primengConfig: PrimeNGConfig,
    private api: ApiService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.userGlobalFind();
    this.primengConfig.ripple = true;
  }

  displayModal: boolean = false;

  showModalDialog() {
    this.displayModal = true;
  }

  closeDialog() {
    this.displayModal = false;
  }

  userGlobalFind() {
    let username = this.tokenStorageService.getUser().username;
    this.api.userGlobalFind(username, '').subscribe((data) => {
      console.log(data);

      this.userGlobal = data;
    });
  }

  userGlobalUpdate(user: UserGlobal, language: string) {
    this.api
      .userGlobalUpdateByUserConnected(user, language)
      .subscribe((data) => {
        this.userGlobalFind();
        this.closeDialog();
      });
  }
  retour() {
    window.history.back();
  }
  onSubmit() {
    console.log('test');
    this.userGlobalUpdate(this.userGlobal, '');
  }
  lang = 'fr';
  changeLang(event: any) {
    this.translate.use(event);
  }
  submitted = false;
  changeValide() {
    this.submitted = true;
  }

  passRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/;
  validerPass() {
    console.log(
      'pass is ' +
        (this.passRegex.test(this.userGlobal.user.password)
          ? 'correct'
          : 'incorrect')
    );
    return this.passRegex.test(this.userGlobal.user.password);
  }
}
