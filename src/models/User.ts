import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  userName: z.string(),
  firstName: z.string(),
  familyName: z.string(),
  email: z.string(),
  createdDate: z.date(),
});

export type User = z.infer<typeof UserSchema>;
