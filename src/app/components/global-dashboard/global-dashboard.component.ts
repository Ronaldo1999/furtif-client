import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-global-dashboard',
  templateUrl: './global-dashboard.component.html',
  styleUrls: ['./global-dashboard.component.scss']
})
export class GlobalDashboardComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  quitter() {
    this.router.navigate(['home/accueil']);
  }

}
