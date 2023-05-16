import { TaskStatus } from '../enums';

export interface ITask {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;

  history: ITask[];

  createdAt: Date;
  updatedAt: Date;
}
