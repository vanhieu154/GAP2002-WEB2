import { Component } from '@angular/core';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent {
  myProfile=true;
  myAddress=false;
  changePass=false;
  myProfileP=true;

  myOrder=false;
  myOrderDetail=false;

  waitConfirmOrder=true;
  waitPickUp=false
  inDelivering=false
  delivered=false
  cancelled=false

  myNotification=false;

  showmodal=false;
  showMy(myProfile:boolean,myOrder:boolean,myNotification:boolean){
    this.myProfile =myProfile;
    this.myOrder=myOrder;
    this.myNotification=myNotification;
  }
  showMyAccount(myProfileP:boolean,myAddress:boolean,changePass:boolean){
    this.myAddress=myAddress;
    this.changePass=changePass;
    this.myProfileP=myProfileP;
  }
  showOrderStatus( waitConfirmOrder:boolean,waitPickUp:boolean,inDelivering:boolean,delivered:boolean,cancelled:boolean){
    this.waitConfirmOrder=waitConfirmOrder;
    this.waitPickUp=waitPickUp;
    this.inDelivering=inDelivering;
    this.delivered=delivered;
    this.cancelled=cancelled;
  }
  showModal(){
    this.showmodal=true
  }
  hideModal(){
    this.showmodal=false
  }
}
