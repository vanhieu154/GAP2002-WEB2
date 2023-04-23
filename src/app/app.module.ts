import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrangspComponent } from './trangsp/trangsp.component';
import { HttpClientModule } from '@angular/common/http';
import { ChitietspComponent } from './chitietsp/chitietsp.component';
import { Page404Component } from './page404/page404.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CODComponent } from './cod/cod.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessfullComponent } from './register-successfull/register-successfull.component';
import { CartComponent } from './cart/cart.component';
import { IntroPageComponent } from './intro-page/intro-page.component';
import { PromotionPageComponent } from './promotion-page/promotion-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { IconModule } from '@visurel/iconify-angular';
import { OtpForgetPassComponent } from './otp-forget-pass/otp-forget-pass.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { PaymentComponent } from './payment/payment.component';
import { SetUpPasswordComponent } from './set-up-password/set-up-password.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { ChangeSuccessComponent } from './change-success/change-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    TrangchuComponent,
    HeaderComponent,
    FooterComponent,
    TrangspComponent,
    ChitietspComponent,
    Page404Component,
    BlogComponent,
    BlogDetailComponent,
    PrivacyPolicyComponent,
    CODComponent,
    RegisterComponent,
    RegisterSuccessfullComponent,
    CartComponent,
    IntroPageComponent,
    PromotionPageComponent,
    ContactPageComponent,
    AccountPageComponent,
    OtpForgetPassComponent,
    ForgetPassComponent,
    PaymentComponent,
    SetUpPasswordComponent,
    DeliveryInfoComponent,
    ChangeSuccessComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    IconModule,
    MatIconModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule ,
    MatSlideToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,

    // NgbModule
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
