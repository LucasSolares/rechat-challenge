import { AppBar, Breadcrumbs, Link, Toolbar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

import TaskList from '../components/Tasks/TaskList';
import ManageTaskForm from '../components/Tasks/form/ManageTaskForm';

const HomePage = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              sx={{ color: 'white', cursor: 'pointer' }}
            >
              Manage Tasks
            </Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, md: 6 }}>
        <Grid xs={1} md={2} lg={1}>
          <ManageTaskForm />
        </Grid>
        <Grid xs={1} md={4} lg={5}>
          <TaskList />
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
