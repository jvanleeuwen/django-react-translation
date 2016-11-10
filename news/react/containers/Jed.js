import React, { PropTypes } from 'react';

function Jed({ jed }) {
  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>-</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{jed.gettext('client')}</td>
        </tr>
      </tbody>
    </table>
  );
}

Jed.propTypes = {
  jed: PropTypes.shape({
    gettext: PropTypes.func,
    pgettext: PropTypes.func,
  }),
};

export default Jed;
