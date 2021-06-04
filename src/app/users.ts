export class Users {
  public id: number;
  public name: string;
  public pwd:string;
  public email:string;
  public created_date!:Date;
  public created_user!:number;

  constructor(id:number,name: string,pwd:string,email:string, created_date: Date, created_user: number) {
  this.id = id;
  this.name = name;
  this.pwd = pwd;
  this.email = email;
  this.created_date = created_date;
  this.created_user = created_user;

  }
  }
