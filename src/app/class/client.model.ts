export class Client {
  id!: number;
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  clientID!: string;
  identifiant!: string;
  nom!: string;
  contact!: string;
  ville!: string;
  telephone1!: string;
  telephone2!: string;
  pays!: string;
  fax!: string;
  email!: string;
  remiseEnCours!: number;
  groupeClientID!: string;
}
export class GroupeClient {
  id!: number;
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  groupeClientID!: string;
  libelleFr!: string;
}