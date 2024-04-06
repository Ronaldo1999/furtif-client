import { Component, Input, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { NodeServiceArbreCor } from './node.service';



@Component({
  selector: 'nodes-container-arbre-cor',
  templateUrl: './nodes-container.component.html',
  styleUrls: ['./nodes-container.component.css'],
})
export class NodesContainerComponentArbreCor implements AfterViewInit {
  @Input() nodes: any[] = [];

  @Input() connections: any[] = [];

  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(private nodeService: NodeServiceArbreCor) { }

  ngAfterViewInit() {
    console.log("c'est entré");
    this.nodeService.setRootViewContainerRef(this.viewContainerRef);
    // this.loadAll();
    this.nodes.forEach(node => {
      this.nodeService.addDynamicNodeAbre(node);
    });

    setTimeout(() => {
      this.connections.forEach(connection => {
        this.nodeService.addConnection(connection);
      });
    })
  }
}