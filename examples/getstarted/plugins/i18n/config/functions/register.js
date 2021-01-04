'use strict';

const _ = require('lodash');

// add a register function to do some stuff after the loading but before the boot
module.exports = () => {
  // need to add some logic to the db layer so we can add fields to the models

  Object.values(strapi.models).forEach(model => {
    _.set(model.attributes, 'strapi_id', {
      writable: false,
      private: true,
      configurable: false,
      type: 'string',
    });

    if (_.get(model, 'pluginOptions.i18n.enabled', false) === true) {
      _.set(model.attributes, 'strapi_locale', {
        writable: false,
        private: true,
        configurable: false,
        type: 'string',
      });
    }
  });

  // strapi.database.migrations.push({
  //   before() {},
  //   after() {},
  // });
};
