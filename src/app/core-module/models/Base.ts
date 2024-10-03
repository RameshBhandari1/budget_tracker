// Base class
export class BaseModel {
  private _id?: any;
  createdDate?: Date = new Date();
  lastModifiedDate?: Date;

  get id(): any {
    return this._id;
  }

  set id(value: any) {
    this._id = btoa(value);
  }
}
