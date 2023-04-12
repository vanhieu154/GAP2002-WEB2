import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('header') header!: ElementRef;
  isLoggedIn = false
  prevScrollpos = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    window.onscroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (this.prevScrollpos > currentScrollPos) {
        if (this.header) {
          this.renderer.setStyle(this.header.nativeElement, 'top', '0');
        }
      } else {
        if (this.header) {
          this.renderer.setStyle(this.header.nativeElement, 'top', '-105px');
          this.renderer.setStyle(this.header.nativeElement, 'marginTop', '0px');
        }
      }
      this.prevScrollpos = currentScrollPos;
    };
  }
  showSubnav(): void {
    const element = document.getElementById("showSubnav");
    if (element) {
      element.classList.toggle("activate");
    }
  }

  showHeaderList(): void {
    const element = document.getElementById("header__list-container");
    if (element) {
      element.classList.toggle("activate");
    }
  }

  showLogin(): void {
    const headerLoginContainer= document.getElementById("header__login-container")
    if (headerLoginContainer) {
      headerLoginContainer.classList.toggle("activate");
    }
  }

}
