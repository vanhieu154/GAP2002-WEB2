import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpRegisterComponent } from './otp-register.component';

describe('OtpRegisterComponent', () => {
  let component: OtpRegisterComponent;
  let fixture: ComponentFixture<OtpRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
