
const defaultOptions = {
  gtmId: '111111', // homolog
  virtualPageViewEvent: 'virtual_pageview',
  startPush: {
    experiements: [],
  },
  addExperiments: [],
};

export default class TagManager {
  constructor(dataLayer, params = defaultOptions) {
    this.options = Object.assign({}, defaultOptions, params);
    this.dataLayer = dataLayer || [];
    this.dataLayer.push(this.options.startPush);
  }

  init() {
    this.appendAsyncScript();
    this.appendNoScriptFallBack();
  }

  appendAsyncScript() {
    const script = document.createElement('script');
    script.innerHTML = `(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'tagManagerDataLayer', '${this.options.gtmId}');`;

    document.body.appendChild(script);
  }

  appendNoScriptFallBack() {
    const noScript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${this.options.gtmId}`;
    iframe.height = 0;
    iframe.width = 0;
    iframe.style = 'display:none;visibility:hidden';
    noScript.appendChild(iframe);
    document.body.appendChild(noScript);
  }

  prependExperiment(experiment) {
    this.dataLayer[0].experiments.push(experiment);
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
        el.setAttribute('data-gtm-bind', true);
      }
    }, this);

    return gtmElements;
  }

  clickGAEvent(event) {
    const el = event.currentTarget;

    const category = el.getAttribute('data-gtm-category');
    const eventAction = el.getAttribute('data-gtm-action') || null;
    const eventLabel = el.getAttribute('data-gtm-label') || null;
    const eventValue = el.getAttribute('data-gtm-value') || null;
    const eventProperty = el.getAttribute('data-gtm-property') || null;

    this.eventCategory(category, { eventAction, eventLabel, eventValue, eventProperty });
  }
}
