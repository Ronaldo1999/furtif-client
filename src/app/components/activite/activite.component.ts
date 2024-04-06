import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.scss']
})
export class ActiviteComponent implements OnInit {

  products: any[] = [
    { id: 1, libelle: 'Programme 1', libelle1: 'Programme 1', libelle2: 'Programme 1' },
  ];

  programmes: any[] = [
    { id: 1, libelle: "Élaborer un plan d'affaires solide dès le départ", state: false },
    { id: 2, libelle: "Effectuer une étude de marché approfondie pour comprendre", state: false },
    { id: 3, libelle: "Mettre en place une structure organisationnelle efficace dès le début", state: false },
    { id: 4, libelle: "Établir un plan financier solide pour assurer la stabilité", state: false },
    { id: 5, libelle: "Mettre en œuvre une stratégie de marketing efficace. ", state: false },
    { id: 6, libelle: "Recruter et former une équipe compétente", state: false },
    { id: 7, libelle: "Trouver des partenaires et des fournisseurs fiables.", state: false },
    { id: 8, libelle: "Développer un produit ou service de qualité", state: false },
    { id: 9, libelle: "Établir une relation solide avec les clients.", state: false },
    { id: 10, libelle: "Surveiller et ajuster régulièrement les activités.", state: false },
  ];
  actions: any[] = [
    { id: 1, libelle: "Élaborer un plan d'affaires solide dès le départ", parentID: 1, state: false },
    { id: 2, libelle: "Effectuer une étude de marché approfondie pour comprendre", parentID: 1, state: false },
    { id: 3, libelle: "Mettre en place une structure organisationnelle efficace dès le début", parentID: 2, state: false },
    { id: 4, libelle: "Établir un plan financier solide pour assurer la stabilité", parentID: 3, state: false },
    { id: 5, libelle: "Mettre en œuvre une stratégie de marketing efficace. ", parentID: 4, state: false },
    { id: 6, libelle: "Recruter et former une équipe compétente", parentID: 5, state: false },
    { id: 7, libelle: "Trouver des partenaires et des fournisseurs fiables.", parentID: 1, state: false },
    { id: 8, libelle: "Développer un produit ou service de qualité", parentID: 6, state: false },
    { id: 9, libelle: "Établir une relation solide avec les clients.", parentID: 7, state: false },
    { id: 10, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 8, state: false },
    { id: 11, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 8, state: false },
    { id: 12, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 9, state: false },
    { id: 13, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 10, state: false },
  ]
  activites: any[] = [
    { id: 1, libelle: "Élaborer un plan d'affaires solide dès le départ", parentID: 1, state: false },
    { id: 2, libelle: "Effectuer une étude de marché approfondie pour comprendre", parentID: 1, state: false },
    { id: 3, libelle: "Mettre en place une structure organisationnelle efficace dès le début", parentID: 2, state: false },
    { id: 4, libelle: "Établir un plan financier solide pour assurer la stabilité", parentID: 3, state: false },
    { id: 5, libelle: "Mettre en œuvre une stratégie de marketing efficace. ", parentID: 4, state: false },
    { id: 6, libelle: "Recruter et former une équipe compétente", parentID: 5, state: false },
    { id: 7, libelle: "Trouver des partenaires et des fournisseurs fiables.", parentID: 1, state: false },
    { id: 8, libelle: "Développer un produit ou service de qualité", parentID: 6, state: false },
    { id: 9, libelle: "Établir une relation solide avec les clients.", parentID: 7 },
    { id: 10, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 8, state: false },
    { id: 11, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 8, state: false },
    { id: 12, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 9, state: false },
    { id: 13, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 10, state: false },
  ]
  taches: any[] = [
    { id: 1, libelle: "Élaborer un plan d'affaires solide dès le départ", parentID: 1, state: false },
    { id: 2, libelle: "Effectuer une étude de marché approfondie pour comprendre", parentID: 1, state: false },
    { id: 3, libelle: "Mettre en place une structure organisationnelle efficace dès le début", parentID: 2, state: false },
    { id: 4, libelle: "Établir un plan financier solide pour assurer la stabilité", parentID: 3, state: false },
    { id: 5, libelle: "Mettre en œuvre une stratégie de marketing efficace. ", parentID: 4, state: false },
    { id: 6, libelle: "Recruter et former une équipe compétente", parentID: 5, state: false },
    { id: 7, libelle: "Trouver des partenaires et des fournisseurs fiables.", parentID: 1, state: false },
    { id: 8, libelle: "Développer un produit ou service de qualité", parentID: 6, state: false },
    { id: 9, libelle: "Établir une relation solide avec les clients.", parentID: 7, state: false },
    { id: 10, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 8, state: false },
    { id: 11, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 8, state: false },
    { id: 12, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 9, state: false },
    { id: 13, libelle: "Surveiller et ajuster régulièrement les activités.", parentID: 10, state: false },
  ]
  constructor() { }

  listAction: any[] = [];
  listActivite: any[] = [];
  listTache: any[] = [];
  getMongo(id: number, niveau: number) {
    switch (niveau) {
      case 2:
        this.listAction = [];
        for (const ele of this.actions) {
          if (ele.parentID == id) {
            this.listAction.push(Object.assign({}, ele));
          }
        }
        break;
      case 3:
        this.listActivite = [];
        for (const ele of this.activites) {
          if (ele.parentID == id) {
            this.listActivite.push(Object.assign({}, ele));
          }
        }
        break;
      case 4:
        this.listTache = [];
        for (const ele of this.taches) {
          if (ele.parentID == id) {
            this.listTache.push(Object.assign({}, ele));
          }
        }
        break;


      default:
        break;
    }

  }

  ngOnInit(): void {
  }

  collapse(id: number, list: any[]) {
    for (const ele of list) {
      if (ele.id == id) {
        ele.state = !ele.state;
      }
    }
  }
}
