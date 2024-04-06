import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogipageComponent } from './logipage.component';

describe('LogipageComponent', () => {
  let component: LogipageComponent;
  let fixture: ComponentFixture<LogipageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogipageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogipageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
