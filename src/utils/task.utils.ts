import { TaskStatus } from '../enums';

export const availableStatusesChanges = {
  [TaskStatus.Todo]: [TaskStatus.InProgress],
  [TaskStatus.InProgress]: [TaskStatus.Blocked, TaskStatus.InQA],
  [TaskStatus.Blocked]: [TaskStatus.InProgress],
  [TaskStatus.InQA]: [TaskStatus.InProgress, TaskStatus.Done],
  [TaskStatus.Done]: [TaskStatus.Deployed],
  [TaskStatus.Deployed]: [] as TaskStatus[],
};

export const statusesNamesMap = {
  [TaskStatus.Todo]: 'To Do',
  [TaskStatus.InProgress]: 'In Progress',
  [TaskStatus.Blocked]: 'Blocked',
  [TaskStatus.InQA]: 'In QA',
  [TaskStatus.Done]: 'Done',
  [TaskStatus.Deployed]: 'Deployed',
};

export const statusColorsMap = {
  [TaskStatus.Todo]: {
    foreground: '#000000',
    background: '#EEEEEE',
  },
  [TaskStatus.InProgress]: {
    foreground: '#FFFFFF',
    background: '#537188',
  },
  [TaskStatus.Blocked]: {
    foreground: '#FFFFFF',
    background: '#B04759',
  },
  [TaskStatus.InQA]: {
    foreground: '#FFFFFF',
    background: '#537188',
  },
  [TaskStatus.Done]: {
    foreground: '#FFFFFF',
    background: '#1B9C85',
  },
  [TaskStatus.Deployed]: {
    foreground: '#FFFFFF',
    background: '#1B9C85',
  },
};
