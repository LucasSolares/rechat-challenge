import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { ITask } from '../../interfaces';
import {
  availableStatusesChanges,
  statusColorsMap,
  statusesNamesMap,
} from '../../utils';
import { useTasksService } from '../../hooks/task.hooks';
import { TaskStatus } from '../../enums';

interface OwnProps {
  task: ITask;
}

export type TaskCardProps = OwnProps;

const TaskStatusChangeSelect = ({ task }: TaskCardProps) => {
  const { updateTask } = useTasksService();
  const availableStatuses = availableStatusesChanges[task.status];

  const handleChange = ({ target: { value } }: SelectChangeEvent) => {
    updateTask(task.id, { status: value as TaskStatus });
  };

  return (
    <Select
      onClick={(e) => e.stopPropagation()}
      value={task.status}
      onChange={handleChange}
      fullWidth
      sx={{
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '0',
          borderRadius: '0',
        },
        backgroundColor: statusColorsMap[task.status].background,
        color: statusColorsMap[task.status].foreground,
      }}
    >
      <MenuItem value={task.status} disabled>
        {statusesNamesMap[task.status]}
      </MenuItem>
      {availableStatuses.map((status) => (
        <MenuItem key={status} value={status}>
          {statusesNamesMap[status]}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TaskStatusChangeSelect;
