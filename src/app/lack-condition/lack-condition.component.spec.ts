import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LackConditionComponent } from './lack-condition.component';

describe('LackConditionComponent', () => {
  let component: LackConditionComponent;
  let fixture: ComponentFixture<LackConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LackConditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LackConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
