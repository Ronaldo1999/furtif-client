import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbreListComponent } from './arbre-list.component';

describe('ArbreListComponent', () => {
  let component: ArbreListComponent;
  let fixture: ComponentFixture<ArbreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
