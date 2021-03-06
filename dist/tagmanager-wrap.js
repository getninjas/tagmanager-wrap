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
        _extends(window.tagManagerDataLayer, this.dataLayer);
        this.dataLayer = window.tagManagerDataLayer;
      }
    }, {
      key: 'prependExperiment',
      value: function prependExperiment(_ref) {
        var event = _ref.event,
            schema = _ref.schema,
            data = _ref.data;

        this.options.startPush.experiments.push(data);

        this.custom({ event: event, schema: schema, data: data });
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
        var _this = this;

        var gtmElements = [].slice.call(document.querySelectorAll('[data-gtm-event="ga-event"]'));

        gtmElements.map(function (el) {
          if (!el.getAttribute('data-gtm-bind')) {
            el.addEventListener('click', _this._clickGAEvent.bind(_this));
            el.setAttribute('data-gtm-bind', true);
          }

          return el;
        });

        return gtmElements;
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
        var _this2 = this;

        return keys.reduce(function (previousValue, currentValue) {
          var key = 'event' + _this2._captalize(currentValue);
          var val = _this2._getAttribute(el, 'data-gtm-' + currentValue);

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