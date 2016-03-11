'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PushNotificationClient = function () {
  function PushNotificationClient(client, options) {
    _classCallCheck(this, PushNotificationClient);

    this.client = client;
    this.options = options || {};
  }

  _createClass(PushNotificationClient, [{
    key: 'registerEndpoint',
    value: function registerEndpoint(params) {
      var _this = this;

      var arn = this.options.platforms[params.platform];
      var request = {
        PlatformApplicationArn: arn,
        Token: params.deviceToken,
        Attributes: params.attributes,
        CustomUserData: params.userValue
      };

      return new _bluebird.Promise(function (resolve, reject) {
        _this.client.createPlatformEndpoint(request, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result.EndpointArn);
        });
      });
    }
  }, {
    key: 'unregisterEndpoint',
    value: function unregisterEndpoint(endpoint) {
      var _this2 = this;

      var request = {
        EndpointArn: endpoint
      };

      return new _bluebird.Promise(function (resolve, reject) {
        _this2.client.deleteEndpoint(request, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(endpoint);
        });
      });
    }
  }, {
    key: 'publishToEndpoint',
    value: function publishToEndpoint(params) {
      var _this3 = this;

      var request = {
        Message: params.message,
        TargetArn: params.endpoint
      };

      return new _bluebird.Promise(function (resolve, reject) {
        _this3.client.publish(request, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result.MessageId);
        });
      });
    }
  }, {
    key: 'publishToTopic',
    value: function publishToTopic(params) {
      var _this4 = this;

      var request = {
        Message: params.message,
        TopicArn: params.endpoint
      };

      return new _bluebird.Promise(function (resolve, reject) {
        _this4.client.publish(request, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result.MessageId);
        });
      });
    }
  }, {
    key: 'registerTopic',
    value: function registerTopic(name) {
      var _this5 = this;

      var params = {
        Name: name
      };

      return new _bluebird.Promise(function (resolve, reject) {
        _this5.client.createTopic(params, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result.TopicArn);
        });
      });
    }
  }, {
    key: 'subscribeTopic',
    value: function subscribeTopic(params) {
      var _this6 = this;

      var params = {
        Protocol: 'application', // iOS / Android
        TopicArn: params.topic,
        Endpoint: params.endpoint
      };

      return new _bluebird.Promise(function (resolve, reject) {
        _this6.client.subscribe(params, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result.SubscriptionArn);
        });
      });
    }
  }, {
    key: 'unsubscribeTopic',
    value: function unsubscribeTopic(arn) {
      var _this7 = this;

      var params = {
        SubscriptionArn: arn
      };

      return new _bluebird.Promise(function (resolve, reject) {
        _this7.client.unsubscribe(params, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(arn);
        });
      });
    }
  }, {
    key: 'replaceDeviceToken',
    value: function replaceDeviceToken(endpoint, deviceToken) {
      var _this8 = this;

      var params = {
        EndpointArn: endpoint,
        Attributes: {
          Token: deviceToken
        }
      };

      return new _bluebird.Promise(function (resolve, reject) {
        _this8.client.setEndpointAttributes(params, function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(endpoint);
        });
      });
    }
  }]);

  return PushNotificationClient;
}();

exports.default = PushNotificationClient;
//# sourceMappingURL=data:application/json;base64,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QTBDLFVBQUMsR0FBRCxFQUFNLE1BQU4sRUFBaUI7QUFDekQsY0FBSSxHQUFKLEVBQVM7QUFDUCxtQkFBTyxPQUFPLEdBQVAsQ0FBUCxDQURPO1dBQVQ7QUFHQSxrQkFBUSxRQUFSLEVBSnlEO1NBQWpCLENBQTFDLENBRHNDO09BQXJCLENBQW5CLENBUndDOzs7O1NBL0d2QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1c2hOb3RpZmljYXRpb25DbGllbnQge1xuICBjb25zdHJ1Y3RvcihjbGllbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB9XG4gIHJlZ2lzdGVyRW5kcG9pbnQocGFyYW1zKSB7XG4gICAgbGV0IGFybiA9IHRoaXMub3B0aW9ucy5wbGF0Zm9ybXNbcGFyYW1zLnBsYXRmb3JtXTtcbiAgICBsZXQgcmVxdWVzdCA9IHtcbiAgICAgIFBsYXRmb3JtQXBwbGljYXRpb25Bcm46IGFybixcbiAgICAgIFRva2VuOiBwYXJhbXMuZGV2aWNlVG9rZW4sXG4gICAgICBBdHRyaWJ1dGVzOiBwYXJhbXMuYXR0cmlidXRlcyxcbiAgICAgIEN1c3RvbVVzZXJEYXRhOiBwYXJhbXMudXNlclZhbHVlXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PuOAgHtcbiAgICAgIHRoaXMuY2xpZW50LmNyZWF0ZVBsYXRmb3JtRW5kcG9pbnQocmVxdWVzdCwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuRW5kcG9pbnRBcm4pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgdW5yZWdpc3RlckVuZHBvaW50KGVuZHBvaW50KSB7XG4gICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICBFbmRwb2ludEFybjogZW5kcG9pbnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LmRlbGV0ZUVuZHBvaW50KHJlcXVlc3QsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZW5kcG9pbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGlzaFRvRW5kcG9pbnQocGFyYW1zKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICBNZXNzYWdlOiBwYXJhbXMubWVzc2FnZSxcbiAgICAgIFRhcmdldEFybjogcGFyYW1zLmVuZHBvaW50XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC5wdWJsaXNoKHJlcXVlc3QsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0Lk1lc3NhZ2VJZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaXNoVG9Ub3BpYyhwYXJhbXMpIHtcbiAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgIE1lc3NhZ2U6IHBhcmFtcy5tZXNzYWdlLFxuICAgICAgVG9waWNBcm46IHBhcmFtcy5lbmRwb2ludFxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jbGllbnQucHVibGlzaChyZXF1ZXN0LCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdC5NZXNzYWdlSWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmVnaXN0ZXJUb3BpYyhuYW1lKSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIE5hbWU6IG5hbWVcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LmNyZWF0ZVRvcGljKHBhcmFtcywgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuVG9waWNBcm4pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgc3Vic2NyaWJlVG9waWMocGFyYW1zKSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIFByb3RvY29sOiAnYXBwbGljYXRpb24nLCAvLyBpT1MgLyBBbmRyb2lkXG4gICAgICBUb3BpY0FybjogcGFyYW1zLnRvcGljLFxuICAgICAgRW5kcG9pbnQ6IHBhcmFtcy5lbmRwb2ludFxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jbGllbnQuc3Vic2NyaWJlKHBhcmFtcywgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuU3Vic2NyaXB0aW9uQXJuKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHVuc3Vic2NyaWJlVG9waWMoYXJuKSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIFN1YnNjcmlwdGlvbkFybjogYXJuXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC51bnN1YnNjcmliZShwYXJhbXMsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoYXJuKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJlcGxhY2VEZXZpY2VUb2tlbihlbmRwb2ludCwgZGV2aWNlVG9rZW4pIHtcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgRW5kcG9pbnRBcm46IGVuZHBvaW50LFxuICAgICAgQXR0cmlidXRlczoge1xuICAgICAgICBUb2tlbjogZGV2aWNlVG9rZW5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LnNldEVuZHBvaW50QXR0cmlidXRlcyhwYXJhbXMsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZW5kcG9pbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==