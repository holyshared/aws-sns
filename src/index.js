import { Promise } from 'bluebird';

export default class PushNotificationClient {
  constructor(client, options) {
    this.client = client;
    this.options = options || {};
  }
  registerEndpoint(params) {
    let arn = this.options.platforms[params.platform];
    let request = {
      PlatformApplicationArn: arn,
      Token: params.deviceToken,
      Attributes: params.attributes,
      CustomUserData: params.userValue
    };

    return new Promise((resolve, reject) =>　{
      this.client.createPlatformEndpoint(request, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.EndpointArn);
      });
    });
  }
  unregisterEndpoint(endpoint) {
    var request = {
      EndpointArn: endpoint
    };

    return new Promise((resolve, reject) => {
      this.client.deleteEndpoint(request, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(endpoint);
      });
    });
  }
  publishToEndpoint(params) {
    var request = {
      Message: params.message,
      TargetArn: params.endpoint
    };

    return new Promise((resolve, reject) => {
      this.client.publish(request, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.MessageId);
      });
    });
  }
  publishToTopic(params) {
    var request = {
      Message: params.message,
      TopicArn: params.endpoint
    };

    return new Promise((resolve, reject) => {
      this.client.publish(request, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.MessageId);
      });
    });
  }
  registerTopic(name) {
    var params = {
      Name: name
    };

    return new Promise((resolve, reject) => {
      this.client.createTopic(params, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.TopicArn);
      });
    });
  }
  subscribeTopic(params) {
    var params = {
      Protocol: 'application', // iOS / Android
      TopicArn: params.topic,
      Endpoint: params.endpoint
    };

    return new Promise((resolve, reject) => {
      this.client.subscribe(params, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result.SubscriptionArn);
      });
    });
  }
  unsubscribeTopic(arn) {
    var params = {
      SubscriptionArn: arn
    };

    return new Promise((resolve, reject) => {
      this.client.unsubscribe(params, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(arn);
      });
    });
  }
  replaceDeviceToken(endpoint, deviceToken) {
    var params = {
      EndpointArn: endpoint,
      Attributes: {
        Token: deviceToken
      }
    };

    return new Promise((resolve, reject) => {
      this.client.setEndpointAttributes(params, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(endpoint);
      });
    });
  }
}
