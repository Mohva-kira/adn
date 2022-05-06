import { Role } from "./manager/role";

export class Users {
  public id: number;
  public name: string;
  public pwd:string;
  public email:string;
  public role!: Role;
  public created_date!:Date;
  public created_user!:number;

  constructor(id:number,name: string,pwd:string,email:string, role: Role, created_date: Date, created_user: number) {
  this.id = id;
  this.name = name;
  this.pwd = pwd;
  this.email = email;
  this.role = role;
  this.created_date = created_date;
  this.created_user = created_user;

  }
  }
