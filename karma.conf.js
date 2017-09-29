const karmaConfig = function (conf) {
  conf.set({
    colors: true,
    logLevel: conf.LOG_ERROR,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
    files: [
      'src/*.js',
      'spec/*.spec.js',
    ],
    frameworks: ['jasmine', 'browserify'],
    preprocessors: {
      'src/*.js': ['babel', 'browserify'],
      'spec/*.spec.js': ['babel', 'browserify'],
    },
    browserify: {
      transform: [
        [
          'babelify',
          {
            presets: ['env'],
            plugins: ['istanbul'],
          },
        ],
      ],
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{
        type: 'text',
      },
      {
        type: 'text-summary',
      },
      {
        type: 'html',
        subdir: 'report-html',
      },
      {
        type: 'lcov',
        subdir: 'report-lcov',
      },
      ],
    },
    plugins: [
      'karma-babel-preprocessor',
      'karma-chrome-launcher',
      'karma-browserify',
      'istanbul-instrumenter-loader',
      'karma-jasmine',
      'karma-coverage',
      'karma-spec-reporter',
    ],
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222',
        ],
      },
    },
  });
};

module.exports = karmaConfig;