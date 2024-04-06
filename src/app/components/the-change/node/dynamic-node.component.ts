import { Component, Input, AfterViewInit, OnChanges, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { DialogComponent } from '../dialog.component';
import { jsPlumb } from 'jsplumb';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NodeBodyComponent } from '../node-body/node-body.component';
import { NodeService } from './node.service';



function verifyLength(valeur: any) {
  let val = "" + valeur; // amends the value to an string, even if its undefined or null etc
  if (val.toString().length >= 25) {
    return true
  }
  return false
}

function verifyLength2(valeur: any) {
  let val = "" + valeur; // amends the value to an string, even if its undefined or null etc
  if (val.toString().length >= 25) {
    val.split(" ",);
  }
  return val;
}

function defineDescription(libelle: any): string {
  let value = libelle.slice(0, 24)
  return value;
}

export interface Node {
  id: string;
  name: string;
  top: number;
  left: number;
  type: string;
  color: string;
  height: string;
}

export class NodeClass implements Node {
  id!: string;
  name!: string;
  top!: number;
  left!: number;
  type!: string;
  color!: string;
  height!: string;
}


//  [style.top.px]="node.top || 0" [style.left.px]="node.left || 20"

@Component({
  selector: 'app-dynamic-node',
  template: `
    <div editable="true" class="node" [style.left.px]="node.left || 80" [style.top.px]="node.top || 90" [style.background-color]="node.color" [style.height.px]="node.height"
         id="{{node.id}}" >
        <!-- <textarea  name="name" id="{{node.id+'_content'}}" cols="{{node.name.length}}" rows="2" value="{{node.name}}" style="background-color: transparent; border:1px solid transparent;">
        </textarea> -->
        <textarea  name="name" id="{{node.id+'_content'}}" cols="20" rows="5" value="{{node.name}}" style="background-color: transparent; border:1px solid transparent; wordWrap :break-word">
        </textarea>
        <!-- <span class="d-flex flex-nowrap text-nowrap">{{node.name}}</span> (dblclick)="editNode(node)" --> 
        <p (click)="removeNode(node)" style="color:red; font-size:16px" pTooltip="Supprimer" tooltipPosition="top" class="close">X</p>
    </div>
  `,
  styles: [`
  .node {
  color:#fff;
  cursor:move;
  position: absolute;
  width: auto;
  height: auto;  
  padding: 10px;
  border-radius:5px;
  box-shadow: 0 10px 40px 0 #B0C1D9;
  text-align: center;
 
  overflow: auto;
}
div.node {
  resize: both;
}

.node:hover {
  cursor: pointer;
}
.row {
  display:flex;
}
 .close {
   font-size: 10px;
   position: absolute;
   right: 9px;
   top: 0px;
   cursor: pointer;
 }
  `],
  providers: [DialogService]
})
export class DynamicNodeComponent implements AfterViewInit {
  ref!: DynamicDialogRef;
  @Input() node!: Node;
  @Input() connections = [];
  @Input() jsPlumbInstance!: any;


  @Input() nodes: any[] = [];


  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  sourceEndPoint: any;
  destinationEndPoint: any;
  exampleDropOptions = {
    tolerance: 'touch',
    hoverClass: 'dropHover',
    activeClass: 'dragActive'
  };
  source = {
    endpoint: ['Dot', { radius: 7 }],
    paintStyle: { fill: '#99cb3a' },
    isSource: true,
    scope: 'jsPlumb_DefaultScope',
    connectorStyle: { stroke: '#99cb3a', strokeWidth: 3 },
    connector: ['Bezier', { curviness: 63 }],
    maxConnections: 1000,
    ConnectionsDetachable: true,
    isTarget: true,
    connectorOverlays: [['Arrow', { location: 1 }]],
    dropOptions: this.exampleDropOptions
  };
  destination = {
    // endpoint: ['Dot', { radius: 4 }],
    // paintStyle: { fill: '#ffcb3a' },
    // isSource: false,
    // scope: 'jsPlumb_DefaultScope',
    // connectorStyle: { stroke: '#ffcb3a', strokeWidth: 6 },
    // connector: ['Bezier', { curviness: 23 }],
    // maxConnections: 1,
    // ConnectionsDetachable: true,
    // isTarget: true,
    // dropOptions: this.exampleDropOptions
    endpoint: ['Dot', { radius: 7 }],
    paintStyle: { fill: '#99cb3a' },
    isSource: true,
    scope: 'jsPlumb_DefaultScope',
    connectorStyle: { stroke: '#99cb3a', strokeWidth: 3 },
    connector: ['Bezier', { curviness: 63 }],
    maxConnections: 1000,
    ConnectionsDetachable: true,
    isTarget: true,
    connectorOverlays: [['Arrow', { location: 1 }]],
    dropOptions: this.exampleDropOptions
  };

