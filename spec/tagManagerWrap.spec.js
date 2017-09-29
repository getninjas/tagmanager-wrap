import TagManager from '../src/tagmanager-wrap';

describe('Tagmanager', () => {
  beforeEach(() => {
    this.tagManager = new TagManager({
      gtmId: 'GTM-T2HGD',
      startPush: {
        page_type: 'pages:demo',
        path_category: 'reformas-e-reparos/demo',
        experiments: window.experiments || [],
      },
    });
  });

  describe('constructor', () => {
    it('defines default properties', () => {
      expect(this.tagManager.options).toBeDefined();
      expect(this.tagManager.dataLayer.length).toBeDefined();
    });
  });

  describe('.defineProperties', () => {
    it('sets default properties', () => {
      expect(this.tagManager.options.gtmId).toEqual('GTM-T2HGD');
      expect(this.tagManager.options.startPush.page_type).toEqual('pages:demo');
      expect(this.tagManager.options.startPush.path_category).toEqual('reformas-e-reparos/demo');
      expect(this.tagManager.options.virtualPageViewEvent).toEqual('virtual_pageview');
    });
  });

  describe('.dataLayer init', () => {
    it('sets initial data', () => {
      expect(this.tagManager.dataLayer.length).not.toEqual(0);
    });
  });
});
