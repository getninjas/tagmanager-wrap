import TagManager from '../src/tagmanager-wrap';

describe('Tagmanager', () => {

  let tagManager = new TagManager([], {
    gtmId: 'GTM-T2HGD',
    startPush: {
      page_type: 'pages:demo',
      path_category: 'reformas-e-reparos/demo',
      experiments: window.experiments || [],
    },
  });

  describe('constructor', () => {
    it('defines default properties', () => {
      expect(tagManager.options).toBeDefined();
      expect(tagManager.dataLayer.length).toBeDefined();
    });
  });

  describe('.defineProperties', () => {
    it('sets default properties', () => {
      expect(tagManager.options.gtmId).toEqual('GTM-T2HGD');
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
      spyOn(tagManager, 'appendAsyncScript');
      spyOn(tagManager, 'appendNoScriptFallBack');
      tagManager.init();
    });

    it('call appendAsyncScript', () => {
      expect(tagManager.appendAsyncScript).toHaveBeenCalled();
    });

    it('call appendNoScriptFallBack', () => {
      expect(tagManager.appendNoScriptFallBack).toHaveBeenCalled();
    });
  });


  describe('.prependExperiment', () => {
    beforeEach(() => {
      tagManager.init();
      tagManager.prependExperiment({
        experimentDescription: 'PopUp/Modal quando o usuário deixa formulário',
        experimentGoal: 'request conversion rate',
        experimentId: 'popup-user-leaves-request',
        experimentPageCategory: ['all'],
        experimentPageType: ['categories'],
        experimentTool: 'Abba',
        experimentType: 'page',
        experimentVersion: 'demo',
      });
    });

    afterEach(() => {
      tagManager.dataLayer[0].experiments = [];
    });

    it('preppends experiment', () => {
      expect(tagManager.dataLayer[0].experiments.length).toEqual(1);
    });

    it('has description equal to PopUp/Modal quando o usuário deixa formulário', () => {
      expect(tagManager.dataLayer[0].experiments[0].experimentDescription).toEqual('PopUp/Modal quando o usuário deixa formulário');
    });
  });

  describe('.virtualPageView', () => {
    beforeEach(() => {
      tagManager.init();
      tagManager.virtualPageView('/profile/created');
    });

    afterEach(() => {
      tagManager.dataLayer = [];
    });

    it('preppends virtualPageView', () => {
      expect(tagManager.dataLayer.length).toEqual(2);
    });

    it('has vpname', () => {
      expect(tagManager.dataLayer[0].vpname).toEqual('/profile/created');
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
      expect(tagManager.dataLayer.length).toEqual(1);
    });

    it('has event', () => {
      expect(tagManager.dataLayer[0].event).toEqual('GAEvent');
    });

    it('has eventCategory', () => {
      expect(tagManager.dataLayer[0].eventCategory).toEqual('pre-fill');
    });

    it('has eventAction', () => {
      expect(tagManager.dataLayer[0].eventAction).toEqual('success');
    });
  });
});
