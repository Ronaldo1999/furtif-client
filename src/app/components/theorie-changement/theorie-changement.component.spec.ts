import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheorieChangementComponent } from './theorie-changement.component';

describe('TheorieChangementComponent', () => {
  let component: TheorieChangementComponent;
  let fixture: ComponentFixture<TheorieChangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheorieChangementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheorieChangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
