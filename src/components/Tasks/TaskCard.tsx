import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ITask } from '../../interfaces';
import TaskStatusChangeSelect from './TaskStatusChangeSelect';

interface OwnProps {
  task: ITask;
}

export type TaskCardProps = OwnProps;

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Link to={`/manage-task/${task.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          ':hover': {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <CardContent sx={{ width: '100%' }}>
          <Typography noWrap variant="h6" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
            {task.description}
          </Typography>
        </CardContent>
        <CardActions>
          <TaskStatusChangeSelect task={task} />
        </CardActions>
      </Card>
    </Link>
  );
};

export default TaskCard;
