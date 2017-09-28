'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
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

    this.options = Object.assign(defaultOptions, params);
    this.dataLayer = dataLayer || [];
    this.setupExperiments();
    this.dataLayer.push(this.options.startPush);
  }

  _createClass(TagManager, [{
    key: 'setupExperiments',
    value: function setupExperiments() {
      Object.assign(this.options.startPush, {
        experiments: this.experiments()
      });

      return this;
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
        var dataLayer = Object.assign({}, this.options.startPush, {
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
      var categoryObj = Object.assign({
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
    value: function clickGAEvent(el) {
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