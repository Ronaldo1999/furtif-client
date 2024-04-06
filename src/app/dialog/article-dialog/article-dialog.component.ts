import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';
import { FindParam } from 'src/app/class/find-param';
import { BcaArticle } from 'src/app/class/BcaArticle';
import { ApiService } from 'src/app/services/api.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent implements OnInit {

  article: BcaArticle = new BcaArticle();
  action = "";
  millesime = "";
  org = "";

  droits: any[] = [];

  username!: string
  fparam: any;
  libellOrg = "";
  insertion = false;
  date: any;
  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public api: ApiService,
    public route: ActivatedRoute,
    public router: Router,
    private tokenStorageService: TokenStorageService,
    public translate: TranslateService,
    public dialogService: DialogService
  ) {
    this.getOrganisation();
    this.droits = this.tokenStorageService.getRoles();
    this.username = this.tokenStorageService.getUser().username;
  }
  getOrganisation() { this.org = this.tokenStorageService.getOrganisation(); }

  ngOnInit(): void {
    registerLocaleData(es);

    this.initialize();
    this.date = new Date().toISOString().slice(0, 10);
  }

  initialize() {
    this.millesime = this.config.data.millesime;
    this.org = this.config.data.org;

    if (this.config.data.param != 'new') {
      console.log(this.config.data.article);
      this.article = this.config.data.article;
      this.action = this.config.data.param;
      this.article.user_update = this.tokenStorageService.getUser().username;
      if (!this.article.millesime) {
        this.article.millesime = this.config.data.millesime
      }
      console.log(this.article);
    } else {
      this.article = new BcaArticle();
      this.article.user_update = this.tokenStorageService.getUser().username;
      this.article.millesime = this.config.data.millesime;
      this.insertion = true;
      console.log("C'est une insertion");

    }
  }

  close() {
    console.log(this.article);
    this.ref.close()
  }

  habilitation(code: string) { for (let role of this.droits) { if (role == code) { return true; } } return false }

  save() {
    const article = this.article;
    console.log(article);
    this.ref.close(article)
  }
}
