import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpForgetPassComponent } from './otp-forget-pass.component';

describe('OtpForgetPassComponent', () => {
  let component: OtpForgetPassComponent;
  let fixture: ComponentFixture<OtpForgetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpForgetPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpForgetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
