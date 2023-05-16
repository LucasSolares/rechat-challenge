import { useCallback, useContext } from 'react';

import { ITask } from '../interfaces';
import { TasksContext } from '../providers/TasksProvider';
import { TaskLocalStorageKeys } from '../enums';

export const useTasksService = () => {
  const { tasks } = useContext(TasksContext);

  const addTask = useCallback(
    (task: Omit<ITask, 'id'>): ITask => {
      const id = tasks.length + 1;

      localStorage.setItem(
        TaskLocalStorageKeys.Tasks,
        JSON.stringify([...tasks, { ...task, id }])
      );

      return { ...task, id };
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

      currentTasks[currentTaskIndex] = {
        ...currentTasks[currentTaskIndex],
        ...task,
        history: [
          ...currentTasks[currentTaskIndex].history,
          { ...currentTasks[currentTaskIndex] },
        ],
      };

      localStorage.setItem(
        TaskLocalStorageKeys.Tasks,
        JSON.stringify(currentTasks)
      );

      return currentTasks[currentTaskIndex];
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (id: number): void => {
      const currentTaskIndex = tasks.findIndex((task) => task.id === id);

      const currentTasks = [...tasks];

      currentTasks.splice(currentTaskIndex, 1);

      localStorage.setItem(
        TaskLocalStorageKeys.Tasks,
        JSON.stringify(currentTasks)
      );
    },
    [tasks]
  );

  return {
    addTask,
    updateTask,
    deleteTask,
  };
};
