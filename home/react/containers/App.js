import React from 'react';
import strftime from 'strftime';
import { gettext, pgettext, ngettext, interpolate, get_format } from 'django'; // eslint-disable-line

const DATE_FORMAT = get_format('DATE_INPUT_FORMATS')[0];

export default () => (
  <div>
    <table className="u-full-width">
      <thead>
        <tr>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{gettext('It works')}</td>
        </tr>
      </tbody>
    </table>

    <table className="u-full-width">
      <thead>
        <tr>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{pgettext('client', 'It works contextual')}</td>
        </tr>
        <tr>
          <td>{pgettext('counselor', 'It works contextual')}</td>
        </tr>
      </tbody>
    </table>

    <table className="u-full-width">
      <thead>
        <tr>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{interpolate(ngettext('There is one client', 'There are %s clients', 2), [2])}</td>
        </tr>
        <tr>
          <td>{interpolate(ngettext('There is one counselor', 'There are %s counselors', 1), [1])}</td>
        </tr>
      </tbody>
    </table>

    <table className="u-full-width">
      <thead>
        <tr>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{strftime(DATE_FORMAT)}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
