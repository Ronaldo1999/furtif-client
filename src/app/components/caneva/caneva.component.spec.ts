import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanevaComponent } from './caneva.component';

describe('CanevaComponent', () => {
  let component: CanevaComponent;
  let fixture: ComponentFixture<CanevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanevaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
