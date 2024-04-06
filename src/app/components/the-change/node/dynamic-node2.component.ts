import { Component, Input, AfterViewInit, OnChanges } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { DialogComponent } from '../dialog.component';
import { jsPlumb } from 'jsplumb';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NodeBodyComponent } from '../node-body/node-body.component';
import { NodeService } from './node.service';

export interface Node {
  id: string;
  name: string;
  top: string;
  left: string;
  type: string;
  color: string;
}

// [style.top.px]="20" [style.left.px]="20"
@Component({
  selector: 'app-dynamic-node',
  template: `
    <div editable="true" class="node" [style.left.px]="node.left || 80" [style.top.px]="node.top || 90" [style.background-color]="node.color"
         id="{{node.id}}" >
        <textarea  name="name" id="name" cols="20" rows="2" [value]="node.name" style="background-color: transparent;"></textarea>
        <!-- <span class="d-flex flex-nowrap text-nowrap">{{node.name}}</span> (dblclick)="editNode(node)" --> 
        <p (click)="removeNode(node)" style="color:red; font-size:16px" pTooltip="Supprimer" tooltipPosition="top" class="close">X</p>
    </div>
  `,
  styles: [`
  .node {
  color:#fff;
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
export class DynamicNode2Component implements AfterViewInit {
  ref!: DynamicDialogRef;
  @Input() node!: Node;
  @Input() jsPlumbInstance!: any;
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
    connectorStyle: { stroke: '#99cb3a', strokeWidth: 2 },
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
    connectorStyle: { stroke: '#99cb3a', strokeWidth: 2 },
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
  ngAfterViewInit() {
    this.sourceEndPoint = this.jsPlumbInstance.addEndpoint(this.node.id,
      { anchor: 'Top', uuid: this.node.id + '_top' }, this.source);
    if (this.node.type !== 'start') {
      this.destinationEndPoint = this.jsPlumbInstance.addEndpoint(this.node.id,
        { anchor: 'Bottom', uuid: this.node.id + '_bottom' }, this.destination);
    }
    this.jsPlumbInstance.draggable(this.node.id);
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

