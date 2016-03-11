'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Notification = function () {
  function Notification(client, options) {
    _classCallCheck(this, Notification);

    this.client = client;
    this.options = options || {};
  }

  _createClass(Notification, [{
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
          resolve();
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
          resolve();
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
          resolve();
        });
      });
    }
  }]);

  return Notification;
}();

exports.default = Notification;
//# sourceMappingURL=data:application/json;base64,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TixFQUFpQjtBQUN6RCxjQUFJLEdBQUosRUFBUztBQUNQLG1CQUFPLE9BQU8sR0FBUCxDQUFQLENBRE87V0FBVDtBQUdBLG9CQUp5RDtTQUFqQixDQUExQyxDQURzQztPQUFyQixDQUFuQixDQVJ3Qzs7OztTQS9HdkIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpZmljYXRpb24ge1xuICBjb25zdHJ1Y3RvcihjbGllbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB9XG4gIHJlZ2lzdGVyRW5kcG9pbnQocGFyYW1zKSB7XG4gICAgbGV0IGFybiA9IHRoaXMub3B0aW9ucy5wbGF0Zm9ybXNbcGFyYW1zLnBsYXRmb3JtXTtcbiAgICBsZXQgcmVxdWVzdCA9IHtcbiAgICAgIFBsYXRmb3JtQXBwbGljYXRpb25Bcm46IGFybixcbiAgICAgIFRva2VuOiBwYXJhbXMuZGV2aWNlVG9rZW4sXG4gICAgICBBdHRyaWJ1dGVzOiBwYXJhbXMuYXR0cmlidXRlcyxcbiAgICAgIEN1c3RvbVVzZXJEYXRhOiBwYXJhbXMudXNlclZhbHVlXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PuOAgHtcbiAgICAgIHRoaXMuY2xpZW50LmNyZWF0ZVBsYXRmb3JtRW5kcG9pbnQocmVxdWVzdCwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuRW5kcG9pbnRBcm4pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgdW5yZWdpc3RlckVuZHBvaW50KGVuZHBvaW50KSB7XG4gICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICBFbmRwb2ludEFybjogZW5kcG9pbnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LmRlbGV0ZUVuZHBvaW50KHJlcXVlc3QsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHB1Ymxpc2hUb0VuZHBvaW50KHBhcmFtcykge1xuICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgTWVzc2FnZTogcGFyYW1zLm1lc3NhZ2UsXG4gICAgICBUYXJnZXRBcm46IHBhcmFtcy5lbmRwb2ludFxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jbGllbnQucHVibGlzaChyZXF1ZXN0LCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdC5NZXNzYWdlSWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGlzaFRvVG9waWMocGFyYW1zKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICBNZXNzYWdlOiBwYXJhbXMubWVzc2FnZSxcbiAgICAgIFRvcGljQXJuOiBwYXJhbXMuZW5kcG9pbnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LnB1Ymxpc2gocmVxdWVzdCwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuTWVzc2FnZUlkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJlZ2lzdGVyVG9waWMobmFtZSkge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBOYW1lOiBuYW1lXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC5jcmVhdGVUb3BpYyhwYXJhbXMsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0LlRvcGljQXJuKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHN1YnNjcmliZVRvcGljKHBhcmFtcykge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBQcm90b2NvbDogJ2FwcGxpY2F0aW9uJywgLy8gaU9TIC8gQW5kcm9pZFxuICAgICAgVG9waWNBcm46IHBhcmFtcy50b3BpYyxcbiAgICAgIEVuZHBvaW50OiBwYXJhbXMuZW5kcG9pbnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LnN1YnNjcmliZShwYXJhbXMsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0LlN1YnNjcmlwdGlvbkFybik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICB1bnN1YnNjcmliZVRvcGljKGFybikge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBTdWJzY3JpcHRpb25Bcm46IGFyblxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jbGllbnQudW5zdWJzY3JpYmUocGFyYW1zLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXBsYWNlRGV2aWNlVG9rZW4oZW5kcG9pbnQsIGRldmljZVRva2VuKSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIEVuZHBvaW50QXJuOiBlbmRwb2ludCxcbiAgICAgIEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgVG9rZW46IGRldmljZVRva2VuXG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC5zZXRFbmRwb2ludEF0dHJpYnV0ZXMocGFyYW1zLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19