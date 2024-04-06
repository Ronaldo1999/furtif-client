import { Component, Input, AfterViewInit } from '@angular/core';
import { jsPlumb } from 'jsplumb';

export interface Node {
  id: string;
  top?: number;
  name?: number;
  left?: number;
  type?: number;
  color?: number;
  height?: number;
  width?: number;
}

@Component({
  selector: 'node',
  template: `

  <div editable="true" class="node" [style.left.px]="node.left || 4" [style.top.px]="node.top || 20" [style.background-color]="node.color" 
         id="{{node.id}}" >
        <textarea  name="name" id="{{node.id+'_content'}}" [style.height]="node.height" [style.width]="node.width" value="{{node.name}}" style="background-color: transparent; border:1px solid transparent; wordWrap :break-word;resize: both; color: azure;">
        </textarea>
        <p (click)="removeNode(node)" pTooltip="Supprimer" tooltipPosition="top" class="close shadow">x</p>
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

.node:hover {
  cursor: move;
}
.row {
  display:flex;
}
 .close {
   position: absolute;
   right: 2px;
   height:15px;
   width:15px;
   top: 0px;
   cursor: pointer;
   border-radius:50%; 
   font-size:12px; 
   background-color:rgb(227, 109, 109); 
   color:rgb(122, 68, 68)
 }
 .close:hover {
  color:rgb(202, 194, 194);
  background-color:rgb(225, 51, 51); 
 }
  
  `]
})
export class NodeComponentArbre implements AfterViewInit {
  @Input() node!: Node;

  @Input() jsPlumbInstance: any;

  ngAfterViewInit() {
    const exampleDropOptions = {
      tolerance: 'touch',
      hoverClass: 'dropHover',
      activeClass: 'dragActive'
    };
    let Endpoint1 = {
      endpoint: ['Dot', { radius: 7 }],
      paintStyle: { fill: '#99cb3a' },
      isSource: true,
      scope: 'jsPlumb_DefaultScope',
      connectorStyle: { stroke: 'rgb(9, 80, 104)', strokeWidth: 2 },
      // connector: ['Bezier', { curviness: 63 }],
      connector: ['Flowchart', { cornerRadius: 5 }],
      maxConnections: 30,
      isTarget: false,
      connectorOverlays: [['Arrow', { location: 1 }]],
      dropOptions: exampleDropOptions
    };
    let Endpoint2 = {
      endpoint: ['Dot', { radius: 4 }],
      paintStyle: { fill: '#ffcb3a' },
      isSource: false,
      scope: 'jsPlumb_DefaultScope',
      maxConnections: 30,
      isTarget: true,
      dropOptions: exampleDropOptions
    };
    const { id } = this.node;
    /* this.jsPlumbInstance.addEndpoint(id, { anchor: 'Right', uuid: id + '_right' }, Endpoint1);
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Left', uuid: id + '_left' }, Endpoint2); */

    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Bottom', uuid: id + '_bottom' }, Endpoint2);
    this.jsPlumbInstance.addEndpoint(id, { anchor: 'Top', uuid: id + '_top' }, Endpoint1);
    this.jsPlumbInstance.draggable(id);

  }

  removeNode(node: any) {
    this.jsPlumbInstance.removeAllEndpoints(node.id);
    this.jsPlumbInstance.remove(node.id);
  }



}
