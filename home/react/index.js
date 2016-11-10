import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './containers/App';

requestAnimationFrame(() => {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('container'),
  );

  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      const NextApp = require('./containers/App').default; // eslint-disable-line global-require

      render(
        <AppContainer>
          <NextApp />
        </AppContainer>,
        document.getElementById('container'),
      );
    });
  }
});
