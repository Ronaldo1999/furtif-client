import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepIndicateurComponent } from './rep-indicateur.component';

describe('RepIndicateurComponent', () => {
  let component: RepIndicateurComponent;
  let fixture: ComponentFixture<RepIndicateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepIndicateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
