require('isomorphic-fetch');
require('babel-core/register');

const express = require('express');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Jed = require('jed');
const mapValues = require('lodash/fp/mapValues');
const castArray = require('lodash/fp/castArray');
const bodyParser = require('body-parser');
const chalk = require('chalk');

const JedContainer = require('./containers/Jed');

const app = express();

app.use(bodyParser.json());

app.post('/', (req, res) => {
  const { locale_path } = req.body;

  fetch(`http://localhost:8000${locale_path}`) // eslint-disable-line
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }

      const language = response.headers.get('content-language');

      response
        .json()
        .then(({ catalog }) => {
          const jed = new Jed({
            locale_data: {
              messages: Object.assign({},
                {
                  '': {
                    domain: 'messages',
                    lang: language,
                  },
                },
                mapValues(castArray, catalog) // eslint-disable-line
              ),
            },
          });

          const component = ReactDOM.renderToString(
            React.createElement(JedContainer.default, { jed }) // eslint-disable-line
          );

          console.log(chalk.green(`=> Processed render request: ${language}`)); // eslint-disable-line

          res.send(component);
        })
        .catch((err) => {
          console.log(chalk.red(`=> Error rendering request: ${err}`)); // eslint-disable-line
        });
    });
});

app.listen(3010, () => (
  console.log(chalk.green('=> Server started on port 3010')) // eslint-disable-line
));
