import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { TasksContext } from '../../providers/TasksProvider';
import TaskCard from './TaskCard';

const TaskList = () => {
  const { tasks } = useContext(TasksContext);

  if (!tasks.length) {
    return (
      <Typography mx="1rem" my="3rem">
        You have nothing to do. Get some sleep!
      </Typography>
    );
  }

  return (
    <Box my="3rem" mx="1rem">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 64 }}
      >
        {tasks.map((task) => (
          <Grid xs={2} sm={4} md={4} lg={6} key={task.id}>
            <TaskCard task={task} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskList;
