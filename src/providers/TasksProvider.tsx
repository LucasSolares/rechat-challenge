import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import { TaskLocalStorageKeys } from '../enums';
import { ITask } from '../interfaces';

export const TasksContext = createContext<{ tasks: ITask[] }>({
  tasks: [],
});

const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const setTasksFromLocalStorage = () => {
      const tasks = localStorage.getItem(TaskLocalStorageKeys.Tasks);
      if (tasks) {
        setTasks(JSON.parse(tasks));
      }
    };

    const handleStorageListener = () => setTasksFromLocalStorage();

    window.addEventListener('storage', handleStorageListener);

    setTasksFromLocalStorage();

    return () => window.removeEventListener('storage', handleStorageListener);
  }, []);

  return (
    <TasksContext.Provider value={{ tasks }}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;
