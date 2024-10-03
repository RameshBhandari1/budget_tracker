// model for login response/ for current login user
export class LoginResponseModel {
  id?:string;
  email?: string;
  fullName?: string;
  createdDate?: Date;
  token?:string;
}
