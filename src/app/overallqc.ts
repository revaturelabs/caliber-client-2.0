import { TrainingStatus } from './User/user/types/training-status';
import { TraineeFlag } from './User/user/types/trainee-flag';

export class Overallqc {
   noteid: number =0;
   content:string;
   batchid: number;
   week: number;
   traineeid: number=0;
   type: string = "QC_BATCH";
   QCStatus: string = "Undefined";

   
    constructor() {}
}
