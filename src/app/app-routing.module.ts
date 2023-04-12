import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrangspComponent } from './trangsp/trangsp.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
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
import { OtpRegisterComponent } from './otp-register/otp-register.component';
import { OtpForgetPassComponent } from './otp-forget-pass/otp-forget-pass.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { PaymentComponent } from './payment/payment.component';
import { SetUpPasswordComponent } from './set-up-password/set-up-password.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { ChangeSuccessComponent } from './change-success/change-success.component';

const routes: Routes = [
  {
    path:"",component:TrangchuComponent
  },
  {
    path:"trangsp",component:TrangspComponent
  },
  {
    path:"chitietsp/:id",component:ChitietspComponent
  },
  {
    path:"Page404",component:Page404Component
  },
  {
    path:"Blog",component:BlogComponent
  },
  {
    path:"BlogDetail",component:BlogDetailComponent
  },
  {
    path:"PrivacyPolicy",component:PrivacyPolicyComponent
  },
  {
    path:"COD",component:CODComponent
  },
  {
    path:"Register",component:RegisterComponent
  },
  {
    path:"RegisterSuccessfull",component:RegisterSuccessfullComponent
  },
  {
    path:"Cart",component:CartComponent
  },
  {
    path:"IntroPage",component:IntroPageComponent
  },
  {
    path:"PromotionPage",component:PromotionPageComponent
  },
  {
    path:"ContactPage",component:ContactPageComponent
  },
  {
    path:"AccountPage",component:AccountPageComponent
  },
  {
    path:"otp_register",component:OtpRegisterComponent
  },
  {
    path:"otp_forgetPass",component:OtpForgetPassComponent
  },
  {
    path:"forgetPass",component:ForgetPassComponent
  },
  {
    path:"Payment",component:PaymentComponent
  },
  {
    path:"SetUpPassword",component:SetUpPasswordComponent
  },
  {
    path:"DeliveryInfor",component:DeliveryInfoComponent
  },
  {
    path:"ChangeSuccess",component:ChangeSuccessComponent
  },

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
