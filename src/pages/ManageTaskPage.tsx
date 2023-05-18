import { AppBar, Breadcrumbs, Link, Toolbar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useLoaderData, Link as RouterLink } from 'react-router-dom';

import { ITask } from '../interfaces';
import ManageTaskForm from '../components/Tasks/form/ManageTaskForm';
import TaskHistory from '../components/Tasks/TaskHistory';

const ManageTaskPage = () => {
  const task = useLoaderData() as ITask;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              sx={{ color: 'white', cursor: 'pointer' }}
              component={RouterLink}
              to="/"
            >
              Manage Tasks
            </Link>
            <Link
              underline="hover"
              color="inherit"
              sx={{ color: 'white', cursor: 'pointer' }}
            >
              Edit Task - {task.title}
            </Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <Grid container columns={{ xs: 1, md: 3, lg: 6 }}>
        <Grid xs={1} md={1} lg={1}>
          <ManageTaskForm task={task} />
        </Grid>
        <Grid xs={1} md={2} lg={5}>
          <TaskHistory task={task} />
        </Grid>
      </Grid>
    </>
  );
};

export default ManageTaskPage;
