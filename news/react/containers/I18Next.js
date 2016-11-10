import React, { PropTypes } from 'react';

function I18Next({ translate }) {
  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>-</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{translate('client')}</td>
        </tr>
      </tbody>
    </table>
  );
}

I18Next.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default I18Next;
