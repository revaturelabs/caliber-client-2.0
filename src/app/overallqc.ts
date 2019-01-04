import { TrainingStatus } from './User/user/types/training-status';
import { TraineeFlag } from './User/user/types/trainee-flag';


export class Overallqc {
   noteid: Number=0;
   content:string="";
   batchid: Number=0;
   week: Number=1;
   traineeid: Number = 0;
   type: string = "QC_BATCH";
   qcstatus:string = "Undefined";
   updateTime: 1546528285639;
   updateTrainer: null;
   
    constructor() {}
}
