'use strict';

module.exports = {
  kind: 'collectionType',
  collectionName: 'strapi_i18n_localizations',
  info: {
    name: 'Translation',
  },
  options: {
    increments: true,
  },
  attributes: {
    strapi_id: {
      type: 'string',
    },
    ref_id: {
      type: 'string',
    },
    ref_type: {
      type: 'string',
    },
    locale: {
      type: 'string',
    },
  },
};
