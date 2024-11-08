import { z } from 'zod';

export const SubscriptionConfirmationSchema = z.object({
  token: z.string(),
  topicArn: z.string(),
}).required();

export type SubscriptionConfirmation = z.infer<typeof SubscriptionConfirmationSchema>;

export const SnsMessageSchema = SubscriptionConfirmationSchema.extend({
  type: z.string(),
  messageId: z.string(),
  message: z.string(),
  subscribeURL: z.string(),
}).partial();

export type SnsMessage = z.infer<typeof SnsMessageSchema>;
