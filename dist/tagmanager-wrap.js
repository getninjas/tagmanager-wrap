(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.tagmanagerWrap = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
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

  var defaultOptions = {
    gtmId: '111111',
    virtualPageViewEvent: 'virtual_pageview',
    startPush: {
      experiements: []
    },
    addExperiments: []
  };

  var TagManager = function () {
    function TagManager() {
      var dataLayer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

      _classCallCheck(this, TagManager);

      this.options = _extends({}, defaultOptions, params);
      this.dataLayer = dataLayer;
      this.dataLayer.push(this.options.startPush);
    }

    _createClass(TagManager, [{
      key: 'init',
      value: function init() {
        this._appendAsyncScript();
        this._appendNoScriptFallBack();
      }
    }, {
      key: 'prependExperiment',
      value: function prependExperiment(experiment) {
        this.options.startPush.experiments.push(experiment);

        this.custom({ event: 'selfDescribingEvent', schema: 'iglu:br.com.getninjas/split_test/jsonschema/1-0-0', data: experiment });
      }
    }, {
      key: 'virtualPageView',
      value: function virtualPageView(vpname, eventType) {
        this.dataLayer.push({
          vpname: vpname,
          event: eventType || this.options.virtualPageViewEvent
        });
      }
    }, {
      key: 'eventCategory',
      value: function eventCategory(_eventCategory) {
        var infos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var categoryObj = _extends({
          eventCategory: _eventCategory,
          event: 'GAEvent'
        }, infos);

        return this.dataLayer.push(categoryObj);
      }
    }, {
      key: 'custom',
      value: function custom(obj) {
        return this.dataLayer.push(obj);
      }
    }, {
      key: 'bindEvents',
      value: function bindEvents() {
        var gtmElements = document.querySelectorAll('[data-gtm-event="ga-event"]');

        gtmElements.forEach(function (el) {
          if (!el.getAttribute('data-gtm-bind')) {
            el.addEventListener('click', this._clickGAEvent.bind(this));
            el.setAttribute('data-gtm-bind', true);
          }
        }, this);

        return gtmElements;
      }
    }, {
      key: '_appendAsyncScript',
      value: function _appendAsyncScript() {
        var script = document.createElement('script');
        script.setAttribute('data-id', 'google-tagmanager');

        script.id = 'google-tagmanager';
        script.innerHTML = '(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ \'gtm.start\': new Date().getTime(), event: \'gtm.js\' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != \'dataLayer\' ? \'&l=\' + l : \'\'; j.async = true; j.src = \'https://www.googletagmanager.com/gtm.js?id=\' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, \'script\', \'tagManagerDataLayer\', \'' + this.options.gtmId + '\');';

        document.body.appendChild(script);

        _extends(window.tagManagerDataLayer, this.dataLayer);

        this.dataLayer = window.tagManagerDataLayer;
      }
    }, {
      key: '_appendNoScriptFallBack',
      value: function _appendNoScriptFallBack() {
        var noScript = document.createElement('noscript');
        noScript.setAttribute('data-id', 'noscript-google-tagmanager');

        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + this.options.gtmId;
        iframe.height = 0;
        iframe.width = 0;
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        noScript.appendChild(iframe);
        document.body.appendChild(noScript);
      }
    }, {
      key: '_clickGAEvent',
      value: function _clickGAEvent(evt) {
        var el = evt.currentTarget;

        var category = this._getAttribute(el, 'data-gtm-category');
        var props = this._getProps(el, ['action', 'label', 'value', 'property']);

        this.eventCategory(category, props);
      }
    }, {
      key: '_getProps',
      value: function _getProps(el, keys) {
        var _this = this;

        return keys.reduce(function (previousValue, currentValue) {
          var key = 'event' + _this._captalize(currentValue);
          var val = _this._getAttribute(el, 'data-gtm-' + currentValue);

          return _extends({}, previousValue, _defineProperty({}, key, val));
        }, {});
      }
    }, {
      key: '_captalize',
      value: function _captalize(word) {
        return word && word[0].toUpperCase() + word.slice(1);
      }
    }, {
      key: '_getAttribute',
      value: function _getAttribute(el, attr) {
        return el.getAttribute(attr) || null;
      }
    }]);

    return TagManager;
  }();

  exports.default = TagManager;
});