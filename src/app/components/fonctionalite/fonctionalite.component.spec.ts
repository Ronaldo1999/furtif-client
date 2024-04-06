import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionaliteComponent } from './fonctionalite.component';

describe('FonctionaliteComponent', () => {
  let component: FonctionaliteComponent;
  let fixture: ComponentFixture<FonctionaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FonctionaliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FonctionaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
