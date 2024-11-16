import { z } from 'zod';
import { UserSchema } from '../User';

export const PostUserRequestSchema = UserSchema.omit({ createdDate: true });

export type PostUserRequest = z.infer<typeof PostUserRequestSchema>;
