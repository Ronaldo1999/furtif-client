import {
  HttpClient, HttpEvent, HttpHeaders, HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UniteMesure } from '../class/unite-mesure';
import { CategorieUniteMesure } from '../class/categorie-unite-mesure';
import { User } from '../class/user';
import { Droit, DroitUser } from '../class/droit';
import { FindParam } from '../class/find-param';
import { ConfigService } from './config.service';
import { UpdateState } from '../class/update-state';
import { Profil } from '../class/profile';
import { Exercice } from '../class/exercice';
import { Client } from '../class/client.model';
import { BcaArticle } from '../class/BcaArticle';
import { TheorieChangement } from '../class/theorie-changement';
import { TheorieHypothese } from '../class/theorie-hypothese';
import { Arbre } from '../class/arbre';
import { Arbredetail } from '../class/arbre-detail';
import { ArbreNiveau } from '../class/arbre-niveau';
import { ArbreType } from '../class/arbre-type';
import { FactMandat } from '../class/fact-mandat';
import { ActiviteStrategique } from '../class/activite-strategique';
import { ActiviteTheorie } from '../class/activite-theorie';
import { AxeStrategique } from '../class/axe-strategique';
import { FactDecision } from '../class/gestFacture/fact-decision';
import { FactMission } from '../class/gestFacture/fact-mission';
import { Facture } from '../class/gestFacture/facture';
import { Indicateur } from '../class/indicateur.model';
import { Objectif } from '../class/objectif.model';
import { CadreLogiqueIndicateur } from '../class/cadreLogiqueIndicateur';
import { ObjectifTheorie } from '../class/objectif-theorie';
import { Hypothese } from '../class/hypothese';
import { Projet } from '../class/projet.model';
import { Groupe } from '../class/groupe/groupe';
import { GroupeGlobal } from '../class/groupeGlobal/groupe-global';
import { Role } from '../class/role/role';
import { UserGlobal } from '../class/userGlobal/user-global';
import { Caneva } from '../class/cscaneva/caneva';
import { CsCaneva } from '../class/cscaneva/cscaneva';
import { Document, HistoDocument, StatutDocument, TypeDocument } from 'src/app/class/document.model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  urlUserList = 'user/list/';
  urlUserInsert = 'furtif/users/insert';
  urlUserListAll = 'furtif/users/list';
  urlUserActive = 'furtif/users/setEtat';
  urlUserListByGroupe = 'furtif/users/list';

  urlListDroit = 'furtif/droits/listAll';

  urlListDroitByModule = 'furtif/droits/listByModule';
  urlListModules = 'furtif/droits/listModules';
  urlInsertDroit = 'furtif/droits/insert';
  urlDeleteDroit = 'furtif/droits/delete';
  urlRolesByUserData = 'role/listRoleByUserData';
  urlRolesByUserData2 = 'role/listRoleByUserAndOrg';

  urlCUniteList = 'furtif/uniteMesure/categorieList';
  urlCUniteInsert = 'furtif/uniteMesure/categorie/insert';
  urlCUniteDelete = 'furtif/uniteMesure/categorie/delete/';
  urlCUniteDeleteList = 'furtif/uniteMesure/categorie/deleteList';
  urlUniteList = 'furtif/uniteMesure/list';
  urlUniteInsert = 'furtif/uniteMesure/insert';
  urlUniteDelete = 'furtif/uniteMesure/delete/';
  urlUniteDeleteList = 'furtif/uniteMesure/deleteList';

  urlAttribuerDroitUser = 'furtif/droits/insert-droits';
  urlOrganisationList = 'organisation/list/';
  urlSystemList = 'systeme/list';
  urlModulesListByHabilitation = 'module/listByHabilitation/';
  urlGroupList = 'groupe/list/';
  urlGroupListByUser = 'groupe/list';
  urlGroupAllList = 'groupe/list';
  urlGroupInsert = 'groupe/insert';
  urlGroupUpdate = 'groupe/update';
  urlGroupUpdater = 'groupe/updater';
  urlGroupDelete = 'groupe/delete/';
  urlGroupAffecterUser = 'groupe/affecterUser';
  urlGroupAffecterRole = 'groupe/affecterRole';
  urlRolesListByModule = 'role/listRoleByModule/';
  urlRolesInsert = 'role/insert';
  urlRolesUpdate = 'role/update';
  urlRolesList = 'role/list';
  urlRolesDelete = 'role/delete/';
  urlRolesByGroupe = 'role/listRoleByGroupe/';
  urlUserGlobalUpdate = 'user/updateUserGlobal';
  urlUserGlobalFind = 'user/findUserGlobal/';
  urlUserGlobalInsert = 'user/insertGlobal';
  urlUserListDescendance = 'user/listDescendance/';
  urlUserGlobalByUserConnectedUpdate = 'user/updateUserGlobalByUserConnected';

  urlUserListUpdate = '';
  urlUserConnexion = 'user/connexion/';
  urlUserConnexion2 = 'user/connexion/';
  urlGetUser = 'user/getUser/';
  urlUserDelete = 'user/delete/';
  urlGetUserDet = 'user/getUserDet';
  urlConnect = 'user/connect/';
  urlRolesByUser = 'role/listRoleByUser/';
  urlLogin = '';
  urlUserDeconnexion = 'user/deconnexion/';
  urlCheckLvAssynch = '';
  urlPing = '';
  urlSynchronise = '';
  urlSynchroniseLocale = '';
  urlChangePassword = '';

  urlUpdateState = '';
  urlUpdateStates = '';
  urlCreateProfile = '';
  urlListProfile = '';
  urlDeleteProfile = '';
  urlExerciceList = '';

  urlUserListe = '';
  urlGroupeListe = '';
  urlLocaliteByLevel = '';


  /* New urls */

  /* Clients urls */
  urlListClient = '';
  urlListGroupeClent = '';
  urlInsertClient = '';
  urlDeleteClient = '';

  /* Document urls */
  urlListDocument = '';
  urlListDocumentStat = '';
  urlListDocumentByType = '';
  urlListDocumentByStatut = '';
  urlListBackMonFichier = '';
  urlInsertDocument = '';
  urlDeleteDocument = '';

  /* TypeDocument urls */
  urlListTypeDocument = '';
  urlInsertTypeDocument = '';
  urlDeleteTypeDocument = '';

  /* StatutDocument urls */
  urlListStatutDocument = '';
  urlInsertStatutDocument = '';
  urlDeleteStatutDocument = '';

  /* StatutDocument urls */
  urlListHistoDocument = '';
  urlListExpoitHistoDocument = '';
  urlListHistoDocumentByDocument = '';
  urlInsertHistoDocument = '';
  urlDeleteHistoDocument = '';

  urlFileUpload = '';
  urlFileDBUpload = '';
  urlFileDownload = '';
  urlFileDownloadFor = '';

  /* Clients urls */
  urlListProjet = '';
  urlListPeojetByClient = '';
  urlListFinancement = '';
  urlInsertProjet = '';
  urlDeleteProjet = '';

  /** Gestion des articles de la mercuriale par rub et srub */
  urlArticleListBySrID = 'facture/articleListBySr';
  urlRubriqueList = 'facture/listRubrique';
  urlSRubriqueList = 'facture/listSRubrique';
  urlArticleCreate = 'facture/insertArticle';
  urlArticleUpdate = 'facture/updateArticle';
  urlArticleList = 'facture/articleList';


  urlTheorieList = '';
  urlTheorieCreate = '';
  urlTheorieUpdate = '';
  urlTheorieDelete = '';
  urlTheorieHypotheseCreate = '';
  urlTheorieHypotheseDelete = '';
  urlTheorieHypotheseList = '';
  urlTheorieFind = '';


  /* Les arbres */
  urlArbreCreate = '';
  urlArbreList = '';
  urlTypeList = '';
  urlArbreDetailCreate = '';
  urlArbreTypeCreate = '';
  urlArbreNiveauCreate = '';
  urlArbreDetailList = '';
  urlArbreNiveau = '';
  urlArbreDelete = '';
  urlArbreUpdate = '';
  urlArbreListCorrespondant = '';
  /* Fin */

  urlPlanstratContentList = '';
  urlPlanstratContentList2 = '';
  urlPlanstratContentCreate = '';
  urlPlanstratContentUpdate = '';
  urlPlanstratContentDelete = '';
  urlPlanstratList = '';
  urlPlanstratList2 = '';
  urlPlanstratCreate = '';
  urlPlanstratUpdate = '';
  urlPlanstratDelete = '';
  urlCanevaList = '';
  urlCanevaCreate = '';
  urlCanevaUpdate = '';
  urlCanevaDelete = '';
  urlCadreLogiqueList = '';
  urlCadreLogiqueFindList = '';
  urlCadreLogiqueCreate = '';
  urlCadreLogiqueUpdate = '';
  urlCadreLogiqueDelete = '';
  urlCadreLogiqueObjectifList = '';
  urlCadreLogiqueObjectifCreate = '';
  urlCadreLogiqueObjectifUpdate = '';
  urlCadreLogiqueObjectifDelete = '';
  urlCadreLogiqueActiviteList = '';
  urlCadreLogiqueActiviteCreate = '';
  urlCadreLogiqueActiviteUpdate = '';
  urlCadreLogiqueActiviteDelete = '';
  urlCadreLogiqueIndicateurList = '';
  urlCadreLogiqueIndicateurListActiv = '';
  urlCadreLogiqueIndicateurCreate = '';
  urlCadreLogiqueIndicateurUpdate = '';
  urlCadreLogiqueIndicateurDelete = '';
  urlCadreLogiqueExercice = '';
  urlAxeStrategiqueList = '';
  urlAxeStrategiqueCreate = '';
  urlAxeStrategiqueDelete = '';
  urlActiviteTheorieList = '';
  urlActiviteTheorieCreate = '';
  urlActiviteTheorieDelete = '';
  urlObjectifTheorieList = '';
  urlObjectifTheorieCreate = '';
  urlObjectifTheorieDelete = '';
  urlHypotheseList = '';
  urlHypotheseCreate = '';
  urlHypotheseDelete = '';
  urlActiviteStrategiqueList = '';
  urlActiviteStrategiqueCreate = '';
  urlActiviteStrategiqueDelete = '';
  urlObjectifList = '';
  urlObjectifCreate = '';
  urlObjectifDelete = '';
  urlIndicateurStrategiqueList = '';
  urlIndicateurStrategiqueCreate = '';
  urlIndicateurStrategiqueDelete = '';


  urlRapportFinancier = '';
  urlRapportRxecution = '';
  urlEtatBudgetaire = '';
  urlRapportAnnexes = '';
  urlBcaUpdateImputation = '';
  urlDecUpdateImputation = '';
  urlOmUpdateImputation = '';
  urlMandatUpdateImputation = '';
  urlListRejetGainOpti = '';
  urlListRejetGainOptiSave = '';
  urlListRejetGainOptiSaveDec = '';
  urlListRejetGainOptiSaveMis = '';
  urlListRejetGainOptiSaveMand = '';
  urlListing = '';
  urlListingAll = '';
  urlBcaListBad = '';
  urlDecisionListBad = '';
  urlOmListBad = '';
  urlMandatListBad = '';
  urlOmAgentList = '';
  urlgGetTotaux = '';
  urlOmAgentListAll = '';
  urlBcaListAll = '';
  urlDecisionListAll = '';
  urlFactDecisionCreate = '';
  urlFactDecisionUpdate = '';
  urlBenef = '';
  urlFactDecisionlist = '';
  urlaccederproforma = '';

  urlActiviteStrategiqueList2 = '';
  urlActiviteStrategiqueList3 = '';

  urlCsCanevaList = '';
  urlCsCanevaList2 = '';
  urlCsCanevaCreate = '';
  urlCsCanevaUpdate = '';

  urlCsCanevaDelete = '';

  urlListDoc = '';
  urlDeleteDoc = '';


  urlStructureList: string = ''
  urlIndicateurList = '';


  constructor(
    private http: HttpClient,
    private appConfigService: ConfigService
  ) {
    const urlserveurLocal = this.appConfigService.getConfig().serverIP;
    const urlserveurDistant = this.appConfigService.getConfig().serverDistantIP;
    let urlserveur = '';
    urlserveur = this.appConfigService.getConfig().serverIP;

    /* Structures */
    this.urlStructureList = urlserveur + 'furtif/structure/list/';
    this.urlIndicateurList = urlserveur + 'indicateur/list';
    /* New urls */

    /* Clients urls */
    this.urlListGroupeClent = urlserveur + 'furtif/clients/listGroupeClent';
    this.urlListClient = urlserveur + 'furtif/clients/list';
    this.urlInsertClient = urlserveur + 'furtif/clients/insert';
    this.urlDeleteClient = urlserveur + 'furtif/clients/deleteList';

    /* Document routes */
    this.urlListDocument = urlserveur + 'furtif/documents/list';
    this.urlListDocumentStat = urlserveur + 'furtif/documents/stat';
    this.urlListDocumentByType = urlserveur + 'furtif/documents/listByType';
    this.urlListDocumentByStatut = urlserveur + 'furtif/documents/listByStatut';
    this.urlInsertDocument = urlserveur + 'furtif/documents/insert';
    this.urlDeleteDocument = urlserveur + 'furtif/documents/deleteList';
    this.urlFileUpload = urlserveur + 'furtif/filer/upload';
    this.urlFileDBUpload = urlserveur + 'furtif/filer/uploadFile';
    this.urlFileDownload = urlserveur + 'furtif/filer/download';
    this.urlFileDownloadFor = urlserveur + 'furtif/filer/downloadFileOfAnProject';
    this.urlListBackMonFichier = urlserveur + 'furtif/filer/backMonFichier';

    /* TypeDocument routes */
    this.urlListTypeDocument = urlserveur + 'furtif/typedocuments/list';
    this.urlInsertTypeDocument = urlserveur + 'furtif/typedocuments/insert';
    this.urlDeleteTypeDocument = urlserveur + 'furtif/typedocuments/deleteList';

    /* StatutDocument routes */
    this.urlListStatutDocument = urlserveur + 'furtif/statutdocuments/list';
    this.urlInsertStatutDocument = urlserveur + 'furtif/statutdocuments/insert';
    this.urlDeleteStatutDocument = urlserveur + 'furtif/statutdocuments/deleteList';

    /* HistoDocument routes */
    this.urlListHistoDocument = urlserveur + 'furtif/histodocuments/list';
    this.urlListExpoitHistoDocument = urlserveur + 'furtif/histodocuments/listExpoit';
    this.urlListHistoDocumentByDocument = urlserveur + 'furtif/histodocuments/listByDocument';
    this.urlInsertHistoDocument = urlserveur + 'furtif/histodocuments/insert';
    this.urlDeleteHistoDocument = urlserveur + 'furtif/histodocuments/deleteList';

    /* Projets urls */
    this.urlListProjet = urlserveur + 'furtif/projets/list';
    this.urlListPeojetByClient = urlserveur + 'furtif/projets/listByClient';
    this.urlListFinancement = urlserveur + 'furtif/financement/list';
    this.urlInsertProjet = urlserveur + 'furtif/projets/insert';
    this.urlDeleteProjet = urlserveur + 'furtif/projets/deleteList';

    /** Gestion des articles de la mercuriale par rub et srub */
    this.urlArticleListBySrID = urlserveur + 'facture/articleListBySr';
    this.urlRubriqueList = urlserveur + 'facture/listRubrique';
    this.urlSRubriqueList = urlserveur + 'facture/listSRubrique';
    this.urlArticleCreate = urlserveur + 'facture/insertArticle';
    this.urlArticleUpdate = urlserveur + 'facture/updateArticle';
    this.urlArticleList = urlserveur + 'facture/articleList';




    this.urlArbreCreate = urlserveur + 'arbre/insert';
    this.urlArbreList = urlserveur + 'arbre/list';
    this.urlTypeList = urlserveur + 'arbre/type/list';
    this.urlArbreDetailCreate = urlserveur + 'arbreDetail/insert';
    this.urlArbreTypeCreate = urlserveur + 'arbreType/insert';
    this.urlArbreNiveauCreate = urlserveur + 'arbreType/insert';
    this.urlArbreDetailList = urlserveur + 'arbreDetail/list/ID';
    this.urlArbreNiveau = urlserveur + 'arbreDetail/niveau/list';
    this.urlArbreDelete = urlserveur + 'arbre/delete';
    this.urlArbreUpdate = urlserveur + 'arbre/update';
    this.urlArbreListCorrespondant = urlserveur + 'arbre/correspondant';


    /* Users */
    this.urlUserList = urlserveur + 'user/list/';
    this.urlUserInsert = urlserveur + 'furtif/users/insert';
    this.urlUserListAll = urlserveur + 'furtif/users/list';
    this.urlUserActive = urlserveur + 'furtif/users/setEtat';
    this.urlUserListByGroupe = urlserveur + 'furtif/users/list';
    /* Permissionnaires */

    /* Droits */
    this.urlListDroit = urlserveur + 'furtif/droits/listAll';
    this.urlListDroitByModule = urlserveur + 'furtif/droits/listByModule';
    this.urlListModules = urlserveur + 'furtif/droits/listModules';
    this.urlInsertDroit = urlserveur + 'furtif/droits/insert';
    this.urlDeleteDroit = urlserveur + 'furtif/droits/delete';
    this.urlRolesByUserData = urlserveur + 'role/listRoleByUserData';
    this.urlRolesByUserData2 = urlserveur + 'role/listRoleByUserAndOrg';


    /* ***************** Services RONALD 25-04-2023 ******************* */

    /* ***************** Services TESHY 25-04-2023 ******************** */


    //url unité de mesure
    this.urlUniteList = urlserveur + 'furtif/uniteMesure/list';
    this.urlUniteInsert = urlserveur + 'furtif/uniteMesure/insert';
    this.urlUniteDelete = urlserveur + 'furtif/uniteMesure/delete/';
    this.urlUniteDeleteList = urlserveur + 'furtif/uniteMesure/deleteList';

    /* ******************* Filtrage de s données pour la compilation *********** */

    /* ***************** Services TESHY 25-04-2023 ******************** */


    this.urlOrganisationList = urlserveur + 'organisation/list/';
    this.urlSystemList = urlserveur + 'systeme/list';
    this.urlModulesListByHabilitation =
      urlserveur + 'module/listByHabilitation/';
    this.urlGroupList = urlserveur + 'groupe/list/';
    this.urlGroupListByUser = urlserveur + 'groupe/list';
    this.urlGroupAllList = urlserveur + 'groupe/list';
    this.urlGroupUpdate = urlserveur + 'groupe/update';
    this.urlGroupUpdater = urlserveur + 'user/updateGroupe';
    this.urlGroupInsert = urlserveur + 'user/insertGroupe';
    this.urlGroupDelete = urlserveur + 'user/deleteGroupe';
    this.urlRolesListByModule = urlserveur + 'role/listRoleByModule/';
    this.urlRolesInsert = urlserveur + 'role/insert';
    this.urlRolesUpdate = urlserveur + 'role/update';
    this.urlRolesList = urlserveur + 'role/list';
    this.urlRolesDelete = urlserveur + 'role/delete/';
    this.urlRolesByGroupe = urlserveur + 'role/listRoleByGroupe/';
    this.urlGroupAffecterRole = urlserveur + 'user/affecterRole';
    this.urlGroupAffecterUser = urlserveur + 'user/affecterUser';
    this.urlUserGlobalUpdate = urlserveur + 'user/insertGlobal';
    this.urlUserGlobalFind = urlserveur + 'user/findUserGlobal/';
    this.urlUserGlobalInsert = urlserveur + 'user/insertGlobal';
    this.urlUserListDescendance = urlserveur + 'user/listDescendance/';
    this.urlUserDelete = urlserveur + 'user/deleteUser/';

    this.urlUserGlobalByUserConnectedUpdate =
      urlserveur + 'user/updateUserGlobalByUserConnected';

    this.urlUserConnexion = urlserveur + 'user/connexion/';
    this.urlUserConnexion2 = urlserveur + 'user/connexion/';
    this.urlGetUser = urlserveur + 'user/getUser/';
    this.urlGetUserDet = urlserveur + 'user/getUserDet';
    this.urlConnect = urlserveur + 'user/connect/';
    this.urlRolesByUser = urlserveur + 'role/listRoleByUser/';
    this.urlLogin = urlserveur + '/user/connexion';
    this.urlUserDeconnexion = urlserveur + 'user/deconnexion';
    this.urlCheckLvAssynch = urlserveurLocal + 'furtif/synchronisation/check-assynch';
    this.urlPing = urlserveurDistant + 'furtif/synchronisation/ping';
    this.urlSynchronise = urlserveurDistant + 'furtif/synchronisation/synchronise';
    this.urlSynchroniseLocale = urlserveur + 'furtif/lettreVoiture/insertAll';

    this.urlUpdateState = urlserveur + 'furtif/updatestate/activer';
    this.urlUpdateStates = urlserveur + 'furtif/updatestate/activers';

    this.urlUserListUpdate = urlserveur + 'user/affecterUsers';
    this.urlCreateProfile = urlserveur + 'furtif/profil/insert';
    this.urlListProfile = urlserveur + 'furtif/profil/list';
    this.urlDeleteProfile = urlserveur + 'furtif/profil/delete';
    this.urlExerciceList = urlserveur + 'exercice/list'


    this.urlUserListe = urlserveur + '/user/listUtilisateur';
    this.urlGroupeListe = urlserveur + '/user/listGroupes';
    this.urlLocaliteByLevel = urlserveur + 'furtif/permis/localiteByLevel';
    this.urlChangePassword = urlserveur + 'furtif/permis/changePassword';


    this.urlTheorieList = urlserveur + 'theorie/list';
    this.urlTheorieCreate = urlserveur + 'theorie/insert';
    this.urlTheorieUpdate = urlserveur + 'theorie/insert';
    this.urlTheorieDelete = urlserveur + 'theorie/delete';
    this.urlTheorieHypotheseCreate = urlserveur + 'theoriehypothese/insert';
    this.urlTheorieHypotheseDelete = urlserveur + 'theoriehypothese/delete';
    this.urlTheorieHypotheseList = urlserveur + 'theoriehypothese/delete';
    this.urlTheorieFind = urlserveur + 'theoriehypothese/delete';




    this.urlPlanstratContentList = urlserveur + 'planstratContent/list';
    this.urlPlanstratContentList2 = urlserveur + 'planstratContent/parTitreCaneva';
    this.urlPlanstratContentCreate = urlserveur + 'planstratContent/insert';
    this.urlPlanstratContentUpdate = urlserveur + 'planstratContent/insert';
    this.urlPlanstratContentDelete = urlserveur + 'planstratContent/delete';
    this.urlPlanstratList = urlserveur + 'planstrat/list';
    this.urlPlanstratList2 = urlserveur + 'planstrat/listByCan';
    this.urlPlanstratCreate = urlserveur + 'planstrat/insert';
    this.urlPlanstratUpdate = urlserveur + 'planstrat/insert';
    this.urlPlanstratDelete = urlserveur + 'planstrat/delete';
    this.urlCanevaList = urlserveur + 'caneva/list';
    this.urlCanevaCreate = urlserveur + 'caneva/insert';
    this.urlCanevaUpdate = urlserveur + 'caneva/insert';
    this.urlCanevaDelete = urlserveur + 'caneva/delete';
    this.urlCadreLogiqueList = urlserveur + 'cadreLogique/list';
    this.urlCadreLogiqueFindList = urlserveur + 'cadreLogique/list';
    this.urlCadreLogiqueCreate = urlserveur + 'cadreLogique/insert';
    this.urlCadreLogiqueUpdate = urlserveur + 'cadreLogique/insert';
    this.urlCadreLogiqueDelete = urlserveur + 'cadreLogique/delete';
    this.urlCadreLogiqueObjectifList = urlserveur + 'cadreLogiqueObjectif/list';
    this.urlCadreLogiqueObjectifCreate = urlserveur + 'cadreLogiqueObjectif/insert';
    this.urlCadreLogiqueObjectifUpdate = urlserveur + 'cadreLogiqueObjectif/insert';
    this.urlCadreLogiqueObjectifDelete = urlserveur + 'cadreLogiqueObjectif/delete';
    this.urlCadreLogiqueActiviteList = urlserveur + 'cadreLogiqueActivite/list';
    this.urlCadreLogiqueActiviteCreate = urlserveur + 'cadreLogiqueActivite/insert';
    this.urlCadreLogiqueActiviteUpdate = urlserveur + 'cadreLogiqueActivite/insert';
    this.urlCadreLogiqueActiviteDelete = urlserveur + 'cadreLogiqueActivite/delete';
    this.urlCadreLogiqueIndicateurList = urlserveur + 'cadreLogiqueIndicateur/list';
    this.urlCadreLogiqueIndicateurListActiv = urlserveur + 'cadreLogiqueIndicateur/listActivite';
    this.urlCadreLogiqueIndicateurCreate = urlserveur + 'cadreLogiqueIndicateur/insert';
    this.urlCadreLogiqueIndicateurUpdate = urlserveur + 'cadreLogiqueIndicateur/insert';
    this.urlCadreLogiqueIndicateurDelete = urlserveur + 'cadreLogiqueIndicateur/delete';
    this.urlCadreLogiqueExercice = urlserveur + '/exercice/list';
    this.urlAxeStrategiqueList = urlserveur + 'axestrategique/list';
    this.urlAxeStrategiqueCreate = urlserveur + 'axestrategique/insert';
    this.urlAxeStrategiqueDelete = urlserveur + 'axestrategique/delete';
    this.urlActiviteTheorieList = urlserveur + 'activitetheorie/list';
    this.urlActiviteTheorieCreate = urlserveur + 'activitetheorie/insert';
    this.urlActiviteTheorieDelete = urlserveur + 'activitetheorie/delete';
    this.urlObjectifTheorieList = urlserveur + 'objectiftheorie/list';
    this.urlObjectifTheorieCreate = urlserveur + 'objectiftheorie/insert';
    this.urlObjectifTheorieDelete = urlserveur + 'objectiftheorie/delete';
    this.urlHypotheseList = urlserveur + 'hypothese/list';
    this.urlHypotheseCreate = urlserveur + 'hypothese/insert';
    this.urlHypotheseDelete = urlserveur + 'hypothese/delete';
    this.urlActiviteStrategiqueList = urlserveur + 'activitestrategique/list';
    this.urlActiviteStrategiqueCreate = urlserveur + 'activitestrategique/insert';
    this.urlActiviteStrategiqueDelete = urlserveur + 'activitestrategique/delete';
    this.urlObjectifList = urlserveur + 'cadreLogiqueObjectif/listObj';
    this.urlObjectifCreate = urlserveur + 'cadreLogiqueObjectif/insert';
    this.urlObjectifDelete = urlserveur + 'cadreLogiqueObjectif/delete';
    this.urlIndicateurStrategiqueList = urlserveur + 'indicateur/list';
    this.urlIndicateurStrategiqueCreate = urlserveur + 'indicateur/insert';
    this.urlIndicateurStrategiqueDelete = urlserveur + 'indicateur/delete';





    this.urlRapportFinancier = urlserveur + 'rapport/financier';
    this.urlRapportRxecution = urlserveur + 'rapport/rapportExecutionBudgetaire';
    this.urlEtatBudgetaire = urlserveur + 'rapport/etatexecution';
    this.urlRapportAnnexes = urlserveur + 'rapport/annexe';
    this.urlBcaUpdateImputation = urlserveur + 'facture/updateImputation';
    this.urlDecUpdateImputation = urlserveur + 'fact-decision/updateImputation';
    this.urlOmUpdateImputation = urlserveur + 'fact-mission/updateImputation';
    this.urlMandatUpdateImputation = urlserveur + 'facture-mandat/updateImputation';
    this.urlListRejetGainOpti = urlserveur + 'engagementRejet/rejetGain/getOpti';
    this.urlListRejetGainOptiSave = urlserveur + 'facture/updateEngagementMontant';
    this.urlListRejetGainOptiSaveDec = urlserveur + 'fact-decision/updateEngagementMontant';
    this.urlListRejetGainOptiSaveMis = urlserveur + 'fact-mission/updateEngagementMontant';
    this.urlListRejetGainOptiSaveMand = urlserveur + 'facture-mandat/updateEngagementMontant';
    this.urlListing = urlserveur + 'facture/listing';
    this.urlListingAll = urlserveur + 'facture/listingAll';
    this.urlBcaListBad = urlserveur + 'facture/list-bad';
    this.urlDecisionListBad = urlserveur + 'fact-decision/list-bad';
    this.urlOmListBad = urlserveur + 'fact-mission/list-bad';
    this.urlMandatListBad = urlserveur + 'facture-mandat/list-bad';
    this.urlOmAgentList = urlserveur + 'fact-mission/listOmAgentByOM';
    this.urlgGetTotaux = urlserveur + 'facture/totaux';
    this.urlOmAgentListAll = urlserveur + 'fact-mission/listAll';
    this.urlBcaListAll = urlserveur + 'facture/listAll';
    this.urlDecisionListAll = urlserveur + 'fact-decision/listAll';
    this.urlFactDecisionCreate = urlserveur + 'fact-decision/insert';
    this.urlFactDecisionUpdate = urlserveur + 'fact-decision/update';
    this.urlBenef = urlserveur + 'fact-decision/benefList/list';
    this.urlFactDecisionlist = urlserveur + 'fact-decision/decisionByBenef/list';
    this.urlaccederproforma = urlserveur + 'proforma/acceder/';


    this.urlActiviteStrategiqueList2 = urlserveur + 'activitestrategique/listActivite';
    this.urlActiviteStrategiqueList3 = urlserveur + 'activitestrategique/listByParent';


    // CsCaneva
    this.urlCsCanevaList = urlserveur + 'csCaneva/list';
    this.urlCsCanevaList2 = urlserveur + 'csCaneva/listByCan';
    this.urlCsCanevaCreate = urlserveur + 'csCaneva/insert';
    this.urlCsCanevaUpdate = urlserveur + 'csCaneva/insert';
    this.urlCsCanevaDelete = urlserveur + 'csCaneva/delete';

    this.urlListDoc = urlserveur + 'furtif/filer/list';
    this.urlDeleteDoc = urlserveur + 'furtif/filer/delete';

  }

  public monPing(): Observable<any> {
    return this.http.get(this.urlPing);
  }
  /* Clients */

  public listClient(): Observable<any> {
    return this.http.get(this.urlListClient);
  }
  public listGroupeClent(): Observable<any> {
    return this.http.get(this.urlListGroupeClent);
  }
  public createClient(client: Client): Observable<any> {
    return this.http.post(this.urlInsertClient, client);
  }
  public deleteClient(list: Client[]): Observable<any> {
    return this.http.post(this.urlDeleteClient, list);
  }

  /* Projets */

  public listProjet(): Observable<any> {
    return this.http.get(this.urlListProjet);
  }
  public listFinancement(projetID: string): Observable<any> {
    return this.http.get(this.urlListFinancement + '/' + projetID);
  }
  public listProjetByClent(clientID: string): Observable<any> {
    return this.http.get(this.urlListPeojetByClient + '/' + clientID);
  }
  public createProjet(projet: Projet): Observable<any> {
    return this.http.post(this.urlInsertProjet, projet);
  }
  public deleteProjet(list: Projet[]): Observable<any> {
    return this.http.post(this.urlDeleteProjet, list);
  }

  /** Gestion des articles de la mercuriale par rub et srub */
  public createArticle(article: BcaArticle): Observable<any> {
    return this.http.post(this.urlArticleCreate, article);
  }
  public updateArticle(article: BcaArticle): Observable<any> {
    return this.http.put(this.urlArticleUpdate, article);
  }
  public listArticle(millesime: string): Observable<any> {
    return this.http.get(this.urlArticleList + '/' + millesime);
  }
  public listArticleBySrID(millesime: string, srID: string): Observable<any> {
    return this.http.get(this.urlArticleListBySrID + '/' + millesime + '/' + srID);
  }
  public listRubrique(millesime: string, interne: number): Observable<any> {
    return this.http.get(this.urlRubriqueList + '/' + millesime + '/' + interne);
  }
  public listSRubrique(millesime: string, numRubrique: string): Observable<any> {
    return this.http.get(this.urlSRubriqueList + '/' + millesime + '/' + numRubrique);
  }

  /* Gestion des droit */
  public listDroit(): Observable<any> {
    return this.http.get(this.urlListDroit);
  }
  public listDroitsByModule(moduleID: string): Observable<any> {
    return this.http.get(this.urlListDroitByModule + '/' + moduleID);
  }
  public listModules(): Observable<any> {
    return this.http.get(this.urlListModules);
  }
  public createDroit(droit: Droit): Observable<any> {
    return this.http.post(this.urlInsertDroit, droit);
  }
  public deleteDroit(id: string): Observable<any> {
    return this.http.delete(this.urlDeleteDroit + '/' + id);
  }
  public roleListByUserData(f: FindParam): Observable<any> {
    return this.http.post(this.urlRolesByUserData, f);
  }
  /* Les wés des gars */
  public roleListByUserData2(f: FindParam): Observable<any> {
    return this.http.post(this.urlRolesByUserData2, f);
  }

  /* ***************** Services RONALD 25-04-2023 ****** ************** */

  /* ***************** Services RONALD 25-04-2023 ******************** */


  //categorie unité
  public getAllCatUnite(): Observable<any> {
    return this.http.get(this.urlCUniteList);
  }
  public createCatUnite(data: CategorieUniteMesure): Observable<any> {
    return this.http.post(this.urlCUniteInsert, data);
  }
  public deleteCatUnite(id: any): Observable<any> {
    return this.http.delete(this.urlCUniteDelete + id);
  }

  //famille produits
  public deleteCatUnitList(list: any[]): Observable<any> {
    return this.http.post(this.urlCUniteDeleteList, list);
  }
  //unite mesure
  public getAllUniteMesure(): Observable<any> {
    return this.http.get(this.urlUniteList);
  }
  public insertUniteMesure(data: UniteMesure): Observable<any> {
    return this.http.post(this.urlUniteInsert, data);
  }
  public deleteUniteMesure(id: any): Observable<any> {
    return this.http.delete(this.urlUniteDelete + id);
  }
  public deleteUnitList(list: any[]): Observable<any> {
    return this.http.post(this.urlUniteDeleteList, list);
  }


  /* Check assynch */
  public checkLvAsynch(): Observable<any> {
    return this.http.get(this.urlCheckLvAssynch);
  }
  public ping(): Observable<any> {
    return this.http.get(this.urlPing);
  }
  public synchronise(list: any[]): Observable<any> {
    return this.http.post(this.urlSynchronise, list);
  }
  public synchroniseUpdate(list: any[]): Observable<any> {
    return this.http.post(this.urlSynchroniseLocale, list);
  }
  public userLogin(login: string): Observable<any> {
    return this.http.get(this.urlUserConnexion + login);
  }
  public furtifUserLogin(login: string, password: string): Observable<any> {
    return this.http.get(this.urlConnect + '/' + login + '/' + password);
  }
  public userLoginAll(user: User): Observable<any> {
    return this.http.post(this.urlGetUser, user);
    // .pipe(catchError(this.gestionErreur<any>('erreurLogin',[])))
  }
  public getUserDetail(login: string): Observable<any> {
    return this.http.get(this.urlGetUserDet + '/' + login);
  }

  public userLogout(login: string): Observable<any> {
    return this.http.get(this.urlUserDeconnexion + login);
  }
  /* Gestion des profils */
  public createProfil(data: Profil): Observable<any> {
    return this.http.post(this.urlCreateProfile, data);
  }
  public listProfile(): Observable<any> {
    return this.http.get(this.urlListProfile);
  }

  public deleteProfil(id: string): Observable<any> {
    return this.http.delete(this.urlDeleteProfile + '/' + id);
  }
  //Exercice
  public listExercice(): Observable<any> {
    return this.http.get<Exercice[]>(this.urlExerciceList);
  }
  /* User methods */

  public listUsers(org: string): Observable<any> {
    return this.http.get(this.urlUserListe + '/' + org);
  }
  public listGroupes(org: string): Observable<any> {
    return this.http.get(this.urlGroupeListe + '/' + org);
  }
  userList(): Observable<any> {
    return this.http.get(this.urlUserList);
  }
  listByGroupe(groupeID: number): Observable<any> {
    return this.http.get(this.urlUserListByGroupe + '/' + groupeID);
  }
  listAll(): Observable<any> {
    return this.http.get(this.urlUserListAll);
  }
  activeUser(userID: string, action: number): Observable<any> {
    return this.http.get(this.urlUserActive + '/' + userID + '/' + action);
  }
  userGlobalUpdate(user: UserGlobal, language: string): Observable<any> {
    return this.http.put(this.urlUserGlobalUpdate, user);
  }

  /* User methods */


  public attribuerDroitUser(list: DroitUser[]): Observable<any> {
    return this.http.post(this.urlAttribuerDroitUser, list);
  }

  public updateState(list: UpdateState[]): Observable<any> {
    return this.http.post(this.urlUpdateState, list);
  }
  public updateStates(list: UpdateState[]): Observable<any> {
    return this.http.post(this.urlUpdateStates, list);
  }

  public organisationList(language: string, actif: boolean): Observable<any> {
    return this.http.get(this.urlOrganisationList + actif);
  }
  systemList(): Observable<any> {
    return this.http.get(this.urlSystemList);
  }
  moduleListByHabilitation(login: string, systemeID: string): Observable<any> {
    return this.http.get(
      this.urlModulesListByHabilitation + systemeID + '/' + login
    );
  }
  groupeAllList2(moduleID: string): Observable<any> {
    return this.http.get(this.urlGroupList + moduleID);
  }
  groupeListByUser(language: string, login: string): Observable<any> {
    return this.http.get(this.urlGroupListByUser + login);
  }
  groupeAllList(): Observable<any> {
    return this.http.get(this.urlGroupAllList);
  }
  groupeList(fparam: FindParam): Observable<any> {
    return this.http.post(this.urlGroupAllList, fparam);
  }
  userListG(organisationID: string, language: string): Observable<any> {
    return this.http.get(this.urlUserList + organisationID);
  }
  groupeInsert(groupe: GroupeGlobal): Observable<any> {
    return this.http.post(this.urlGroupInsert, groupe);
  }
  groupeUpdate(groupe: GroupeGlobal): Observable<any> {
    return this.http.put(this.urlGroupUpdate, groupe);
  }
  groupeUpdater(groupe: Groupe): Observable<any> {
    return this.http.post(this.urlGroupUpdater, groupe);
  }
  groupeDelete(groupeID: string): Observable<any> {
    return this.http.delete(this.urlGroupDelete + groupeID);
  }
  groupeAffecterUser(groupe: GroupeGlobal): Observable<any> {
    return this.http.post(this.urlGroupAffecterUser, groupe);
  }
  groupeAffecterRole(groupe: GroupeGlobal): Observable<any> {
    return this.http.post(this.urlGroupAffecterRole, groupe);
  }

  //////////////////////////// ROLES //////////////////////////////////
  roleList(): Observable<any> {
    return this.http.get(this.urlRolesList);
  }
  listRoleByModule(moduleID: string): Observable<any> {
    return this.http.get(this.urlRolesListByModule + moduleID);
  }
  roleDelete(roleID: string): Observable<any> {
    return this.http.delete(this.urlRolesDelete + roleID);
  }
  roleListByGroupe(groupeID: string): Observable<any> {
    return this.http.get(this.urlRolesByGroupe + groupeID);
  }
  roleListByUser(userID: string): Observable<any> {
    return this.http.get(this.urlRolesByUser + userID);
  }
  changePassword(userID: string, newPassword: string): Observable<any> {
    return this.http.get(this.urlChangePassword + '/' + userID + '/' + newPassword);
  }

  roleInsert(role: Role): Observable<any> {
    return this.http.post(this.urlRolesInsert, role);
  }

  roleUpdate(role: Role): Observable<any> {
    return this.http.put(this.urlRolesUpdate, role);
  }
  userGlobalFind(id: string, language: string): Observable<any> {
    return this.http.get(this.urlUserGlobalFind + id);
  }
  userGlobalInsert(object: UserGlobal, language: string): Observable<any> {
    return this.http.post(this.urlUserGlobalInsert, object);
  }
  userListByLogin(organisationID: string, login: string): Observable<any> {
    return this.http.get(
      this.urlUserListDescendance + organisationID + '/' + login
    );
  }

  userListUpdate(listeUsers: Set<User>): Observable<any> {
    return this.http.put(this.urlUserListUpdate, Array.from(listeUsers));
  }

  userGlobalUpdateByUserConnected(
    user: UserGlobal,
    language: string
  ): Observable<any> {
    return this.http.put(this.urlUserGlobalByUserConnectedUpdate, user);
  }




  /* Control de gestion */



  // Theorie
  // (simple Theorie formel)
  public listTheorie(organisationID: string): Observable<any> {
    return this.http.get(this.urlTheorieList + '/' + organisationID);
  }
  public listTheorieHypothese(theoriechangementID: string): Observable<any> {
    return this.http.get(
      this.urlTheorieHypotheseList + '/' + theoriechangementID
    );
  }
  public find(theoriechangementID: string): Observable<any> {
    return this.http.get(this.urlTheorieFind + '/' + theoriechangementID);
  }
  public createTheorie(theorie: TheorieChangement): Observable<any> {
    return this.http.post(this.urlTheorieCreate, theorie);
  }
  public createTheorieHypothese(hypothese: TheorieHypothese): Observable<any> {
    return this.http.post(this.urlTheorieHypotheseCreate, hypothese);
  }
  public updateTheorie(theorie: TheorieChangement): Observable<any> {
    return this.http.put(this.urlTheorieUpdate, theorie);
  }
  public deleteTheorie(id: string, user: any): Observable<any> {
    return this.http.delete(this.urlTheorieDelete + '/' + id + '/' + user);
  }
  public deleteTheorieList(list: TheorieChangement[]): Observable<any> {
    return this.http.post(this.urlCanevaDelete, list);
  }
  public deleteTheorieHypothese(id: string, user: any): Observable<any> {
    return this.http.delete(
      this.urlTheorieHypotheseDelete + '/' + id + '/' + user
    );
  }
  // fin

  // CsCaneva
  // (simple csCaneva formel)
  public listCsCaneva(canevaID: string): Observable<any> {
    return this.http.get(this.urlCsCanevaList2 + '/' + canevaID);
  }
  public listCsCanevaByParent(parentID: string): Observable<any> {
    return this.http.get(this.urlCsCanevaList + '/' + parentID);
  }
  public createCsCaneva(csCaneva: CsCaneva): Observable<any> {
    return this.http.post(this.urlCsCanevaCreate, csCaneva);
  }
  public updateCsCaneva(csCaneva: CsCaneva): Observable<any> {
    return this.http.put(this.urlCsCanevaUpdate, csCaneva);
  }
  public deleteCsCaneva(id: string | undefined, user: any): Observable<any> {
    return this.http.delete(this.urlCsCanevaDelete + '/' + id + '/' + user);
  }
  // fin


  // Arbre
  public createArbre(arbre: Arbre): Observable<any> {
    console.log(this.urlArbreCreate, arbre);
    return this.http.post(this.urlArbreCreate, arbre);
  }
  public listArbreByTypeAndOrg(organisation: string, type: string): Observable<any> {
    return this.http.get(this.urlArbreList + '/' + organisation + '/' + type);
  }
  public arbreFindCorrespondant(organisation: string, arbrePbID: string): Observable<any> {
    return this.http.get(this.urlArbreList + '/' + organisation + '/' + arbrePbID + '/correspondant');
  }
  public listCorrespondantLibre(organisation: string, arbreTypeID: string): Observable<any> {
    return this.http.get(this.urlArbreList + '/' + organisation + '/' + arbreTypeID + '/correspondantLibre');
  }
  public listArbreByOrg(organisation: string): Observable<any> {
    return this.http.get(this.urlArbreList + '/' + organisation);
  }
  public listArbreByCorrespondant(organisation: string, arbreID: string, mode: number): Observable<any> {
    return this.http.get(this.urlArbreListCorrespondant + organisation + '/' + arbreID + '/' + mode);
  }
  public listArbreType(): Observable<any> {
    return this.http.get(this.urlTypeList);
  }
  public createArbreDetail(detaiArbre: Arbredetail): Observable<any> {
    return this.http.post(this.urlArbreDetailCreate, detaiArbre);
  }
  public createArbreType(typeArbre: ArbreType): Observable<any> {
    return this.http.post(this.urlArbreTypeCreate, typeArbre);
  }
  public createArbreNiveau(niveau: ArbreNiveau): Observable<any> {
    return this.http.post(this.urlArbreDetailCreate, niveau);
  }
  public listArbreDetail(arbreID: string): Observable<any> {
    return this.http.get(this.urlArbreDetailList + arbreID);
  }
  public listArbreNiveau(): Observable<any> {
    return this.http.get(this.urlArbreNiveau);
  }
  public listArbreNiveauByType(arbreTypeID: string): Observable<any> {
    return this.http.get(this.urlArbreNiveau + '/' + arbreTypeID);
  }
  public deleteArbre(id: string, user: any): Observable<any> {
    return this.http.delete(this.urlArbreDelete + '/' + id + '/' + user);
  }
  public deleteArbreList(list: Arbre[]): Observable<any> {
    return this.http.post(this.urlArbreDelete, list);
  }
  public updateArbre(arbre: Arbre): Observable<any> {
    return this.http.put(this.urlArbreUpdate, arbre);
  }
  // fin




  // fin
  // Indicateur

  public listCadreLogiqueIndicateurByOb(objectifID: string): Observable<any> {
    return this.http.get(this.urlCadreLogiqueIndicateurList + '/' + objectifID);
  }
  public listAllCadreLogiqueIndicateur(): Observable<any> {
    return this.http.get(this.urlCadreLogiqueIndicateurList);
  }
  public listCadreLogiqueIndicateurByActiv(
    activiteID: string
  ): Observable<any> {
    return this.http.get(
      this.urlCadreLogiqueIndicateurListActiv + '/' + activiteID
    );
  }
  public createCadreLogiqueIndicateur(
    indicateur: CadreLogiqueIndicateur
  ): Observable<any> {
    return this.http.post(this.urlCadreLogiqueIndicateurCreate, indicateur);
  }
  public updateCadreLogiqueIndicateur(
    indicateur: CadreLogiqueIndicateur
  ): Observable<any> {
    return this.http.put(this.urlCadreLogiqueIndicateurUpdate, indicateur);
  }
  public deleteCadreLogiqueIndicateur(id: string, user: any): Observable<any> {
    return this.http.delete(
      this.urlCadreLogiqueIndicateurDelete + '/' + id + '/' + user
    );
  }
  // fin

  // Axe strategique
  public listAxeStrategique(): Observable<any> {
    return this.http.get(this.urlAxeStrategiqueList);
  }
  public listFindAxeStrategique(
    organisationID: string,
    structureID: string
  ): Observable<any> {
    return this.http.get(
      this.urlAxeStrategiqueList + '/' + organisationID + '/' + structureID
    );
  }
  public listAxeStrategiqueByOrg(organisationID: string): Observable<any> {
    return this.http.get(this.urlAxeStrategiqueList + '/' + organisationID);
  }
  public createAxeStrategique(axeStrategique: AxeStrategique): Observable<any> {
    return this.http.post(this.urlAxeStrategiqueCreate, axeStrategique);
  }
  public updateAxeStrategique(axeStrategique: AxeStrategique): Observable<any> {
    return this.http.put(this.urlAxeStrategiqueCreate, axeStrategique);
  }
  public deleteAxeStrategique(id: string, user: any): Observable<any> {
    return this.http.delete(
      this.urlAxeStrategiqueDelete + '/' + id + '/' + user
    );
  }
  // fin

  // Activite strategique
  public listActiviteStrategique(): Observable<any> {
    return this.http.get(this.urlActiviteStrategiqueList);
  }
  public listActiviteStrategiqueByAxe(
    axestrategiqueID: string
  ): Observable<any> {
    return this.http.get(
      this.urlActiviteStrategiqueList + '/' + axestrategiqueID
    );
  }
  public listFindActiviteStrategique(
    organisationID: string,
    structureID: string
  ): Observable<any> {
    return this.http.get(
      this.urlActiviteStrategiqueList + '/' + organisationID + '/' + structureID
    );
  }
  public createActiviteStrategique(
    activiteStrategique: ActiviteStrategique
  ): Observable<any> {
    return this.http.post(
      this.urlActiviteStrategiqueCreate,
      activiteStrategique
    );
  }
  public updateActiviteStrategique(
    activiteStrategique: ActiviteStrategique
  ): Observable<any> {
    return this.http.put(
      this.urlActiviteStrategiqueCreate,
      activiteStrategique
    );
  }
  public deleteActiviteStrategique(id: string, user: any): Observable<any> {
    return this.http.delete(
      this.urlActiviteStrategiqueDelete + '/' + id + '/' + user
    );
  }
  // fin

  // activiteThéorie

  public listActiviteTheorie(
    organisationID: string,
    theorieID: string
  ): Observable<any> {
    return this.http.get(
      this.urlActiviteTheorieList + '/' + organisationID + '/' + theorieID
    );
  }

  public createActiviteTheorie(activite: ActiviteTheorie): Observable<any> {
    return this.http.post(this.urlActiviteTheorieCreate, activite);
  }

  public deleteActiviteTheorie(id: string, user: any): Observable<any> {
    return this.http.delete(
      this.urlActiviteTheorieDelete + '/' + id + '/' + user
    );
  }

  // ObjectifThéorie

  public listObjectifTheorie(
    organisationID: string,
    theorieID: string
  ): Observable<any> {
    return this.http.get(
      this.urlObjectifTheorieList + '/' + organisationID + '/' + theorieID
    );
  }

  public createObjectifTheorie(objectif: ObjectifTheorie): Observable<any> {
    return this.http.post(this.urlObjectifTheorieCreate, objectif);
  }

  public deleteObjectifTheorie(id: string, user: any): Observable<any> {
    return this.http.delete(
      this.urlObjectifTheorieDelete + '/' + id + '/' + user
    );
  }
  // fin

  // Hypotheses
  // (simple Hypotheses formel)
  public listHypotheseByIndicateur(indicateurID: string): Observable<any> {
    return this.http.get(this.urlHypotheseList + '/' + indicateurID);
  }
  public listAllHypothese(): Observable<any> {
    return this.http.get(this.urlHypotheseList);
  }
  public createHypothese(hypothese: Hypothese): Observable<any> {
    return this.http.post(this.urlHypotheseCreate, hypothese);
  }
  public deleteHypothese(id: string, user: any): Observable<any> {
    return this.http.delete(this.urlHypotheseDelete + '/' + id + '/' + user);
  }
  // fin

  // Objectif
  public listObjectif(activiteID: string): Observable<any> {
    return this.http.get(this.urlObjectifList + '/' + activiteID);
  }
  public createObjectif(objectif: Objectif): Observable<any> {
    return this.http.post(this.urlObjectifCreate, objectif);
  }
  public deleteObjectif(id: string, user: any): Observable<any> {
    return this.http.delete(this.urlObjectifDelete + '/' + id + '/' + user);
  }

  // indicateur
  public listIndicateur(data: string[]): Observable<any> {
    return this.http.post<any>(this.urlIndicateurStrategiqueList, {
      organisationID: data[0],
      structureID: data[1],
      objectifID: data[2],
    });
  }
  public listIndicateurByObjectif(objectifID: string): Observable<any> {
    return this.http.get(this.urlIndicateurStrategiqueList + '/' + objectifID);
  }
  public createIndicateur(indicateur: Indicateur): Observable<any> {
    return this.http.post(this.urlIndicateurStrategiqueCreate, indicateur);
  }
  public deleteIndicateur(id: string, user: any): Observable<any> {
    return this.http.delete(
      this.urlIndicateurStrategiqueDelete + '/' + id + '/' + user
    );
  }

  public updateImputationBca(bca: Facture): Observable<any> {
    return this.http.post<any>(this.urlBcaUpdateImputation, bca);
  }
  public updateImputationDec(bca: FactDecision): Observable<any> {
    return this.http.post<any>(this.urlDecUpdateImputation, bca);
  }
  public updateImputationOm(bca: FactMission): Observable<any> {
    return this.http.post<any>(this.urlOmUpdateImputation, bca);
  }
  public updateImputationMandat(bca: FactMandat): Observable<any> {
    return this.http.post<any>(this.urlMandatUpdateImputation, bca);
  }
  public getListing(fparam: FindParam): Observable<any> {
    return this.http.post<any>(this.urlListing, fparam);
  }
  public getListingAll(fparam: FindParam): Observable<any> {
    return this.http.post<any>(this.urlListingAll, fparam);
  }

  public getIfOptimisation(engagementID: string): Observable<any> {
    return this.http.get(this.urlListRejetGainOpti + '/' + engagementID);
  }


  public listASByNiveau(axestrategiqueID: string, niveau: number): Observable<any> {
    return this.http.get(this.urlActiviteStrategiqueList2 + '/' + axestrategiqueID + '/' + niveau);
  }
  public listASByParent(activitestrategiqueID: string): Observable<any> {
    return this.http.get(this.urlActiviteStrategiqueList3 + '/' + activitestrategiqueID);
  }


  // Caneva
  // (simple caneva formel)
  public listCaneva(organisationID: string): Observable<any> {
    return this.http.get(this.urlCanevaList + '/' + organisationID);
  }
  public createCaneva(caneva: Caneva): Observable<any> {
    return this.http.post(this.urlCanevaCreate, caneva);
  }
  public updateCaneva(caneva: Caneva): Observable<any> {
    return this.http.put(this.urlCanevaUpdate, caneva);
  }
  public deleteCaneva(id: string, user: any): Observable<any> {
    return this.http.delete(this.urlCanevaDelete + '/' + id + '/' + user);
  }
  public deleteCanevaList(list: Caneva[]): Observable<any> {
    return this.http.post(this.urlCanevaDelete, list);
  }

  userDelete(userID: string): Observable<any> {
    return this.http.delete(this.urlUserDelete + userID);
  }


  /* Document */

  public listDocument(): Observable<any> {
    return this.http.get(this.urlListDocument);
  }
  public listDocumentStat(): Observable<any> {
    return this.http.get(this.urlListDocumentStat);
  }
  public listDocumentByType(typedocumentID: string): Observable<any> {
    return this.http.get(this.urlListDocumentByType + '/' + typedocumentID);
  }
  public listDocumentByStatut(statutdocumentID: string): Observable<any> {
    return this.http.get(this.urlListDocumentByStatut + '/' + statutdocumentID);
  }
  public backMonFichier(documentID: string): Observable<any> {
    return this.http.get(this.urlListBackMonFichier + '/' + documentID);
  }
  public createDocument(client: Document): Observable<any> {
    return this.http.post(this.urlInsertDocument, client);
  }
  public deleteDocument(list: Document[]): Observable<any> {
    return this.http.post(this.urlDeleteDocument, list);
  }

  /* TypeDocument */

  public listTypeDocument(): Observable<any> {
    return this.http.get(this.urlListTypeDocument);
  }
  public createTypeDocument(projet: TypeDocument): Observable<any> {
    return this.http.post(this.urlInsertTypeDocument, projet);
  }
  public deleteTypeDocument(list: TypeDocument[]): Observable<any> {
    return this.http.post(this.urlDeleteTypeDocument, list);
  }
  /* StatutDocument */

  public listStatutDocument(): Observable<any> {
    return this.http.get(this.urlListStatutDocument);
  }
  public createStatutDocument(projet: StatutDocument): Observable<any> {
    return this.http.post(this.urlInsertStatutDocument, projet);
  }
  public deleteStatutDocument(list: StatutDocument[]): Observable<any> {
    return this.http.post(this.urlDeleteStatutDocument, list);
  }

  /* HistoDocument */

  public listHistoDocument(): Observable<any> {
    return this.http.get(this.urlListHistoDocument);
  }
  public listExpoit(): Observable<any> {
    return this.http.get(this.urlListExpoitHistoDocument);
  }
  public listHistoDocumentByDocument(documentID: string): Observable<any> {
    return this.http.get(this.urlListHistoDocumentByDocument + '/' + documentID);
  }
  public createHistoDocument(projet: HistoDocument): Observable<any> {
    return this.http.post(this.urlInsertHistoDocument, projet);
  }
  public deleteHistoDocument(list: HistoDocument[]): Observable<any> {
    return this.http.post(this.urlDeleteHistoDocument, list);
  }

  structureList(language: string, organisationID: string): Observable<any> {
    return this.http.get(this.urlStructureList + organisationID);
  }

  indicateurList(tab: any): Observable<any> {
    return this.http.post(this.urlIndicateurList, tab)
  }
  login(user: User): Observable<any> {
    return this.http.post(this.urlLogin, user);
  }

  download(encodedFilename: string) {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get(`${this.urlFileDownload}/${encodedFilename}`, {
      headers,
      responseType: 'blob',
    });
  }
  downloadFileOfAnProject(encodedFilename: string, userID: string) {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get(`${this.urlFileDownloadFor}/${encodedFilename}/${userID}`, {
      headers,
      responseType: 'blob',
    });
  }

  upload(file: File, login: string, type: any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('id', login);
    formData.append('file', file);
    formData.append('type', type);
    const req = new HttpRequest('POST', `${this.urlFileDBUpload}`, formData, {
      reportProgress: true,
      responseType: 'json',
    }
    );
    console.log(req);
    return this.http.request(req);
  }

  public deleteFichier(fileID: string): Observable<any> {
    return this.http.delete(this.urlDeleteDoc + '/' + fileID);
  }

  public listFichier(id: string): Observable<any> {
    return this.http.get(this.urlListDoc + '/' + id);
  }
}
