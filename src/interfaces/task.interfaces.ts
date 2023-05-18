import { TaskStatus } from '../enums';

export interface ITask {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;

  history: Partial<ITask>[];

  createdAt: Date;
  updatedAt: Date;
}
