import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { jsPlumb } from 'jsplumb';
import { NodeComponentArbre } from '../arbre/node.component2';

import { NodeComponentArbreCor } from './node.component2';

@Injectable()
export class NodeServiceArbreCor {

  private rootViewContainer!: ViewContainerRef;

  jsPlumbInstance = jsPlumb.getInstance();

  @ViewChild('nodes', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  public setRootViewContainerRef1(viewContainerRef: any) {
    this.rootViewContainer = viewContainerRef;
  }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }


  public addDynamicNodeAbre(node: any) {
    const factory = this.factoryResolver.resolveComponentFactory(NodeComponentArbreCor);
    const component = factory.create(this.rootViewContainer.injector);
    (<any>component.instance).node = node;
    (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;
    this.rootViewContainer.insert(component.hostView);
    console.log("in NodeService..", component.instance);
  }
  public updateDynamicNodeAbreForCore(node: any) {
    const factory = this.factoryResolver.resolveComponentFactory(NodeComponentArbre);
    const component = factory.create(this.rootViewContainer.injector);
    (<any>component.instance).node = node;
    (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;
    this.rootViewContainer.insert(component.hostView);
    console.log("in NodeService..", component.instance);
  }

  addAllEndPoint(node: any) {
    this.jsPlumbInstance.addEndpoint(node.id);
  }

  addConnection(connection: any) {
    this.jsPlumbInstance.connect({ uuids: connection.uuids });
  }


  public clear(liens: any) {
    this.rootViewContainer.clear();
    this.removeConnexions(liens)
  }

  saveNodeJson() {
    //save element position on Canvas and node conections

    // const container = this.viewContainerRef.element.nativeElement.parentNode;
    const container = this.rootViewContainer.element.nativeElement.parentNode;
    const nodes = Array.from(container.querySelectorAll('.node')).map((node: any) => {
      const input = document.getElementById(node.id + '_content') as HTMLInputElement | null;
      return {
        id: node.id,
        top: node.offsetTop,
        left: node.offsetLeft,
        color: node.style.backgroundColor,
        name: input?.value,
        height: input?.style?.height,
        width: input?.style?.width,
      }
    });

    const connections = (this.jsPlumbInstance.getAllConnections() as any[])
      .map((conn) => ({ uuids: conn.getUuids() }));

    const json = JSON.stringify({ nodes, connections });

    console.log(json);
    return json;
  }

  removeConnexions(liens: any) {
    const data = JSON.parse(liens)
    // this.jsPlumbInstance.deleteEveryConnection();
    for (const node of data.nodes) {
      this.jsPlumbInstance.removeAllEndpoints(node.id);
      this.jsPlumbInstance.remove(node.id);
    }
  }

  reConnection(liens: any) {
    const data = JSON.parse(liens)
    for (const con of data.nodes) {
      this.jsPlumbInstance.connect({ uuids: con.uuids });
    }
  }

}

