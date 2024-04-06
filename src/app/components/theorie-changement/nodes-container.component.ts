import { Component, OnInit, OnChanges, Input, ChangeDetectionStrategy, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { NodeService2 } from './node.service';



@Component({
  selector: 'nodes-container',
  templateUrl: './nodes-container.component.html',
  styleUrls: ['./nodes-container.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodesContainerComponent implements AfterViewInit {
  @Input() nodes: any[] = [];

  @Input() connections: any[] = [];

  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(private nodeService: NodeService2) { }

  ngAfterViewInit() {
    console.log("c'est entré");

    this.nodeService.setRootViewContainerRef(this.viewContainerRef);

    this.nodes.forEach(node => {
      this.nodeService.addDynamicNode(node);
    });

    setTimeout(() => {
      this.connections.forEach(connection => {
        this.nodeService.addConnection(connection);
      });
    })
  }

  saveNodeJson() {

    const container = this.viewContainerRef.element.nativeElement.parentNode;
    const nodes = Array.from(container.querySelectorAll('.node')).map((node: any) => {
      const input = document.getElementById(node.id + '_content') as HTMLInputElement | null;
      return {
        id: node.id,
        top: node.offsetTop,
        left: node.offsetLeft,
        color: node.style.backgroundColor,
        name: input?.value,
      }
    });

    const connections = (this.nodeService.jsPlumbInstance.getAllConnections() as any[])
      .map((conn) => ({ uuids: conn.getUuids() }));

    const json = JSON.stringify({ nodes, connections });

    console.log(json);
  }

}