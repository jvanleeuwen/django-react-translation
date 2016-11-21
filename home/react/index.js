/* eslint-disable global-require */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

requestAnimationFrame(() => {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('container'),
  );

  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      render(
        <AppContainer>
          <App />
        </AppContainer>,
        document.getElementById('container'),
      );
    });
  }
});
