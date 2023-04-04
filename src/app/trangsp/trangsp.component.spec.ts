import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangspComponent } from './trangsp.component';

describe('TrangspComponent', () => {
  let component: TrangspComponent;
  let fixture: ComponentFixture<TrangspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrangspComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrangspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
