export class FindParam {
    userID!:string
    organisationID!:string
    moduleID!:string
    libelleOrganisation!:string
    structureID!:string
    posteTraitementID!:string
    missionID!:string
    budgetID!:string
    strategie!:number
    activiteID!:string
    reference!:string
    millesime!:string
    etat!:number
    dateMax!:Date
    dateMin!:Date
    objet!:string
    sensibiliteID!:string
    typeCourrierID!:string
    classeur!:string
    autre!:string


    constructor(_org:string, _login : string){
        this.userID = _login
        this.organisationID = _org
    }

 
}
