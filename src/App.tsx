import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { TaskLocalStorageKeys } from './enums';
import { ITask } from './interfaces';

const HomePage = lazy(() => import('./pages/HomePage'));
const ManageTaskPage = lazy(() => import('./pages/ManageTaskPage'));

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },

    {
      path: '/manage-task/:id',
      element: <ManageTaskPage />,
      errorElement: <div>Not Found</div>,
      loader: async ({ params: { id } }) => {
        if (id) {
          const tasks = JSON.parse(
            localStorage.getItem(TaskLocalStorageKeys.Tasks) || '[]'
          ) as ITask[];

          const task = tasks.find((task) => task.id === Number(id));
          return task;
        }

        return null;
      },
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
