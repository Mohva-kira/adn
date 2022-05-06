import { Role } from './role';

export class User {
  role!: Role;
  id!: Number;
  name!: String;
  email!: String;
  password!: String;
  status!: Boolean;
  created_date!: Date;
  created_user!: Number;
}
