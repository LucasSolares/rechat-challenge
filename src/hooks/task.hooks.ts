import { useCallback, useContext } from 'react';

import { ITask } from '../interfaces';
import { TasksContext } from '../providers/TasksProvider';
import { TaskLocalStorageKeys, TaskStatus } from '../enums';
import { availableStatusesChanges } from '../utils';

export const useTasksService = () => {
  const { tasks } = useContext(TasksContext);

  const getTaskById = useCallback(
    (id: number) => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );

  const addTask = useCallback(
    (
      task: Omit<ITask, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'history'>
    ): ITask => {
      const id = tasks.length + 1;

      const taskFormatted = {
        ...task,
        id,
        status: TaskStatus.Todo,
        createdAt: new Date(),
        updatedAt: new Date(),
        history: [],
      };

      localStorage.setItem(
        TaskLocalStorageKeys.Tasks,
        JSON.stringify([...tasks, taskFormatted])
      );
      window.dispatchEvent(new Event('storage'));

      return taskFormatted;
    },
    [tasks]
  );

  const updateTask = useCallback(
    (
      id: number,
      task: Partial<Omit<ITask, 'id' | 'createdAt' | 'updatedAt' | 'history'>>
    ): ITask => {
      const currentTaskIndex = tasks.findIndex((task) => task.id === id);

      const currentTasks = [...tasks];
      const currentTask = currentTasks[currentTaskIndex];

      const availableStatuses = availableStatusesChanges[currentTask.status];

      if (
        task.status &&
        task.status !== currentTask.status &&
        !availableStatuses.includes(task.status)
      ) {
        throw new Error('Invalid status change');
      }

      const historyItem: Partial<ITask> = {
        title: currentTask.title !== task.title ? task.title : undefined,
        description:
          currentTask.description !== task.description
            ? task.description
            : undefined,
        status: currentTask.status !== task.status ? task.status : undefined,
        updatedAt: new Date(),
      };

      currentTasks[currentTaskIndex] = {
        ...currentTask,
        ...task,
        history: [...currentTask.history, historyItem],
      };

      localStorage.setItem(
        TaskLocalStorageKeys.Tasks,
        JSON.stringify(currentTasks)
      );
      window.dispatchEvent(new Event('storage'));

      return currentTasks[currentTaskIndex];
    },
    [tasks]
  );

  return {
    addTask,
    updateTask,

    getTaskById,
  };
};
