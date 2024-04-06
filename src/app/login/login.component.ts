import { Component, OnInit } from '@angular/core';
import Login from '../../assets/log/login.json';
import { Route, Router } from '@angular/router';

import { AuthService } from '../auth/_services/auth.service';
import { TokenStorageService } from '../auth/_services/token-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { User, UserLogin } from '../class/user';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  stateOptions: any[] = [];

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  lang: string = 'fr';
  value1: string = 'fr';

  libelleFr: string = Login.enteteFr;
  libelleEnglish: string = Login.enteteEn;
  urlImage: string = Login.image;
  slogan: string = Login.slogan;

  displaySpinner = false;
  spinner = false;
  user: User = new User();

  displayError = false;
  displaySucces = false;
  succesMessage: string = '';
  displayAffecter = false;
  displayAffecterPoste = false;
  ref!: DynamicDialogRef;
  organisations: any[] = [];

  constructor(
    public dialogService: DialogService,
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private http: HttpClient,
    public translate: TranslateService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.login();
    this.translate.use('fr');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.stateOptions = [
      { label: 'Français', value: 'fr' },
      { label: 'English', value: 'en' },
    ];
  }
  async login() {
    this.spinner = true;
    setTimeout(async () => {
      this.spinner = false;
    }, 2000);
  }

  userLogin(login: string) {
    console.log(login);
    this.api.userLogin(login).subscribe(data => { console.log(data); });
  }
  userLoginAll(user: User) {
    this.api.userLoginAll(user).subscribe((data) => {
      this.displaySpinner = false;

      this.userT = data;
      /*  if (this.userT.connecter == 0) {
         this.api.roleListByUser(user.login).subscribe(
           (res) => { this.tokenStorage.saveRole(res); },
           (error) => { console.log(error.error); }
         );
         console.log(this.tokenStorage.getUser().roles);
         this.router.navigate(['/homer/attente']);
       } else {
         this.changePass();
       } */
      console.log(data);
    });
  }
  roles2: any[] = [];

  userT: User = new User();
  users:User[] = [];
  onSubmit(): void {
    this.spinner = true;
    const { username, password } = this.form;
    let user = new User();
    user.login = username;
    user.password = password;
  

    /* Nouvelle connexion */
    this.api.login(user).subscribe(
      (res) => {
        console.log(res);
        this.users = res;
        if (res.length>0) {
          this.tokenStorage.saveUser(res[0]);
          this.api.roleListByUser(username).subscribe(
            (data) => {
              console.log(data);
              this.tokenStorage.saveRole(data);
              this.spinner = false;
              this.router.navigate(['/homer/attente']);
              // this.confirm = true;
            },
            (error) => { console.log(error.error); }
          );
        } else if (res.length==0) {
          this.spinner = false;
          this.confirm = true;
          this.errorMessage = 'Identifiants incorrects';
        }
      },
      (error) => {
        console.log(error.error);
        if (error.statusText == 'Unknown Error') {
          this.errorMessage = 'Impossible de joindre le serveur';
        } else if (error.error.error == 'Unauthorized') {
          this.errorMessage = 'Identifiants incorrects';
        } else {
          this.errorMessage = error.error;
        }
        this.spinner = false;
        this.isLoginFailed = true;
      }
    );

  }

  loginDialog = false;
  confirm = false;
  gotomenu(){
    this.router.navigate(['/homer/attente']);
  }
  close(){
    this.confirm = false;
  }
  reloadPage(): void {
    window.location.reload();
  }

  closeSucces() {
    this.displaySucces = false;
  }

  closeError() {
    this.displayError = false;
  }

  changePassDialog = false;

  changePass() {
    this.changePassDialog = true;
  }
  newUser: User = new User();
  confirmPass = '';

  successDialog = false;
  errorDialog = false;
  errMessageLog = '';
  errDialogLog = false;
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

}
