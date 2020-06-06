export class ChangePassword {

    public id?: number;
    public currentpassword?: string;
    public password?: string;
    constructor(id: any) {
        this.id = id ? id : null;
       

    }

}