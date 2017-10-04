
const defaultOptions = {
  gtmId: '111111',
  virtualPageViewEvent: 'virtual_pageview',
  startPush: {
    experiements: [],
  },
  addExperiments: [],
};

export default class TagManager {
  constructor(dataLayer = [], params = defaultOptions) {
    this.options = Object.assign({}, defaultOptions, params);
    this.dataLayer = dataLayer;
    this.dataLayer.push(this.options.startPush);
  }

  init() {
    this._appendAsyncScript();
    this._appendNoScriptFallBack();
  }

  prependExperiment(experiment) {
    this.dataLayer[0].experiments.push(experiment);
  }

  virtualPageView(vpname, eventType) {
    this.dataLayer.push({
      vpname,
      event: eventType || this.options.virtualPageViewEvent,
    });
  }

  eventCategory(eventCategory, infos = {}) {
    const categoryObj = Object.assign({
      eventCategory,
      event: 'GAEvent',
    }, infos);

    return this.dataLayer.push(categoryObj);
  }

  custom(obj) {
    return this.dataLayer.push(obj);
  }

  bindEvents() {
    const gtmElements = document.querySelectorAll('[data-gtm-event="ga-event"]');

    gtmElements.forEach(function (el) {
      if (!el.getAttribute('data-gtm-bind')) {
        el.addEventListener('click', this._clickGAEvent.bind(this));
        el.setAttribute('data-gtm-bind', true);
      }
    }, this);

    return gtmElements;
  }

  _appendAsyncScript() {
    const script = document.createElement('script');
    script.setAttribute('data-id', 'google-tagmanager');

    script.id = 'google-tagmanager';
    script.innerHTML = `(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'tagManagerDataLayer', '${this.options.gtmId}');`;

    document.body.appendChild(script);
  }

  _appendNoScriptFallBack() {
    const noScript = document.createElement('noscript');
    noScript.setAttribute('data-id', 'noscript-google-tagmanager');

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${this.options.gtmId}`;
    iframe.height = 0;
    iframe.width = 0;
    iframe.style = 'display:none;visibility:hidden';
    noScript.appendChild(iframe);
    document.body.appendChild(noScript);
  }

  _clickGAEvent(evt) {
    const el = evt.currentTarget;

    const category = this._getAttribute(el, 'data-gtm-category');
    const props = this._getProps(el, ['action', 'label', 'value', 'property']);

    this.eventCategory(category, props);
  }

  _getProps(el, keys) {
    return keys.reduce((previousValue, currentValue) => {
      const key = `event${this._captalize(currentValue)}`;
      const val = this._getAttribute(el, `data-gtm-${currentValue}`);

      return Object.assign({}, previousValue, { [key]: val });
    }, {});
  }

  _captalize(word) {
    return word && word[0].toUpperCase() + word.slice(1);
  }

  _getAttribute(el, attr) {
    return el.getAttribute(attr) || null;
  }
}
