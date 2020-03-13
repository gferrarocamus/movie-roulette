import React from 'react';
import Empty from '../Empty';
// import PropTypes from 'prop-types';

const Watchlist = () => (
  <div>
    <Empty
      description="No Movies Discovered (Yet)"
      content={() => null}
    />
  </div>
);

Watchlist.propTypes = {};

Watchlist.defaultProps = {};

export default Watchlist;
