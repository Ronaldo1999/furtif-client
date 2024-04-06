import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieClientDialogComponent } from './categorie-client-dialog.component';

describe('CategorieClientDialogComponent', () => {
  let component: CategorieClientDialogComponent;
  let fixture: ComponentFixture<CategorieClientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieClientDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
