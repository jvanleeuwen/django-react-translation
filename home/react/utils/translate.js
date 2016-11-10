import React from 'react';
import django from 'django';

const flags = {
  en: '🇬🇧',
  nl: '🇳🇱',
};

const language = document.documentElement.lang;

const translateWith = (func, ...args) => {
  const translation = django[func](...args);

  if (MARK_TRANSLATIONS) {
    return (
      <code>{flags[language]} {translation}</code>
    );
  }

  return translation;
};

const gettext = (...args) => (
  translateWith('gettext', ...args)
);

const pgettext = (...args) => (
  translateWith('pgettext', ...args)
);

const ngettext = (...args) => (
  translateWith('ngettext', ...args)
);

export {
  gettext,
  pgettext,
  ngettext,
};
