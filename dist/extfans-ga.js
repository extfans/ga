(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ExtfansGa = factory());
}(this, function () { 'use strict';

  function getSystemInfo() {
    return {
      sr: screen.width + 'x' + window.screen.height,
      sd: screen.colorDepth + '-bits',
      ul: navigator.language
    };
  }

  function genClientId() {
    var d = Date.now() + performance.now();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
  }

  var t = new Date().valueOf();

  function genNonce() {
    return t++;
  }

  var storage = {
    get: function get(key) {
      return localStorage.getItem(key);
    },
    set: function set(key, val) {
      localStorage.setItem(key, val);
    }
  };

  function assembleParams(paramMap) {
    var paramArr = [];
    for (var key in paramMap) {
      var val = paramMap[key];

      if (val == null || val === false) {
        continue;
      }

      if (val === true) {
        val = 1;
      }

      paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    }
    return paramArr.join('&');
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var ExtfansGa = function () {
    function ExtfansGa(info) {
      classCallCheck(this, ExtfansGa);

      var me = this;

      // base
      var baseInfo = me.baseInfo = {
        v: 1,
        tid: info.trackingId,
        uid: info.userId
      };

      var clientId = storage.get('ga:clientId');
      if (!clientId) {
        clientId = genClientId();
        storage.set('ga:clientId', clientId);
      }
      baseInfo.cid = clientId;

      // system
      me.systemInfo = getSystemInfo();

      // extra
      me.extraInfo = {
        dl: location.href.split('#')[0]
      };
    }

    createClass(ExtfansGa, [{
      key: 'event',
      value: function event(info) {
        var me = this;

        return me.send('event', {
          ec: info.category,
          ea: info.action,
          el: info.label,
          ev: info.value,
          ni: info.nonInteraction === true
        });
      }
    }, {
      key: 'pageview',
      value: function pageview() {
        var info = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var me = this;

        return me.send('pageview', {
          dl: info.location,
          dh: info.host,
          dp: info.page,
          dt: info.title || document.title
        });
      }
    }, {
      key: 'send',
      value: function send(type, sendInfo) {
        var me = this;

        var info = _extends({
          _t: genNonce(),
          t: type
        }, me.baseInfo, me.systemInfo, sendInfo);

        var extraInfo = me.extraInfo;
        for (var key in extraInfo) {
          if (info[key] == null) {
            info[key] = extraInfo[key];
          }
        }

        var xhr = new XMLHttpRequest();

        var url = 'https://www.google-analytics.com/collect?' + assembleParams(info);

        xhr.open('GET', url, true);

        xhr.send(null);

        return url;
      }
    }]);
    return ExtfansGa;
  }();

  ExtfansGa.version = "1.0.2";

  return ExtfansGa;

}));
