export class Blog{
  constructor(
  public _id:any=null,
  public title:string []=[],
  public position: number=0,
  public img:string[]=[],
  public category:string="",
  public tag:string[]=[],
  public description: string="",
  public author:string[]=[],
  public displayDate:Date = new Date()){}
}
