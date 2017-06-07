
const defaultOptions = {
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
  }

  setupExperiments() {
    Object.assign(this.options.startPush, {
      experiments: this.experiments(),
    });

    return this;
  }

  experiments() {
    return this.options.startPush.experiments.concat(this.options.addExperiments);
  }

  prependExperiment(experiment) {
    if (this.dataLayer[0].experiments) {
      const dataLayer = Object.assign({}, this.options.startPush, {
        experiments: [experiment],
      });

      this.dataLayer.unshift(dataLayer);
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

  bindEvents($) {
    if (!$) throw new Error('jQuery must be passed here');

    $('[data-gtm-event=\'ga-event\']').on('click.ga-event', this.clickGAEvent.bind(this));
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
