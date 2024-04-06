export class Droit {
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  pfnldroitID!: string;
  code!: string;
  libelleFr!: string;
  libelleUs!: string;
  organisationID!: string;
  description!: string;
  millesime!: string;
  moduleID!: string;
}
export class DroitUser {
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  pfnldroitID!: string;
  userID!: string;
  pfnldroituserID!: string;
  libelledroitFr!: string;
  libelledroitUs!: string;
  codedroit!: string;
}
export class Module {
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  moduleID!: string;
  libelleFr!: string;
  libelleUs!: string;
  numOrdre!: string;
  icon!: string;
  iconRoll!: string;
}
