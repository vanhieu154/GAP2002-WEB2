import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {
  onSubmit(value:string){
    alert("Cảm ơn " + value + ", thông tin của bạn đã được gửi !" )
  }
}
