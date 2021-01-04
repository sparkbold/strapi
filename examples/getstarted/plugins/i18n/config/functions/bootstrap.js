'use strict';

const _ = require('lodash');
const { prop } = require('lodash/fp');
const crypto = require('crypto');

module.exports = () => {
  // register custom permissions

  // register database mixin to modify model behaviours

  // update model lifecycles

  Object.values(strapi.contentTypes).forEach(contentType => {
    if (prop('pluginOptions.i18n.enabled')(contentType) === true) {
      console.log('i18N is enabled for ', contentType.modelName);

      const model = strapi.getModel(contentType.uid);

      _.set(model, 'lifecycles.beforeCreate', async data => {
        if (!prop('strapi_id', data)) {
          data.strapi_id = crypto.randomBytes(16).toString('hex');
        }
      });

      _.set(model, 'lifecycles.afterCreate', async (entity, data) => {
        console.log('afterCreate', entity);

        await strapi.query('translation', 'i18n').create({
          strapi_id: data.strapi_id,
          ref_id: entity.id,
          ref_type: model.collectionName,
          locale: entity.strapi_locale,
        });
      });

      console.log(model);
    }
  });

  // wrap content manager routes

  strapi.plugin('content-manager').config.routes.forEach(route => {
    // add a policy to the route we want to extend
  });

  // or overwrite controllers
};
