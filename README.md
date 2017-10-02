# Tagmanager Wrap

Wrapping Google tagmanager and adding some helpers to him
* This script appends automatically the googleTagmanager script.
* It also adds an iframe inside a noscript tag for non-js fallback

#### Methods
* prependExperiment(experiment)
* eventCategory(event, infos)
* custom(obj)
* bindEvents() - gets all elements from the page tha constais `[data-gtm-event="ga-event"]` and adds a click event
