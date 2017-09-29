
const defaultOptions = {
  gtmId: 'xxxx',
  virtualPageViewEvent: 'virtual_pageview',
  startPush: {
    experiements: [],
  },
  addExperiments: [],
};

export default class TagManager {
  constructor(dataLayer, params = defaultOptions) {
    this.options = Object.assign(defaultOptions, params);
    this.dataLayer = dataLayer || [];
    this.setupExperiments();
    this.dataLayer.push(this.options.startPush);

    this.appendAsyncScript();
  }

  setupExperiments() {
    Object.assign(this.options.startPush, {
      experiments: this.experiments(),
    });

    return this;
  }

  appendAsyncScript() {
    const script = document.createElement('script');
    script.innerHTML = `(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'tagManagerDataLayer', '${this.options.gtmId}');`;

    document.body.appendChild(script);
  }

  experiments() {
    this.options.startPush.experiments = [
      this.options.startPush.experiments,
      ...this.options.addExperiments,
    ];

    return this.options.startPush.experiments;
  }

  prependExperiment(experiment) {
    if (this.dataLayer[0].experiments) {
      const dataLayer = Object.assign({}, this.options.startPush, {
        experiments: [experiment],
      });

      this.dataLayer[0].experiments = [dataLayer, ...this.dataLayer[0].experiments];

      return this.dataLayer[0].experiments;
    }

    return this.dataLayer[0].experiments.push(experiment);
  }

  virtualPageView(vpname, event) {
    this.dataLayer.push({
      vpname,
      event: event || this.options.virtualPageViewEvent,
    });
  }

  eventCategory(event, infos) {
    const categoryObj = Object.assign({
      eventCategory: event,
      event: 'GAEvent',
    }, infos || {});

    return this.dataLayer.push(categoryObj);
  }

  custom(obj) {
    return this.dataLayer.push(obj);
  }

  bindEvents() {
    const gtmElements = document.querySelectorAll('[data-gtm-event="ga-event"]');

    gtmElements.forEach(function (el) {
      if (!el.getAttribute('data-gtm-bind')) {
        el.addEventListener('click', this.clickGAEvent.bind(this));
        el.setAttribute('data-gtm-binded', true);
      }
    }, this);

    return gtmElements;
  }

  clickGAEvent(event) {
    const el = event.curentTarget;

    const category = el.getAttribute('data-gtm-category');
    const eventAction = el.getAttribute('data-gtm-action') || null;
    const eventLabel = el.getAttribute('data-gtm-label') || null;
    const eventValue = el.getAttribute('data-gtm-value') || null;
    const eventProperty = el.getAttribute('data-gtm-property') || null;

    this.eventCategory(category, { eventAction, eventLabel, eventValue, eventProperty });
  }
}
