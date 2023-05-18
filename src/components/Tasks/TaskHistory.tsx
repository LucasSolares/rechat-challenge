import { Box, Divider, Typography } from '@mui/material';

import { ITask } from '../../interfaces';
import { statusesNamesMap } from '../../utils';

interface OwnProps {
  task: ITask;
}

export type TaskHistoryProps = OwnProps;
const TaskHistory = ({ task }: TaskHistoryProps) => {
  return (
    <Box my={4} mx={4} maxHeight="400px" overflow="scroll">
      {task.history.map(({ updatedAt, title, description, status }, index) => (
        <Box key={index}>
          <Divider />
          <Box key={index} my={2} mx={2}>
            {updatedAt && (
              <Typography variant="body2" gutterBottom>
                {updatedAt.toLocaleString()}{' '}
              </Typography>
            )}
            {title && (
              <Typography variant="body1" gutterBottom>
                Title has changed to{' '}
                <Typography component="span" fontWeight="bold">
                  {title}
                </Typography>
              </Typography>
            )}
            {description && (
              <Typography variant="body1" gutterBottom>
                Description has changed to{' '}
                <Typography component="span" fontWeight="bold">
                  {description}
                </Typography>
              </Typography>
            )}
            {status && (
              <Typography variant="body1" gutterBottom>
                Status has changed to{' '}
                <Typography component="span" fontWeight="bold">
                  {statusesNamesMap[status]}
                </Typography>
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TaskHistory;
