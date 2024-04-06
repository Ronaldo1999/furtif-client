import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef, Input, OnChanges } from '@angular/core';
import { NodeService } from './node.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { DialogComponent } from '../dialog.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnChanges, AfterViewInit {

  @Input() nodes = [];
  @ViewChild('nodes', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;
  constructor(private nodeService: NodeService, private simpleModalService: SimpleModalService) {
  }

  ngAfterViewInit() {
    // this.nodeService.jsPlumbInstance.bind('connection', info => {
    //   this.simpleModalService.addModal(DialogComponent, {
    //     title: 'Dialog',
    //     questions: { name: '', type: '' }
    //   })
    //     .subscribe((result) => {
    //       const targetNode = this.nodes.find(node => node.id === info.targetId);
    //       if (targetNode) {
    //         targetNode.name = result.name;
    //         targetNode.type = result.type;
    //         if (targetNode.type === 'end') {
    //           this.nodeService.jsPlumbInstance.deleteEndpoint(info.targetId + 'right');
    //         }
    //       }
    //     });
    // });
  }

  ngOnChanges() {
    this.nodeService.setRootViewContainerRef(this.viewContainerRef);
    this.nodeService.clear();
    if (this.nodes.length > 0) {
      this.nodes.forEach(node => {
        this.nodeService.addDynamicNode(node);
        //this.saveNodeJson()
      });
    }
  }

  /* saveNodeJson() {
    //save element position on Canvas and node conections
    const container = this.viewContainerRef.element.nativeElement.parentNode;
    const nodes = Array.from(container.querySelectorAll('.node')).map((node: HTMLDivElement) => {
      return {
        id: node.id,
        top: node.offsetTop,
        left: node.offsetLeft,
        color: node.style.color,
        libelle: node.textContent,
      }
    });
    const connections = (this.nodeService.jsPlumbInstance.getAllConnections() as any[])
      .map((conn) => ({ uuids: conn.getUuids() }));
    const json = JSON.stringify({ nodes, connections });
    console.log(json);
  } */
}
