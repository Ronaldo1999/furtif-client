import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { jsPlumb } from 'jsplumb';

import { NodeComponent2 } from './node.component';
import { NodeComponentArbre } from './node.component2';

@Injectable()
export class NodeService2 {

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

  public addDynamicNode2(node: any) {
    const factory = this.factoryResolver.resolveComponentFactory(NodeComponent2);
    const component = factory.create(this.rootViewContainer.parentInjector);
    (<any>component.instance).node = node;
    (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;

    this.rootViewContainer.insert(component.hostView);
  }

  public addDynamicNode(node: any) {
    const factory = this.factoryResolver.resolveComponentFactory(NodeComponent2);
    const component = factory.create(this.rootViewContainer.injector);
    (<any>component.instance).node = node;
    (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;
    this.rootViewContainer.insert(component.hostView);
    console.log("in NodeService..", component.instance);
  }
  public addDynamicNodeAbre(node: any) {
    const factory = this.factoryResolver.resolveComponentFactory(NodeComponentArbre);
    const component = factory.create(this.rootViewContainer.injector);
    (<any>component.instance).node = node;
    (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;
    this.rootViewContainer.insert(component.hostView);
    console.log("in NodeService..", component.instance);
  }

  addConnection(connection: any) {
    this.jsPlumbInstance.connect({
      uuids: connection.uuids
    });
  }

  public clear() {
    this.rootViewContainer.clear();
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

}

