import { Component } from '@angular/core';

@Component({
  selector: 'app-otp-register',
  templateUrl: './otp-register.component.html',
  styleUrls: ['./otp-register.component.css']
})
export class OtpRegisterComponent {
  phoneNumber!: string;

  constructor() { }

  ngOnInit() {
    var temp= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : [];

    // const temp = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):[];
    this.phoneNumber = temp[temp.length-1].phone;
    this.Verify();
  }

  Verify(): void
  {
    const otp1 = (<HTMLInputElement>document.getElementById('first')).value;
    const otp2 = (<HTMLInputElement>document.getElementById('second')).value;
    const otp3 = (<HTMLInputElement>document.getElementById('third')).value;
    const otp4 = (<HTMLInputElement>document.getElementById('fourth')).value;
    const otp5 = (<HTMLInputElement>document.getElementById('fifth')).value;
    const otp6 = (<HTMLInputElement>document.getElementById('sixth')).value;

    if(otp1 === '1' && otp2 === '2' && otp3 === '3' && otp4 === '4' && otp5 === '5' && otp6 === '6') {

      window.location.href="./register-successfully.html"
    } else {
      alert("Nhập mã otp sai vui lòng nhập lại")
    return;
  }
  }

}
// function OTPInput() {
//   const inputs = document.querySelectorAll<HTMLInputElement>('#otp > *[id]');

//   for (let i = 0; i < inputs.length; i++) {
//     inputs[i].addEventListener('keydown', function (event: KeyboardEvent) {
//         if (event.key === "Backspace") {
//           inputs[i].value = '';
//           if (i !== 0)
//             (inputs[i - 1] as HTMLInputElement).focus();
//         } else {
//           if (i === inputs.length - 1 && inputs[i].value !== '') {
//             return true;
//           } else if (event.keyCode > 47 && event.keyCode < 58) { //0-9 only
//             inputs[i].value = event.key;
//             if (i !== inputs.length - 1)
//               (inputs[i + 1] as HTMLInputElement).focus();
//             event.preventDefault();
//           } else if (event.keyCode > 64 && event.keyCode < 91) {
//             inputs[i].value = String.fromCharCode(event.keyCode);
//             if (i !== inputs.length - 1)
//               (inputs[i + 1] as HTMLInputElement).focus();
//             event.preventDefault();
//           }
//         }
//       });
//   }
//   return;
// }

// OTPInput();
