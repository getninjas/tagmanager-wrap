// testing
const test = null;
const hello = "Hello";
const byebye = "by by";
const byebye111 = "by by";
const byebye111222 = "by by";
const ola = "by by";

var TagManager = (function(dataLayer, options) {
  this.dataLayer = dataLayer || [];
  this.options = this._extend({
    virtualPageViewEvent: "virtual_pageview",
    startPush: {},
    addExperiments: []
  }, options || {});

  this
    .addExperiments()
    .initialize();
});

TagManager.prototype = {
  initialize: function() {
    this.dataLayer.push(this.options.startPush);
  },

  prependExperiment: function(experiment) {
    if (this.dataLayer[0].experiments) {
      this.dataLayer[0].experiments.push(experiment)
    } else {
      var dataLayer = this._extend({}, this.options.startPush, {
        experiments: [experiment]
      });

      this.dataLayer.unshift(dataLayer);
    }

  },

  addExperiments: function() {
    this.options.startPush = this._extend({}, this.options.startPush, {
      experiments: this.experiments()
    });

    return this;
  },

  experiments: function() {
    return (this.options.startPush.experiments || []).concat(this.options.addExperiments);
  },

  virtualPageView: function(vpname, event) {
    this.dataLayer.push({
      vpname: vpname,
      event: event || this.options.virtualPageViewEvent
    });
  },

  eventCategory: function(event, infos) {
    var categoryObj = this._extend({
      eventCategory: event,
      event: "GAEvent"
    }, infos || {});

    this.dataLayer.push(categoryObj);
  },

  custom: function(obj) {
    this.dataLayer.push(obj);
  },

  bindEvents: function($) {
    $("[data-gtm-event='ga-event']").on("click", this.clickGAEvent.bind(this));
  },

  clickGAEvent: function(event) {
    var el = $(event.toElement);

    var category = el.data("gtm-category");
    var action   = el.data("gtm-action") || null;
    var label    = el.data("gtm-label") || null;
    var value    = el.data("gtm-value") || null;
    var property = el.data("gtm-property") || null;

    this.eventCategory(category, {
      eventAction: action,
      eventLabel: label,
      eventValue: value,
      eventProperty: property
    });
  },

  _extend: function(where) {
    Array.prototype.slice.call(arguments, 1).forEach(function(source) {
      var key;
      for (key in source) {
        if (source.hasOwnProperty(key)) {
          where[key] = source[key];
        }
      }
    });
    return where;
  }
};
