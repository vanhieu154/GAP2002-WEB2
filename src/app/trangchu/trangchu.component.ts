import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IProduct, Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.css']
})
export class TrangchuComponent implements OnInit{
  product=new Product();
  products:IProduct[] =[];
  discountProduct:IProduct[] =[]

  errMessage:string=''
  http: any;
  constructor(private _service: ProductService,private router:Router){
    let tempProducts: IProduct[];
    this._service.getProducts().subscribe({
      next:(data: IProduct[])=>{
        tempProducts = data.slice(0, 6);
        this.products = tempProducts;
        this.discountProduct = data.filter(p => p.Discount > 0);
        this.discountProduct = this.discountProduct.filter(p => !this.products.some(dp => dp.MaSP === p.MaSP)).slice(0, 6);
      },
      error:(err)=>{this.errMessage=err}
    })
  }
  modal!: HTMLElement;
  ngOnInit() {

    this.modal = document.querySelector(".modal")!;
    if (sessionStorage.getItem('showModal') !== '1') {
      this.showModal();
      sessionStorage.setItem('showModal', '1');
    }
    document.querySelector(".modal_close")!.addEventListener("click", this.hideModal.bind(this));
    window.onclick = (event) => {
      if (event.target === this.modal) {
        this.hideModal();
      }
    }



    const slides = document.getElementById("slides")!;
    const allSlides = document.querySelectorAll(".slide__down");
    const slidesLength = allSlides.length;
    const slideWidth = (allSlides[0] as HTMLElement).offsetWidth;

    let index = 0;
    let posX1: number;
    let posX2;
    let initialPosition: number;
    let finalPosition;
    let spaceBetween=5;
    let firstSlideleft=55;

    let canISlide = true;

    const prev = document.getElementById("prev")!;
    const next = document.getElementById("next")!;

    const firstSlide = allSlides[0];
    const lastSlide = allSlides[allSlides.length - 1];
    const secondlastSlide = allSlides[allSlides.length - 2];
    const thirdlastSlide = allSlides[allSlides.length - 3];

    const cloneFirstSlide = firstSlide.cloneNode(true);
    const cloneLastSlide = lastSlide.cloneNode(true);
    const cloneSecondlastSlide = secondlastSlide.cloneNode(true);
    const cloneThirdlastSlide = thirdlastSlide.cloneNode(true);

    slides.appendChild(cloneFirstSlide);
    slides.append(cloneThirdlastSlide);
    slides.insertBefore(cloneLastSlide, firstSlide);
    slides.insertBefore(cloneSecondlastSlide, cloneLastSlide);
    slides.insertBefore(cloneThirdlastSlide, cloneSecondlastSlide);

    next.addEventListener("click", () => switchSlide("next", undefined));
    prev.addEventListener("click", () => switchSlide("prev", undefined));

    slides.addEventListener("transitionend", checkIndex);

    slides.addEventListener("mousedown", dragStart);
    slides.addEventListener("touchstart", dragStart);
    slides.addEventListener("touchmove", dragMove);
    slides.addEventListener("touchend", dragEnd);

    function dragStart(e: MouseEvent | TouchEvent) {
      e.preventDefault();
      initialPosition = slides.offsetLeft;

      if (e.type == "touchstart") {
        const touchEvent = e as TouchEvent; // Ép kiểu về TouchEvent
        posX1 = touchEvent.touches[0].clientX; // Truy cập thuộc tính touches
      } else {
        const mouseEvent = e as MouseEvent; // Ép kiểu về MouseEvent
        posX1 = mouseEvent.clientX;

        document.onmouseup = dragEnd;
        document.onmousemove = dragMove;
      }
    }
    function dragMove(e: MouseEvent | TouchEvent) {
      if (e.type == "touchmove") {
        const touchEvent = e as TouchEvent;
        posX2 = posX1 - touchEvent.touches[0].clientX;
        posX1 = touchEvent.touches[0].clientX;
      } else {
        const mouseEvent = e as MouseEvent;
        posX2 = posX1 - mouseEvent.clientX;
        posX1 = mouseEvent.clientX;
      }

      slides.style.left = `${slides.offsetLeft - posX2}px`;
    }

    function dragEnd() {
      /*
        three possibilities:
        1. next slide
        2. prev slide
        3. stay still
        */
      finalPosition = slides.offsetLeft;
      if (finalPosition - initialPosition < -200) {
        switchSlide("next", "dragging");
      } else if (finalPosition - initialPosition > 200) {
        switchSlide("prev", "dragging");
      } else {
        slides.style.left = `${initialPosition}px`;
      }

      document.onmouseup = null;
      document.onmousemove = null;
    }

    function switchSlide(arg: string, arg2: string | undefined) {
      slides.classList.add("transition");

      if (canISlide) {
        if (!arg2) {
          initialPosition = slides.offsetLeft;
        }
        if (arg == "prev") {
          slides.style.left = `${initialPosition + (slideWidth +spaceBetween) }px`;
          index--;
        } else {
          slides.style.left = `${initialPosition -  (slideWidth +spaceBetween)}px`;
          index++;
        }
      }

      canISlide = false;
    }

    function checkIndex() {
      slides.classList.remove("transition");

      if (index == -1) {
        slides.style.left = `-${slidesLength * slideWidth  -firstSlideleft}px`;
        index = slidesLength - 1;
      }

      if (index == slidesLength) {
        slides.style.left = `-${1 * slideWidth - firstSlideleft}px`;
        index = 0;
      }

      canISlide = true;
    }

    setInterval(switchSlide,5000);


  }
  showModal() {
    this.modal.classList.add("open");
  }

  hideModal() {
    this.modal.classList.remove("open");
  }


  Detail(p:any){
    this.router.navigate(['chitietsp',p._id])
    window.scrollTo(0, 0);
  }
}
