// import { SNSClient, ConfirmSubscriptionCommand } from '@aws-sdk/client-sns';
// import {
//   ElasticLoadBalancingV2Client, DescribeTargetGroupsCommand,
//   DescribeTargetGroupsCommandInput,
// } from '@aws-sdk/client-elastic-load-balancing-v2';
// import { SnsMessage, SubscriptionConfirmation } from '../models/SnsMessage';

// export const confirmSubscription = async ({ token, topicArn }: SubscriptionConfirmation) => {
//   const client = new SNSClient({});
//   const command = new ConfirmSubscriptionCommand({
//     Token: token,
//     TopicArn: topicArn,
//   });
//   const confirmRequest = await client.send(command);
//   return confirmRequest;
// };

// export const broadcastMessage = async (snsMessage: SnsMessage) => {
//   const client = new ElasticLoadBalancingV2Client({});
//   const input: DescribeTargetGroupsCommandInput = {
//     LoadBalancerArn: '1234',
//   };

//   const command = new DescribeTargetGroupsCommand(input);
//   try {
//     const { TargetGroups } = await client.send(command);
//     TargetGroups.
//   }
// };
