import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

// @Directive({
//   selector: '[clickOutside]'
// })
// export class ClickOutsideDirective {
//   constructor(private _elementRef: ElementRef) { }

//   @Output()
//   public clickOutside = new EventEmitter();

//   @HostListener('document:click', ['$event.target'])
//   public onClick(targetElement: HTMLElement) {
//     const clickedInside = this._elementRef.nativeElement.contains(targetElement);
//     if (!clickedInside) {
//       this.clickOutside.emit(null);
//     }
//   }
// }


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('header') header!: ElementRef;
  isLoggedIn = false
  prevScrollpos = 0;

  public showLoginBox = false;

  public showLogin(): void {
    this.showLoginBox = !this.showLoginBox;
  }

  public hideLogin(): void {
    this.showLoginBox = false;
    console.log(this.showLoginBox);

  }
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit(): void {
    document.addEventListener('click', (event) => {
      const targetElement = event.target as HTMLElement;
      if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
        this.showLoginBox = false;
      }
    });
  }
  // ngOnDestroy(): void {
  //   // document.removeEventListener('click', this.handleDocumentClick);
  //   document.removeEventListener('click', this.onClickOutside);
  // }

  // onClickOutside = (event: Event) => {
  //   // Kiểm tra xem phần tử được click có thuộc ô login hay không
  //   if (!this.loginBox.nativeElement.contains(event.target)) {
  //     // Ẩn ô login nếu click bên ngoài
  //     this.showLoginBox = false;
  //   }
  // }

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
  // showLogin(): void {
  //   this.subnavActive = !this.subnavActive;
  //   // this.subnavActive = true;
  //   // Thêm event listener cho click của document
  //   // document.addEventListener('click', this.onClickOutside);
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
