export class BaseModel {
    Id: number;
    StatusId: number;
    CreatedDate: string;
    UpdatedDate: string;

    constructor(){
    const currentDate = new Date().getFullYear() + '-' + ('0' + new Date().getMonth()).slice(-2) + '-' + new Date().getDate();
    this.Id = 0;
    this.StatusId = 1;
    this.CreatedDate = currentDate;
    this.UpdatedDate = currentDate;
    }
  }
  