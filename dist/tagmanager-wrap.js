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

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
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
    gtmId: 'xxxx',
    virtualPageViewEvent: 'virtual_pageview',
    startPush: {
      experiements: []
    },
    addExperiments: []
  };

  var TagManager = function () {
    function TagManager(dataLayer) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

      _classCallCheck(this, TagManager);

      this.options = _extends(defaultOptions, params);
      this.dataLayer = dataLayer || [];
      this.setupExperiments();
      this.dataLayer.push(this.options.startPush);

      this.appendAsyncScript();
      this.appendNoScriptFallBack();
    }

    _createClass(TagManager, [{
      key: 'setupExperiments',
      value: function setupExperiments() {
        _extends(this.options.startPush, {
          experiments: this.experiments()
        });

        return this;
      }
    }, {
      key: 'appendAsyncScript',
      value: function appendAsyncScript() {
        var script = document.createElement('script');
        script.innerHTML = '(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ \'gtm.start\': new Date().getTime(), event: \'gtm.js\' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != \'dataLayer\' ? \'&l=\' + l : \'\'; j.async = true; j.src = \'https://www.googletagmanager.com/gtm.js?id=\' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, \'script\', \'tagManagerDataLayer\', \'' + this.options.gtmId + '\');';

        document.body.appendChild(script);
      }
    }, {
      key: 'appendNoScriptFallBack',
      value: function appendNoScriptFallBack() {
        var noScript = document.createElement('noscript');
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + this.options.gtmId;
        iframe.height = 0;
        iframe.width = 0;
        iframe.style = 'display:none;visibility:hidden';
        noScript.appendChild(iframe);
        document.body.appendChild(noScript);
      }
    }, {
      key: 'experiments',
      value: function experiments() {
        this.options.startPush.experiments = [this.options.startPush.experiments].concat(_toConsumableArray(this.options.addExperiments));

        return this.options.startPush.experiments;
      }
    }, {
      key: 'prependExperiment',
      value: function prependExperiment(experiment) {
        if (this.dataLayer[0].experiments) {
          var dataLayer = _extends({}, this.options.startPush, {
            experiments: [experiment]
          });

          this.dataLayer[0].experiments = [dataLayer].concat(_toConsumableArray(this.dataLayer[0].experiments));

          return this.dataLayer[0].experiments;
        }

        return this.dataLayer[0].experiments.push(experiment);
      }
    }, {
      key: 'virtualPageView',
      value: function virtualPageView(vpname, event) {
        this.dataLayer.push({
          vpname: vpname,
          event: event || this.options.virtualPageViewEvent
        });
      }
    }, {
      key: 'eventCategory',
      value: function eventCategory(event, infos) {
        var categoryObj = _extends({
          eventCategory: event,
          event: 'GAEvent'
        }, infos || {});

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
            el.addEventListener('click', this.clickGAEvent.bind(this));
            el.setAttribute('data-gtm-binded', true);
          }
        }, this);

        return gtmElements;
      }
    }, {
      key: 'clickGAEvent',
      value: function clickGAEvent(event) {
        var el = event.curentTarget;

        var category = el.getAttribute('data-gtm-category');
        var eventAction = el.getAttribute('data-gtm-action') || null;
        var eventLabel = el.getAttribute('data-gtm-label') || null;
        var eventValue = el.getAttribute('data-gtm-value') || null;
        var eventProperty = el.getAttribute('data-gtm-property') || null;

        this.eventCategory(category, { eventAction: eventAction, eventLabel: eventLabel, eventValue: eventValue, eventProperty: eventProperty });
      }
    }]);

    return TagManager;
  }();

  exports.default = TagManager;
});