  constructor(private simpleModalService: SimpleModalService,
    public dialogService: DialogService,
    public nodeService: NodeService
  ) { }

  /*ngOnInit() {


   
   this.nodes.forEach(node => {
     this.nodeService.addDynamicNode(node);
   });

   setTimeout(() => {
     this.connections.forEach(connection => {
       this.nodeService.addConnection(connection);
     });
   }) 
 }*/

  getShorName(name: string) {
    return name.replace(/(?![^\n]{1,20}$)([^\n]{1,20})\s/g, '[$1]\n')
  }

  /*   getNbColl(node: any) {
      const textarea = document.getElementById(node?.id + '_content') as HTMLInputElement | null;
      let nbrLigne = 0;
      let lignes: string[] | undefined = textarea?.value.split("\n");
      if(lignes){
        
      }
      for (const ligne of lignes) {
        if (ligne.length > 0) nbrLigne++;
      }
      return nbrLigne;
    }
   */
  recharge() {
    this.nodeService.setRootViewContainerRef(this.viewContainerRef);
    for (const node of this.nodes) {
      this.sourceEndPoint = this.jsPlumbInstance.addEndpoint(node?.id,
        { anchor: 'Right', uuid: node?.id + '_right' }, this.source);
      this.destinationEndPoint = this.jsPlumbInstance.addEndpoint(node?.id,
        { anchor: 'Left', uuid: node?.id + '_left' }, this.destination);
      /*  if (node?.type !== 'start') {
         this.destinationEndPoint = this.jsPlumbInstance.addEndpoint(node?.id,
           { anchor: 'Left', uuid: node?.id + '_left' }, this.destination);
       } */
      this.jsPlumbInstance.draggable(node?.id);
    }
  }

  ngAfterViewInit() {
    // this.recharge();
    // this.nodeService.setRootViewContainerRef(this.viewContainerRef);
    console.log("je suis entré dedans");
    this.sourceEndPoint = this.jsPlumbInstance.addEndpoint(this.node?.id,
      { anchor: 'Right', uuid: this.node?.id + '_right' }, this.source);
    this.destinationEndPoint = this.jsPlumbInstance.addEndpoint(this.node?.id,
      { anchor: 'Left', uuid: this.node?.id + '_left' }, this.destination);
    /*  if (this.node?.type !== 'start') {
       this.destinationEndPoint = this.jsPlumbInstance.addEndpoint(this.node?.id,
         { anchor: 'Left', uuid: this.node?.id + '_left' }, this.destination);
     } */
    this.jsPlumbInstance.draggable(this.node?.id);
  }

  getLast(tab: any[]) {
    return tab[tab.length - 1];
  }


  removeNode(node: any) {
    this.jsPlumbInstance.removeAllEndpoints(node.id);
    this.jsPlumbInstance.remove(node.id);
  }

  editNode(node: any) {
    this.simpleModalService.addModal(DialogComponent, {
      title: "Edition d'un " + node.type,
      questions: { name: node.name, type: node.type, color: node.color }
    })
      .subscribe((result) => {
        this.node.name = result.name;
        this.node.type = result.type;
        if (node.type === 'end') {
          this.jsPlumbInstance.deleteEndpoint(node.id + 'right');
        } else {
          this.jsPlumbInstance.addEndpoint(this.node.id,
            { anchor: 'Right', uuid: this.node.id + 'right' }, this.source);
        }
      });

    // this.
  }




}

