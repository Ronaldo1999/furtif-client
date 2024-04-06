import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheChangeComponent } from './the-change.component';

describe('TheChangeComponent', () => {
  let component: TheChangeComponent;
  let fixture: ComponentFixture<TheChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
