import {
  ComponentRef,
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector,
  Input,
  ViewContainerRef
} from '@angular/core';
import { DynamicNodeComponent, Node } from './dynamic-node.component';
import { jsPlumb } from 'jsplumb';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NodeBodyComponent } from '../node-body/node-body.component';
import { DynamicNode2Component } from './dynamic-node2.component';

@Injectable()
export class NodeService {
  @Input() node!: Node;

  jsPlumbInstance = jsPlumb.getInstance();
  private rootViewContainer: any;
  numberOfElements = 0;
  constructor(private factoryResolver: ComponentFactoryResolver,
    public dialogService: DialogService) {
  }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public addDynamicNode(node: any) {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicNodeComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    (<any>component.instance).node = node;
    (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;

    this.rootViewContainer.insert(component.hostView);
  }
  public addDynamicProbleme(node: any) {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicNode2Component);
    const component = factory.create(this.rootViewContainer.parentInjector);
    (<any>component.instance).node = node;
    (<any>component.instance).jsPlumbInstance = this.jsPlumbInstance;

    this.rootViewContainer.insert(component.hostView);
  }

  saveNodeJson() {
    //save element position on Canvas and node conections
    // const input = document.getElementById('contenubr') as HTMLInputElement | null;
    const container = this.rootViewContainer.element.nativeElement.parentNode;
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
    const connections = (this.jsPlumbInstance.getAllConnections() as any[])
      .map((conn) => ({ uuids: conn.getUuids() }));
    const json = JSON.stringify({ nodes, connections });
    console.log(json);
    return json;
  }


  videTout(tab: any[]) {
    for (const node of tab) {
      this.jsPlumbInstance.removeAllEndpoints(node?.id);
      // this.jsPlumbInstance.deleteEveryEndpoint();
      this.jsPlumbInstance.remove(node?.id);
    }
    /* for (const link of tab2) {
      this.jsPlumbInstance.detach(link);
    } */

  }

  /*  positionneTout(id: any, posX: any, posY: any) {
     $('#' + id).css('left', posX);
     $('#' + id).css('top', posY);
     this.jsPlumbInstance.repaint(id);
   } */

  monPositionneur(node: any) {

    const elem = document.getElementById(node.id);
    if (elem) {
      console.log(elem);
      elem.style.top = node.top;
      elem.style.left = node.left;
      this.jsPlumbInstance.repaint(node.id)
    }
  }

  getNodess(liens: string) {
    let flowChart = JSON.parse(liens);
    let nodes = flowChart.nodes;

    return nodes;
  }

  vider(liens: string) {
    let flowChart = JSON.parse(liens);
    let nodes = flowChart.nodes;
    for (const node of nodes) {
      this.removeNode(node);
    }
  }

  removeNode(node: any) {
    this.jsPlumbInstance.removeAllEndpoints(node.id);
    this.jsPlumbInstance.remove(node.id);
  }

  getNodess2(liens: string) {
    let flowChart = JSON.parse(liens);
    let nodes = flowChart.nodes;
    let connections = flowChart.connections;
    jsPlumbInstance2.connect(nodes, connections);
  }
  getLinks(liens: string) {
    let flowChart = JSON.parse(liens);
    let connections = flowChart.connections;

    for (const link of connections) {
      console.log("e prems" + link.uuids[0]);
      console.log("e second" + link.uuids[1]);
      this.jsPlumbInstance.connect({ uuids: [link.uuids[0], link.uuids[1]] });
    }
    return connections;
  }

  recharge(liens: any) {
    let flowChart = JSON.parse(liens);
    let connections = flowChart.connections;
    for (const connect of connections) {
      this.jsPlumbInstance.connect({
        source: connect.uuids,
        target: connect.uuids,
      });
    }
  }

  loadFlowchart(liens: string) {
    // let flowChartJson: any = $('#jsonOutput').val();
    let flowChart = JSON.parse(liens);
    let flowChart2 = JSON.parse(flowChart);
    let nodes = flowChart2.nodes;

    for (const node of nodes) {
      console.log(node);

      // this.addDynamicNode(node);
      //positionneTout2(node);
    }

    let connections = flowChart.connections;
    for (const connect of connections) {
      this.jsPlumbInstance.connect({
        source: connect.uuid,
        target: connect.uuid,
      });
    }

    this.numberOfElements = flowChart.numberOfElements;
  }

  addConnection(connection: any) {
    this.jsPlumbInstance.connect({ uuids: connection.uuids });
  }
  reconnecte(connection: any) {
    return this.jsPlumbInstance.connect({ uuids: connection.uuids });
  }

  public clear() {
    this.rootViewContainer.clear();
  }

  getAll(container: any, nodes: any[], connections: any[]) {
    this.rootViewContainer.element.nativeElement.parentNode = container;

  }

  getTout(liens: any) {
    let flowChart = JSON.parse(liens);
    let connections = flowChart.connections;

    for (const link of connections) {
      console.log(link);



    }

  }



  ref!: DynamicDialogRef;
  addNodeByModal(type: string) {
    this.ref = this.dialogService.open(NodeBodyComponent, {
      header: "Ajout d'un " + type,
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000,
      data: { type: type }
    });

    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.node.id = data.id;
        this.node.name = data.name;
        this.node.color = data.color;
        this.node.type = type;
        this.addDynamicNode(this.node);
      }
    });
  }
}

function positionneTout(id: any, posX: any, posY: any) {
  $('#' + id).css('left', posX);
  $('#' + id).css('top', posY);
  jsPlumbInstance2.repaint(id);
}
function positionneTout2(elem: any) {
  jQuery('#' + elem.id).css('left', elem.posX);
  jQuery('#' + elem.id).css('top', elem.posY);
  jsPlumbInstance2.repaint(elem);
}




const jsPlumbInstance2 = jsPlumb.getInstance();

