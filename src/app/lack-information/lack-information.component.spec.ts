import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LackInformationComponent } from './lack-information.component';

describe('LackInformationComponent', () => {
  let component: LackInformationComponent;
  let fixture: ComponentFixture<LackInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LackInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LackInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
