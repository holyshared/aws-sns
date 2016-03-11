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
  describe('#unregisterEndpoint', () => {
    beforeEach(() => {
      AWS.mock(SERVICE_NAME, 'deleteEndpoint', null);
    });
    it('returns unregister endpoint arn', () => {
      let sns = new AWS.SNS();
      let client = new Notification(sns, {
        platforms: {
          ios: 'platform_application_arn'
        }
      });

      return client.unregisterEndpoint('endpoint_arn').then((endpoint) => {
        assert.equal(endpoint, 'endpoint_arn');
      }).finally(function() {
        AWS.restore(SERVICE_NAME, 'deleteEndpoint');
      });
    })
  });

  describe('#publishToEndpoint', () => {
    beforeEach(() => {
      AWS.mock(SERVICE_NAME, 'publish', { MessageId: 'message_id' });
    });
    it('returns published message identity', () => {
      let sns = new AWS.SNS();
      let client = new Notification(sns, {
        platforms: {
          ios: 'platform_application_arn'
        }
      });
      let params = {
        message: 'ok',
        endpoint: 'endpoint_arn'
      };

      return client.publishToEndpoint(params).then((messageId) => {
        assert.equal(messageId, 'message_id');
      }).finally(function() {
        AWS.restore(SERVICE_NAME, 'publish');
      });
    })
  });

  describe('#publishToTopic', () => {
    beforeEach(() => {
      AWS.mock(SERVICE_NAME, 'publish', { MessageId: 'message_id' });
    });
    it('returns published message identity', () => {
      let sns = new AWS.SNS();
      let client = new Notification(sns, {
        platforms: {
          ios: 'platform_application_arn'
        }
      });
      let params = {
        message: 'ok',
        endpoint: 'topic_arn'
      };

      return client.publishToTopic(params).then((messageId) => {
        assert.equal(messageId, 'message_id');
      }).finally(function() {
        AWS.restore(SERVICE_NAME, 'publish');
      });
    })
  });

});
