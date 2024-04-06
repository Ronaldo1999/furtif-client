import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/_services/token-storage.service';

@Component({
  selector: 'app-rep-indicateur',
  templateUrl: './rep-indicateur.component.html',
  styleUrls: ['./rep-indicateur.component.scss']
})
export class RepIndicateurComponent implements OnInit {
  droits: string[] = [];
  accueil = 0;
  constructor( private tokenStorageService: TokenStorageService,private router: Router,) {
    this.droits = this.tokenStorageService.getRoles();
  }

  ngOnInit(): void {
  }
  getModule(parametre: string, accueil: number) { this.accueil = accueil; this.router.navigate(['home/', { accueil: this.accueil },]); }

  habilitation(code: string) { for (let role of this.droits) { if (role == code) { return true; } } return false; }
}
