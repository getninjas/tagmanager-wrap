# Tagmanager Wrap

Wrapping Google tagmanager and adding some helpers to him
* This script appends automatically the googleTagmanager script.
* It also adds an iframe inside a noscript tag for non-js fallback

### Documentation

See live here [https://getninjas.github.io/tagmanager-wrap](https://getninjas.github.io/tagmanager-wrap)

### Install

`npm i tagmanager-wrap  --save`

`yarn add tagmanager-wrap`

### Demo

`npm run demo`

`yarn demo`

### Usage

You can use it via:
* GLOBAL variabel
* CommonJs
* AMD
* ES6 Module

#### Methods
* prependExperiment(experiment)
* eventCategory(event, infos)
* custom(obj)
* bindEvents() - gets all elements from the page that contains `[data-gtm-event="ga-event"]` and adds a click event
