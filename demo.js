tagManager = new window.tagmanagerWrap.default(window.tagManagerDataLayer, {
  gtmId: 'GTM-T2HGD',
  startPush: {
    page_type: 'pages:home',
    path_category: 'custom/slug',
    experiments: window.experiments || [],
  },
});

tagManager.init();

const btnEventCategory = document.getElementsByClassName('eventCategory')[0];
btnEventCategory.addEventListener('click', () => {
  tagManager.eventCategory('pre-fill', {
    eventAction: 'success',
  });
  console.log(tagManager);
});

const btnPrependExperiment = document.getElementsByClassName('prependExperiment')[0];
btnPrependExperiment.addEventListener('click', () => {
  tagManager.prependExperiment({
    event: 'yourCustomEvent',
    schema: 'your:br.com.custom/schema/jsonschema/1-0-0',
    data: {
      experimentDescription: 'Demo description',
      experimentGoal: 'request conversion rate',
      experimentId: 'popup-user-leaves-request',
      experimentPageCategory: ['all'],
      experimentPageType: ['categories'],
      experimentTool: 'Abba',
      experimentType: 'page',
      experimentVersion: 'demo',
    },
  });

  console.log(tagManager);
});

const btnVirtualPageView = document.getElementsByClassName('virtualPageView')[0];
btnVirtualPageView.addEventListener('click', () => {
  tagManager.virtualPageView('/profile/created');
  console.log(tagManager);
});

const btnCustomObj = document.getElementsByClassName('customObj')[0];
btnCustomObj.addEventListener('click', () => {
  tagManager.custom({
    user_id: 123,
    event: 'user_info',
  });
  console.log(tagManager);
});
