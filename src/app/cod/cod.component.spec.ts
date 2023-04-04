import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CODComponent } from './cod.component';

describe('CODComponent', () => {
  let component: CODComponent;
  let fixture: ComponentFixture<CODComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CODComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
