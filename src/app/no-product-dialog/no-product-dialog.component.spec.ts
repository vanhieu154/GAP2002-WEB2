import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoProductDialogComponent } from './no-product-dialog.component';

describe('NoProductDialogComponent', () => {
  let component: NoProductDialogComponent;
  let fixture: ComponentFixture<NoProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoProductDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
