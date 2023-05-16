import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { TaskLocalStorageKeys } from '../enums';
import { ITask } from '../interfaces';

export const TasksContext = createContext<{ tasks: ITask[] }>({
  tasks: [],
});

const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const handleStorageListener = (e: StorageEvent) => {
      if (e.key === TaskLocalStorageKeys.Tasks && e.newValue) {
        setTasks(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageListener);

    const tasks = localStorage.getItem(TaskLocalStorageKeys.Tasks);
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }

    return () => window.removeEventListener('storage', handleStorageListener);
  }, []);

  return (
    <TasksContext.Provider value={{ tasks }}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;
