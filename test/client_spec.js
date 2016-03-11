import assert from 'power-assert';
import { AWS, clientMock, SERVICE_NAME } from './spec_helper';

describe('Notification', () => {
  describe('#registerEndpoint', () => {
    beforeEach(() => {
      AWS.mock(SERVICE_NAME, 'createPlatformEndpoint', { EndpointArn: 'arn' });
    });
    it('should be rgister endpoint', () => {
      let client = clientMock();

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
    it('should be unrgister endpoint', () => {
      let client = clientMock();

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
    it('should be published message', () => {
      let client = clientMock();
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
    it('should be published message', () => {
      let client = clientMock();
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

  describe('#registerTopic', () => {
    beforeEach(() => {
      AWS.mock(SERVICE_NAME, 'createTopic', { TopicArn: 'topic_arn' });
    });
    it('should be register topic', () => {
      let client = clientMock();

      return client.registerTopic('topic').then((endpoint) => {
        assert.equal(endpoint, 'topic_arn');
      }).finally(function() {
        AWS.restore(SERVICE_NAME, 'createTopic');
      });
    })
  });

  describe('#subscribeTopic', () => {
    beforeEach(() => {
      AWS.mock(SERVICE_NAME, 'subscribe', { SubscriptionArn: 'subscription_arn' });
    });
    it('should be subscribe topic', () => {
      let client = clientMock();
      let params = {
        topic: 'topic',
        endpoint: 'topic_sbscribe_endpoint'
      }

      return client.subscribeTopic(params).then((subscription) => {
        assert.equal(subscription, 'subscription_arn');
      }).finally(function() {
        AWS.restore(SERVICE_NAME, 'subscribe');
      });
    })
  });

  describe('#unsubscribeTopic', () => {
    beforeEach(() => {
      AWS.mock(SERVICE_NAME, 'unsubscribe', null);
    });
    it('should be unsubscribe topic', () => {
      let client = clientMock();

      return client.unsubscribeTopic('subscription_arn').then((subscription) => {
        assert.equal(subscription, 'subscription_arn');
      }).finally(function() {
        AWS.restore(SERVICE_NAME, 'unsubscribe');
      });
    })
  });

  describe('#replaceDeviceToken', () => {
    beforeEach(() => {
      AWS.mock(SERVICE_NAME, 'setEndpointAttributes', null);
    });
    it('should be replace device token', () => {
      let client = clientMock();

      return client.replaceDeviceToken('endpoint', 'new_device_token').then((endpoint) => {
        assert.equal(endpoint, 'endpoint');
      }).finally(function() {
        AWS.restore(SERVICE_NAME, 'setEndpointAttributes');
      });
    })
  });

});
