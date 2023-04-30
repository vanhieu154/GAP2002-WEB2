import { Component } from '@angular/core';

@Component({
  selector: 'app-set-up-password',
  templateUrl: './set-up-password.component.html',
  styleUrls: ['./set-up-password.component.css']
})
export class SetUpPasswordComponent {

}
const showPassword = document.querySelector<HTMLInputElement>("#show-password");
const passwordField = document.querySelector<HTMLInputElement>("#password");

showPassword?.addEventListener("click", function(this: HTMLElement){
    this.classList.toggle("fa-eye-slash");
    const type = passwordField?.getAttribute("type") === "password" ? "text" : "password";
    passwordField?.setAttribute("type", type);
});


const showPassword1 = document.querySelector<HTMLInputElement>("#show-password1");
const passwordField1 = document.querySelector<HTMLInputElement>("#password1");

showPassword1?.addEventListener("click", function(this: HTMLElement){
    this.classList.toggle("fa-eye-slash");
    const type = passwordField1?.getAttribute("type") === "password" ? "text" : "password";
    passwordField1?.setAttribute("type", type);
});
