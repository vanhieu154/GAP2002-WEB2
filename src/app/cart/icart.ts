import { ThemePalette } from "@angular/material/core";

export interface Icart{
  tensp: string;
  giasp: number;
  soluong: number;
  hinh: string;
}

export interface Brand {
  name: string;
  hinh: string;
  kichthuoc: string;
  dongia: number;
  soluong: number;
  sotien: number;
  completed: boolean;
  products?: Brand[];
}
