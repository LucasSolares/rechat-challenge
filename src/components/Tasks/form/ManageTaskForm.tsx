import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';

import { ITask } from '../../../interfaces';
import schema, { IManageTaskForm } from './schema';
import {
  availableStatusesChanges,
  statusColorsMap,
  statusesNamesMap,
} from '../../../utils';
import { useTasksService } from '../../../hooks/task.hooks';

interface OwnProps {
  task?: ITask;
}

export type ManageTaskFormProps = OwnProps;

const ManageTaskForm = ({ task }: ManageTaskFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<IManageTaskForm>({
    resolver: zodResolver(schema),
    defaultValues: task,
  });
  const navigate = useNavigate();
  const currentFormValues = watch();
  const { updateTask, addTask } = useTasksService();

  const availableStatuses = useMemo(() => {
    if (task) {
      return availableStatusesChanges[task.status];
    }

    return [];
  }, [task]);

  const onSubmit = (data: IManageTaskForm) => {
    if (!task) {
      reset({ description: '', title: '' });
      return addTask(data);
    }

    updateTask(task.id, data);
    return navigate('/', { replace: true });
  };

  const hasChanges = useMemo(() => {
    return !isEqual({ ...task }, { ...task, ...currentFormValues });
  }, [currentFormValues, task]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} mx="2rem" my="2rem">
        <TextField
          label="Title..."
          variant="filled"
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
          inputProps={{ ...register('title') }}
        />
        <TextField
          label="Description"
          variant="filled"
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
          inputProps={{ ...register('description') }}
        />
        {task && (
          <Controller
            name="status"
            control={control}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  sx={{
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '0',
                      borderRadius: '0',
                    },
                    backgroundColor: statusColorsMap[task.status].background,
                    color: statusColorsMap[task.status].foreground,
                  }}
                  fullWidth
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
            }}
          />
        )}

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            type="submit"
            disableElevation
            disabled={task && !hasChanges}
            fullWidth
          >
            Submit
          </Button>

          {task && (
            <Link to="/" replace>
              <Button fullWidth disableElevation variant="contained">
                Cancel
              </Button>
            </Link>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default ManageTaskForm;
