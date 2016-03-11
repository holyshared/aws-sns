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

  return Notification;
}();

exports.default = Notification;
//# sourceMappingURL=data:application/json;base64,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QyxVQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWlCO0FBQ3pELGNBQUksR0FBSixFQUFTO0FBQ1AsbUJBQU8sT0FBTyxHQUFQLENBQVAsQ0FETztXQUFUO0FBR0Esa0JBQVEsUUFBUixFQUp5RDtTQUFqQixDQUExQyxDQURzQztPQUFyQixDQUFuQixDQVJ3Qzs7OztTQS9HdkIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9taXNlIH0gZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RpZmljYXRpb24ge1xuICBjb25zdHJ1Y3RvcihjbGllbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB9XG4gIHJlZ2lzdGVyRW5kcG9pbnQocGFyYW1zKSB7XG4gICAgbGV0IGFybiA9IHRoaXMub3B0aW9ucy5wbGF0Zm9ybXNbcGFyYW1zLnBsYXRmb3JtXTtcbiAgICBsZXQgcmVxdWVzdCA9IHtcbiAgICAgIFBsYXRmb3JtQXBwbGljYXRpb25Bcm46IGFybixcbiAgICAgIFRva2VuOiBwYXJhbXMuZGV2aWNlVG9rZW4sXG4gICAgICBBdHRyaWJ1dGVzOiBwYXJhbXMuYXR0cmlidXRlcyxcbiAgICAgIEN1c3RvbVVzZXJEYXRhOiBwYXJhbXMudXNlclZhbHVlXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PuOAgHtcbiAgICAgIHRoaXMuY2xpZW50LmNyZWF0ZVBsYXRmb3JtRW5kcG9pbnQocmVxdWVzdCwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuRW5kcG9pbnRBcm4pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgdW5yZWdpc3RlckVuZHBvaW50KGVuZHBvaW50KSB7XG4gICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICBFbmRwb2ludEFybjogZW5kcG9pbnRcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LmRlbGV0ZUVuZHBvaW50KHJlcXVlc3QsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZW5kcG9pbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcHVibGlzaFRvRW5kcG9pbnQocGFyYW1zKSB7XG4gICAgdmFyIHJlcXVlc3QgPSB7XG4gICAgICBNZXNzYWdlOiBwYXJhbXMubWVzc2FnZSxcbiAgICAgIFRhcmdldEFybjogcGFyYW1zLmVuZHBvaW50XG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC5wdWJsaXNoKHJlcXVlc3QsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUocmVzdWx0Lk1lc3NhZ2VJZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBwdWJsaXNoVG9Ub3BpYyhwYXJhbXMpIHtcbiAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgIE1lc3NhZ2U6IHBhcmFtcy5tZXNzYWdlLFxuICAgICAgVG9waWNBcm46IHBhcmFtcy5lbmRwb2ludFxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jbGllbnQucHVibGlzaChyZXF1ZXN0LCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc3VsdC5NZXNzYWdlSWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmVnaXN0ZXJUb3BpYyhuYW1lKSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIE5hbWU6IG5hbWVcbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LmNyZWF0ZVRvcGljKHBhcmFtcywgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuVG9waWNBcm4pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgc3Vic2NyaWJlVG9waWMocGFyYW1zKSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIFByb3RvY29sOiAnYXBwbGljYXRpb24nLCAvLyBpT1MgLyBBbmRyb2lkXG4gICAgICBUb3BpY0FybjogcGFyYW1zLnRvcGljLFxuICAgICAgRW5kcG9pbnQ6IHBhcmFtcy5lbmRwb2ludFxuICAgIH07XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5jbGllbnQuc3Vic2NyaWJlKHBhcmFtcywgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQuU3Vic2NyaXB0aW9uQXJuKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHVuc3Vic2NyaWJlVG9waWMoYXJuKSB7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIFN1YnNjcmlwdGlvbkFybjogYXJuXG4gICAgfTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLmNsaWVudC51bnN1YnNjcmliZShwYXJhbXMsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoYXJuKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIHJlcGxhY2VEZXZpY2VUb2tlbihlbmRwb2ludCwgZGV2aWNlVG9rZW4pIHtcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgRW5kcG9pbnRBcm46IGVuZHBvaW50LFxuICAgICAgQXR0cmlidXRlczoge1xuICAgICAgICBUb2tlbjogZGV2aWNlVG9rZW5cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuY2xpZW50LnNldEVuZHBvaW50QXR0cmlidXRlcyhwYXJhbXMsIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZW5kcG9pbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==