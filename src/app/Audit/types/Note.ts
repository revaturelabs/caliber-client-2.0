import { Trainee } from './Trainee';

export class Note {
    noteId: number;
    content: string;
    maxVisibility: number;
    qcFeedback: number;
    qcStatus: string;
    noteType: string;
    week: number;
    batchId: number;
    traineeId: number;
    trainee: Trainee;
    noteFlagInputActive: boolean;
}