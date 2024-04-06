import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/_services/token-storage.service';

const DELAI_INACTIVITE = 1 * 60 * 1000; // 15 minutes


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'furtif';

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  
    /* document.addEventListener('click', this.reinitialiserTimer());
    document.addEventListener('keydown', this.reinitialiserTimer()); */
  }


  timer: any;

  reinitialiserTimer(): any {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.deconnecterUtilisateur(), DELAI_INACTIVITE);
  }

  deconnecterUtilisateur(): any {
    this.router.navigate(['']);
  }


}
