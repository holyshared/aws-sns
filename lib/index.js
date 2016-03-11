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
//# sourceMappingURL=data:application/json;base64,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RCxFQUFNLE1BQU4sRUFBaUI7QUFDekQsY0FBSSxHQUFKLEVBQVM7QUFDUCxtQkFBTyxPQUFPLEdBQVAsQ0FBUCxDQURPO1dBQVQ7QUFHQSxvQkFKeUQ7U0FBakIsQ0FBMUMsQ0FEc0M7T0FBckIsQ0FBbkIsQ0FSd0M7Ozs7U0EvR3ZCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJ2JsdWViaXJkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90aWZpY2F0aW9uIHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgfVxuICByZWdpc3RlckVuZHBvaW50KHBhcmFtcykge1xuICAgIGxldCBhcm4gPSB0aGlzLm9wdGlvbnMucGxhdGZvcm1zW3BhcmFtcy5wbGF0Zm9ybV07XG4gICAgbGV0IHJlcXVlc3QgPSB7XG4gICAgICBQbGF0Zm9ybUFwcGxpY2F0aW9uQXJuOiBhcm4sXG4gICAgICBUb2tlbjogcGFyYW1zLmRldmljZVRva2VuLFxuICAgICAgQXR0cmlidXRlczogcGFyYW1zLmF0dHJpYnV0ZXMsXG4gICAgICBDdXN0b21Vc2VyRGF0YTogcGFyYW1zLnVzZXJWYWx1ZVxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT7jgIB7XG4gICAgICB0aGlzLmNsaWVudC5jcmVhdGVQbGF0Zm9ybUVuZHBvaW50KHJlcXVlc3QsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0LkVuZHBvaW50QXJuKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHVucmVnaXN0ZXJFbmRwb2ludChlbmRwb2ludCkge1xuICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgRW5kcG9pbnRBcm46IGVuZHBvaW50XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC5kZWxldGVFbmRwb2ludChyZXF1ZXN0LCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGVuZHBvaW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHB1Ymxpc2hUb0VuZHBvaW50KHBhcmFtcykge1xuICAgIHZhciByZXF1ZXN0ID0ge1xuICAgICAgTWVzc2FnZTogcGFyYW1zLm1lc3NhZ2UsXG4gICAgICBUYXJnZXRBcm46IHBhcmFtcy5lbmRwb2ludFxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jbGllbnQucHVibGlzaChyZXF1ZXN0LCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdC5NZXNzYWdlSWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGlzaFRvVG9waWMocGFyYW1zKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICBNZXNzYWdlOiBwYXJhbXMubWVzc2FnZSxcbiAgICAgIFRvcGljQXJuOiBwYXJhbXMuZW5kcG9pbnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LnB1Ymxpc2gocmVxdWVzdCwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuTWVzc2FnZUlkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJlZ2lzdGVyVG9waWMobmFtZSkge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBOYW1lOiBuYW1lXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC5jcmVhdGVUb3BpYyhwYXJhbXMsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0LlRvcGljQXJuKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHN1YnNjcmliZVRvcGljKHBhcmFtcykge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBQcm90b2NvbDogJ2FwcGxpY2F0aW9uJywgLy8gaU9TIC8gQW5kcm9pZFxuICAgICAgVG9waWNBcm46IHBhcmFtcy50b3BpYyxcbiAgICAgIEVuZHBvaW50OiBwYXJhbXMuZW5kcG9pbnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LnN1YnNjcmliZShwYXJhbXMsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0LlN1YnNjcmlwdGlvbkFybik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICB1bnN1YnNjcmliZVRvcGljKGFybikge1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICBTdWJzY3JpcHRpb25Bcm46IGFyblxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jbGllbnQudW5zdWJzY3JpYmUocGFyYW1zLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXBsYWNlRGV2aWNlVG9rZW4oZW5kcG9pbnQsIGRldmljZVRva2VuKSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIEVuZHBvaW50QXJuOiBlbmRwb2ludCxcbiAgICAgIEF0dHJpYnV0ZXM6IHtcbiAgICAgICAgVG9rZW46IGRldmljZVRva2VuXG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC5zZXRFbmRwb2ludEF0dHJpYnV0ZXMocGFyYW1zLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19