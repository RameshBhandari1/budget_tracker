import {BaseModel} from "./Base";

// user model class which extends BaseModel
export class UserModel extends BaseModel {
  password?: string;
  fullName?: string;
  email?: string;
}
