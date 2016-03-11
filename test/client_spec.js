import Notification from '../lib';
import AWS from 'mock-aws';

const SERVICE_NAME = 'SNS';

describe('Notification', () => {
  describe('#registerEndpoint', () => {
    beforeEach(() => {
      AWS.mock(SERVICE_NAME, 'createPlatformEndpoint', { EndpointArn: 'arn' });
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
        AWS.restore(SERVICE_NAME, 'createPlatformEndpoint');
      });
    })
  });
});
