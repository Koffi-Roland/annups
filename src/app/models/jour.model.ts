import { JourOuvrable } from "./enum.jourouvrable";

export class Jour {

   public  id?: any;
   public  label?: JourOuvrable;
   public  estOuvrable?: boolean;

    constructor(id: any) {
        this.id = id ? id : null;

    }


}
