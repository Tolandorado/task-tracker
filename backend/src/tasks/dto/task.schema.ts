import { z } from 'zod';

export const CreateTaskSchema = z.object({
  description: z.string().min(1, { message: 'Description cannot be empty' }),
});
export type TCreateTask = z.infer<typeof CreateTaskSchema>;

export const StopTaskSchema = z.object({
  id: z.string().uuid({ message: 'Invalid UUID format' }),
});
export type TStopTask = z.infer<typeof StopTaskSchema>;

export const AddCompletedTaskSchema = z.object({
  description: z.string().min(1, { message: 'Description cannot be empty' }),
  start_at: z.string().datetime({ message: 'Invalid date string' }),
  end_at: z.string().datetime({ message: 'Invalid date string' }),
});
export type TAddCompletedTaskSchema = z.infer<typeof AddCompletedTaskSchema>;

export const TaskSchema = z.object({
  id: z.string().uuid({ message: 'Invalid UUID format' }),
  description: z.string().min(1, { message: 'Description cannot be empty' }),
  start_at: z.string().datetime({ message: 'Invalid date string' }),
  end_at: z.string().datetime({ message: 'Invalid date string' }).nullable().optional(),
  status: z.enum(['active', 'done']),
});
export type TTask = z.infer<typeof TaskSchema>;
