# TagManager Wrap

[![Build Status](https://travis-ci.org/getninjas/tagmanager-wrap.svg?branch=master)](https://travis-ci.org/getninjas/tagmanager-wrap)
[![Maintainability](https://api.codeclimate.com/v1/badges/dce9f6406858d2069bf4/maintainability)](https://codeclimate.com/github/getninjas/tagmanager-wrap/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/dce9f6406858d2069bf4/test_coverage)](https://codeclimate.com/github/getninjas/tagmanager-wrap/test_coverage)

Wrapping Google TagManager and adding some helpers to him
* This script appends automatically the googleTagManager script.
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
