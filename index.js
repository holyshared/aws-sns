var Promise = require('bluebird');

/**
 * Create notification client for Amazon SNS
 * @param AWS.SNS
 * @param Object
 */
function Notification(client, options) {
  this.client = client;
  this.options = options || {};
}

/**
 * Create a new endpoint for iOS / Android user
 * @param Object
 *   platform - iOS / Android
 *   deviceToken - iOS / Android device token
 *   attributes - user attributes
 *   userAttributes - user attributes
 * @return Promise<String> - return endpoint arn
 */
Notification.prototype.registerEndpoint = function(params) {
  var sns = this.client;
  var arn = this.options.platforms[params.platform];
  var request = {
    PlatformApplicationArn: arn,
    Token: params.deviceToken,
    Attributes: params.attributes,
    CustomUserData: params.userValue
  };

  return new Promise(function(resolve, reject) {
    sns.createPlatformEndpoint(request, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result.EndpointArn);
    });
  });
}

/**
 * Remove a endpoint from platform application
 * @param String endpoint - endpoint arn
 * @return Promise<void>
 */
Notification.prototype.unregisterEndpoint = function(endpoint) {
  var sns = this.client;
  var request = {
    EndpointArn: endpoint
  };

  return new Promise(function(resolve, reject) {
    sns.deleteEndpoint(request, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * Publish message
 * @param Object
 *     message  -
 *     endpoint -
 * @return Promise<void>
 */
Notification.prototype.publishToEndpoint = function (params) {
  var sns = this.client;
  var request = {
    Message: params.message,
    TargetArn: params.endpoint
  };

  return new Promise(function(resolve, reject) {
    sns.publish(request, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result.MessageId);
    });
  });
}

/**
 * Publish message for Topic
 * @param Object
 *     message  -
 *     endpoint -
 * @return Promise<void>
 */
Notification.prototype.publishToTopic = function (params) {
  var sns = this.client;
  var request = {
    Message: params.message,
    TopicArn: params.endpoint
  };

  return new Promise(function(resolve, reject) {
    sns.publish(request, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result.MessageId);
    });
  });
}

/**
 * Create topic
 * @param String name
 * @return Promise<void>
 */
Notification.prototype.registerTopic = function (name) {
  var sns = this.client;
  var params = {
    Name: name
  };

  return new Promise(function(resolve, reject) {
    sns.createTopic(params, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result.TopicArn);
    });
  });
}

Notification.prototype.subscribeTopic = function(params) {
  var sns = this.client;
  var params = {
    Protocol: 'application', // iOS / Android
    TopicArn: params.topic,
    Endpoint: params.endpoint
  };

  return new Promise(function(resolve, reject) {
    sns.subscribe(params, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result.SubscriptionArn);
    });
  });
}

Notification.prototype.unsubscribeTopic = function(arn) {
  var sns = this.client;
  var params = {
    SubscriptionArn: arn
  };

  return new Promise(function(resolve, reject) {
    sns.unsubscribe(params, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

Notification.prototype.replaceDeviceToken = function(endpoint, deviceToken) {
  var sns = this.client;
  var params = {
    EndpointArn: endpoint,
    Attributes: {
      Token: deviceToken
    }
  };

  return new Promise(function(resolve, reject) {
    sns.setEndpointAttributes(params, function(err, result) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

module.exports = Notification;
