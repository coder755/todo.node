import { Router } from 'express';
import { SnsMessage, SnsMessageSchema, SubscriptionConfirmationSchema } from '../models/SnsMessage';
// import { broadcastMessage, confirmSubscription } from '../services/NotificationService';

const router = Router();

router.post('/sns-listener', async (req, res) => {
  const { body } = req;
  let snsMessage: SnsMessage;
  try {
    snsMessage = SnsMessageSchema.parse(body);
    if (snsMessage.type === 'SubscriptionConfirmation') {
      const subscriptionRequest = SubscriptionConfirmationSchema.parse(snsMessage);
      // await confirmSubscription(subscriptionRequet);
      console.log(`process SubscriptionConfirmation: ${JSON.stringify(subscriptionRequest)}`);
    }
    // await broadcastMessage(snsMessage);
    res.status(200).send();
  } catch {
    res.status(400).send();
  }
});

export default router;
