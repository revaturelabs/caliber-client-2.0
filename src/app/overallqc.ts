import { TrainingStatus } from './User/user/types/training-status';
import { TraineeFlag } from './User/user/types/trainee-flag';

export class Overallqc {
   noteid: Number;
   content:string="";
   batchid: Number = 3000;
   week: Number =6;
   traineeid: Number = 2000;
   type: string = "QC_BATCH";
   qcstatus:string = "Undefined";

   
    constructor() {}
}
