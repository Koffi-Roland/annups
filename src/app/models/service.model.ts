export class Service {

  public id?: number;
  public label?: string;
  public sigle?: string;
  //dateMaj: string;
  //  email: string;
  constructor(id: number) {
    this.id = id ? id : null;
   
  }
}
