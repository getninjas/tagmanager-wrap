import TagManager from '../src/tagmanager-wrap';
import fs from 'fs'

describe('Tagmanager', () => {
  window.tagManagerDataLayer = [];
  const tagManager = new TagManager(window.tagManagerDataLayer, {
    gtmId: '222222',
    startPush: {
      page_type: 'pages:demo',
      path_category: 'reformas-e-reparos/demo',
      experiments: window.experiments || [],
    },
  });

  describe('constructor', () => {
    it('defines default properties', () => {
      expect(tagManager.options).toBeDefined();
      expect(tagManager.dataLayer).toBeDefined();
    });
  });

  describe('.defineProperties', () => {
    it('sets default properties', () => {
      expect(tagManager.options.gtmId).toEqual('222222');
      expect(tagManager.options.startPush.page_type).toEqual('pages:demo');
      expect(tagManager.options.startPush.path_category).toEqual('reformas-e-reparos/demo');
      expect(tagManager.options.virtualPageViewEvent).toEqual('virtual_pageview');
    });
  });

  describe('.dataLayer init', () => {
    it('sets initial data', () => {
      expect(tagManager.dataLayer.length).not.toEqual(0);
    });
  });

  describe('.init', () => {
    beforeEach(() => {
      document.body.innerHTML = fs.readFileSync(`${__dirname}/fixtures/index.html`)
      tagManager.init();
    });

    it('appends async script', () => {
      const scriptTag = document.querySelector('[data-id="google-tagmanager"]');

      expect(scriptTag).not.toBeNull();
    });

    it('appends noscript fallback', () => {
      const noScript = document.querySelector('[data-id="noscript-google-tagmanager"]');

      expect(noScript).not.toBeNull();
    });
  });


  describe('.prependExperiment', () => {
    beforeEach(() => {
      tagManager.init();

      tagManager.prependExperiment({
        event: 'yourCustomEvent',
        schema: 'your:br.com.custom/schema/jsonschema/1-0-0',
        data: {
          experimentDescription: 'Description Experiment',
          experimentGoal: 'request conversion rate',
          experimentId: 'popup-user-leaves-request',
          experimentPageCategory: ['all'],
          experimentPageType: ['categories'],
          experimentTool: 'Abba',
          experimentType: 'page',
          experimentVersion: 'demo',
        },
      });
    });

    it('preppends experiment', () => {
      expect(tagManager.dataLayer[0].experiments.length).toEqual(1);
    });

    it('has description equal to Description Experiment', () => {
      expect(tagManager.dataLayer[0].experiments[0].experimentDescription).toEqual('Description Experiment');
    });
  });

  describe('.virtualPageView', () => {
    beforeEach(() => {
      tagManager.init();

      tagManager.virtualPageView('/profile/created');
    });

    it('preppends virtualPageView', () => {
      const result = tagManager.dataLayer.filter(item => item.vpname !== undefined);

      expect(result.length).toEqual(1);
    });

    it('has vpname', () => {
      const result = tagManager.dataLayer.filter(item => item.vpname !== undefined);
      expect(result[0].vpname).toEqual('/profile/created');
    });
  });

  describe('.eventCategory', () => {
    beforeEach(() => {
      tagManager.init();

      tagManager.eventCategory('pre-fill', {
        eventAction: 'success',
      });
    });

    it('preppends eventCategory', () => {
      const result = tagManager.dataLayer.filter(item => item.eventCategory !== undefined);

      expect(result.length).toEqual(1);
    });

    it('has event', () => {
      const result = tagManager.dataLayer.filter(item => item.eventCategory !== undefined);

      expect(result[0].event).toEqual('GAEvent');
    });

    it('has eventCategory', () => {
      const result = tagManager.dataLayer.filter(item => item.eventCategory !== undefined);

      expect(result[0].eventCategory).toEqual('pre-fill');
    });

    it('has eventAction', () => {
      const result = tagManager.dataLayer.filter(item => item.eventAction !== undefined);

      expect(result[0].eventAction).toEqual('success');
    });
  });

  describe('.customObj', () => {
    beforeEach(() => {
      tagManager.init();

      tagManager.custom({
        user_id: 123,
        event: 'user_info',
      });
    });

    it('preppends customObj', () => {
      const result = tagManager.dataLayer.filter(item => item.user_id !== undefined);

      expect(result.length).toEqual(1);
    });

    it('has user_id', () => {
      const result = tagManager.dataLayer.filter(item => item.user_id !== undefined);

      expect(result[0].user_id).toEqual(123);
    });

    it('has event', () => {
      const result = tagManager.dataLayer.filter(item => item.user_id !== undefined);

      expect(result[0].event).toEqual('user_info');
    });
  });

  describe('.bindEvents', () => {
    it('appends gtm-bind attribute', () => {
      document.body.innerHTML = fs.readFileSync(`${__dirname}/fixtures/index.html`)
      const btn = document.getElementsByClassName('btn')[0];

      tagManager.init();
      tagManager.bindEvents();

      const attribute = btn.getAttribute('data-gtm-bind');

      expect(Boolean(attribute)).toEqual(true);
    });
  });

  describe('.clickGAEvent', () => {
    beforeEach(() => {
      tagManager.dataLayer = [];
    });

    it('dispatches .eventCategory', () => {
      document.body.innerHTML = fs.readFileSync(`${__dirname}/fixtures/index.html`)
      spyOn(tagManager, 'eventCategory');

      tagManager.init();
      tagManager.bindEvents();

      const btn = document.getElementsByClassName('btn')[0];
      const evt = {
        currentTarget: btn,
      };

      btn.click(evt);

      expect(tagManager.eventCategory).toHaveBeenCalled();
    });
  });
});
