
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
    Object.assign(window.tagManagerDataLayer, this.dataLayer);
    this.dataLayer = window.tagManagerDataLayer;
  }

  prependExperiment({ event, schema, data }) {
    this.options.startPush.experiments.push(data);

    this.custom({ event, schema, data });
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
    const gtmElements = [].slice.call(document.querySelectorAll('[data-gtm-event="ga-event"]'));

    gtmElements.map((el) => {
      if (!el.getAttribute('data-gtm-bind')) {
        el.addEventListener('click', this._clickGAEvent.bind(this));
        el.setAttribute('data-gtm-bind', true);
      }

      return el;
    });

    return gtmElements;
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
