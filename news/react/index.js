import React from 'react';
import { render } from 'react-dom';
import { gettext, pgettext } from 'django';
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import Jed from 'jed';
import mapKeys from 'lodash/fp/mapKeys';
import mapValues from 'lodash/fp/mapValues';
import castArray from 'lodash/fp/castArray';

import I18NextContainer from './containers/I18Next';
import JedContainer from './containers/Jed';

function i18nContexter(translations) {
  return mapKeys((key) => {
    const splitted = key.split('\u0004');

    if (splitted.length === 2) {
      return `${splitted[1]}_${splitted[0]}`;
    }

    return key;
  }, translations);
}

function jedContexter(translations) {
  return mapValues(castArray, translations);
}

const language = document.documentElement.lang;

i18next
  .use(XHR)
  .init({
    backend: {
      loadPath: 'i18n/json/',
      parse: (json) => {
        const data = JSON.parse(json);
        return i18nContexter(data.catalog);
      },
    },
    nsSeparator: false,
    keySeparator: false,
    context: true,
    lng: language,
    fallbackLng: 'en',
  }, (err, translate) => {
    if (err) {
      return;
    }

    render(
      <I18NextContainer translate={translate} />,
      document.getElementById('container-i18next'),
    );
  });

const jed = new Jed({
  locale_data: {
    messages: Object.assign({},
      {
        '': {
          domain: 'messages',
          lang: language,
        },
      },
      jedContexter(window.django.catalog),
    ),
  },
});

render(
  <JedContainer jed={jed} />,
  document.getElementById('container-jed'),
);

render(
  <JedContainer jed={jed} />,
  document.getElementById('container-jed-server'),
);

gettext('client');
pgettext('context', 'Test');
