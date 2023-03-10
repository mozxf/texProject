import { Timestamp } from 'firebase/firestore';

export interface ITask {
  id: string;
  description: string;
  deadline: Timestamp;
  isCompleted: boolean;
  priority: 'high' | 'normal' | 'low';
}

export interface ITaskDTO {
  description: string;
  deadline: Date;
  priority: 'high' | 'normal' | 'low';
}
