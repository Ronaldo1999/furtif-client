import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeBodyComponent } from './node-body.component';

describe('NodeBodyComponent', () => {
  let component: NodeBodyComponent;
  let fixture: ComponentFixture<NodeBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
