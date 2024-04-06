import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-node-body',
  templateUrl: './node-body.component.html',
  styleUrls: ['./node-body.component.css']
})
export class NodeBodyComponent implements OnInit {
  ref2!: DynamicDialogRef;
  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef,) { }

  ngOnInit(): void {
    this.configurations();
  }

  node = {
    name: "",
    id: "",
    type: "",
    color: "",
  }

  insertion = false;
  configurations() {
    if (this.config.data.param == 'update') {
      this.node = this.config.data.node
      console.log(this.node);

    } else {
      this.insertion = true;
      switch (this.config.data.type) {
        case "Intrant":
          this.node.type = this.config.data.type;
          this.node.color = "rgba(21, 224, 31, 0.87)";
          this.node.id = "Intrant id_" + [Math.random().toString(16).slice(2, 8)];
          break;
        case "Extrant":
          this.node.type = this.config.data.type;
          this.node.color = "rgba(221, 224, 21, 0.993)";
          this.node.id = "Extrant id_" + [Math.random().toString(16).slice(2, 8)];
          // this.nodeService.addDynamicNode(node);
          break;
        case "Activite":
          this.node.type = this.config.data.type;
          this.node.color = "rgba(224, 143, 21, 0.993)";
          this.node.id = "Activite id_" + [Math.random().toString(16).slice(2, 8)];
          // this.nodeService.addDynamicNode(node);
          break;
        case "Effet long terme":
          this.node.type = this.config.data.type;
          this.node.color = "rgba(123, 236, 30, 0.966)";
          this.node.id = "EffetLT id_" + [Math.random().toString(16).slice(2, 8)];
          // this.nodeService.addDynamicNode(node);
          break;
        case "Effet court terme":
          this.node.type = this.config.data.type;
          this.node.color = "rgba(41, 167, 108, 0.966)";
          this.node.id = "EffetLT id_" + [Math.random().toString(16).slice(2, 8)];
          // this.nodeService.addDynamicNode(node);
          break;
        case "Effet Instanné":
          this.node.type = this.config.data.type;
          this.node.color = "rgba(41, 142, 167, 0.966)";
          this.node.id = "EffetI id_" + [Math.random().toString(16).slice(2, 8)];
          // this.nodeService.addDynamicNode(node);
          break;
        default:
          break;
      }
      // this.node.type = this.config.data.node.type;
    }
  }

  nodeSave() {
    this.ref.close(this.node)
  }

  close() {
    this.ref.close()
  }

}
