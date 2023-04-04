import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuccessfullComponent } from './register-successfull.component';

describe('RegisterSuccessfullComponent', () => {
  let component: RegisterSuccessfullComponent;
  let fixture: ComponentFixture<RegisterSuccessfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSuccessfullComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSuccessfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
