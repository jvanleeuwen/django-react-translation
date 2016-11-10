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
  const { language, path } = req.body;

  fetch(`http://localhost:8000${path}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }

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
            React.createElement(JedContainer.default, { jed })
          );

          console.log(chalk.green('=> Processed render request'));

          res.send(component);
        });
    });
});

app.listen(3010, () => (
  console.log(chalk.green('=> Server started on port 3010'))
));
