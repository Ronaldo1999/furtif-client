import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxeStrategiqueComponent } from './axe-strategique.component';

describe('AxeStrategiqueComponent', () => {
  let component: AxeStrategiqueComponent;
  let fixture: ComponentFixture<AxeStrategiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxeStrategiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AxeStrategiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
