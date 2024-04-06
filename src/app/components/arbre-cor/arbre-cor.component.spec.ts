import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbreCorComponent } from './arbre-cor.component';

describe('ArbreCorComponent', () => {
  let component: ArbreCorComponent;
  let fixture: ComponentFixture<ArbreCorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbreCorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbreCorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
