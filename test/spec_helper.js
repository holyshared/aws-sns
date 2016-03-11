import Mock from 'mock-aws';
import PushNotificationClient from '../lib';

export const SERVICE_NAME = 'SNS';
export const AWS = Mock;
export const clientMock = () => {
  let sns = new AWS.SNS();
  let client = new PushNotificationClient(sns, {
    platforms: {
      ios: 'platform_application_arn'
    }
  });
  return client;
}
