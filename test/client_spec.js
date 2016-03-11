import Notification from '../lib';
import AWS from 'mock-aws';

describe('Notification', () => {
  describe('#registerEndpoint', () => {
    beforeEach(() => {
      AWS.mock('SNS', 'createPlatformEndpoint', { EndpointArn: 'arn' });
    });
    it('returns endpoint for device token', () => {
      let sns = new AWS.SNS();
      let client = new Notification(sns, {
        platforms: {
          ios: 'platform_application_arn'
        }
      });

      return client.registerEndpoint({
        deviceToken: 'device token'
      }).then((endpoint) => {
        assert.equal(endpoint, 'arn');
      }).finally(function() {
        AWS.restore('SNS', 'createPlatformEndpoint');
      });
    })
  });
});
