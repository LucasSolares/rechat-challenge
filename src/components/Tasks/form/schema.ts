import zod from 'zod';
import { TaskStatus } from '../../../enums';

export interface IManageTaskForm {
  title: string;
  description: string;
  status?: TaskStatus;
}

export default zod.object({
  title: zod
    .string()
    .min(3, 'The title should have at least 3 characters')
    .max(255, 'The title can have a maximum of 255 characters'),
  description: zod
    .string()
    .min(10, 'The description should have at least 10 characters')
    .max(500, 'The description can have a maximum of 500 characters'),
  status: zod.nativeEnum(TaskStatus).optional(),
});
