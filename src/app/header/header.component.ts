import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  @ViewChild('header') header!: ElementRef;
  isLoggedIn = false
  prevScrollpos = 0;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  showLoginBox = false;
  showCartBox=false;
  showSearchBox=false;
  showBox(showCartBox: boolean, showLoginBox: boolean,showSearchBox:boolean): void {
    if(this.showCartBox != showCartBox || this.showLoginBox != showLoginBox || this.showSearchBox!=showSearchBox){
      this.showCartBox = showCartBox;
      this.showLoginBox = showLoginBox;
      this.showSearchBox= showSearchBox;
    }
    else{
      this.hideBox()
    }
  }
  hideBox(): void {
    this.showLoginBox = false;
    this.showCartBox = false;
    this.showSearchBox =false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.hideBox();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
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
  }
  // ngAfterViewInit() {
  //   window.onscroll = () => {
  //     const currentScrollPos = window.pageYOffset;
  //     if (this.prevScrollpos > currentScrollPos) {
  //       if (this.header) {
  //         this.renderer.setStyle(this.header.nativeElement, 'top', '0');
  //       }
  //     } else {
  //       if (this.header) {
  //         this.renderer.setStyle(this.header.nativeElement, 'top', '-105px');
  //         this.renderer.setStyle(this.header.nativeElement, 'marginTop', '0px');
  //       }
  //     }
  //     this.prevScrollpos = currentScrollPos;
  //   };
  // }







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

}
