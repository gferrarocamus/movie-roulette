import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import List from '../List';
import Empty from '../Empty';
import { listDetails, listKeys } from '../../data';
import { getListFromStorage } from '../../services/lib';

const Lists = (props) => {
  const [watchlist, setWatchlist] = useState([]);
  const [rejects, setRejects] = useState([]);
  const [loading, setLoading] = useState(true);

  const childProps = {
    watchlist: {
      list: watchlist,
      setList: setWatchlist,
    },
    rejects: {
      list: rejects,
      setList: setRejects,
    },
  };

  useEffect(() => {
    setWatchlist(getListFromStorage('watchlist'));
    setRejects(getListFromStorage('rejects'));
    setLoading(false);
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return watchlist.length < 1 && rejects.length < 1
    ? (
      <Empty description="All Lists Empty (for Now)" content={null} />
    ) : (
      <div className="lists-container" style={{ maxWidth: '1440px', alignSelf: 'stretch' }}>
        {listKeys.map((key, i) => (
          <List
            details={listDetails[i]}
            key={key}
            listKey={key}
            {...childProps[key]}
            {...props}
          />
        ))}
      </div>
    );
};

export default Lists;
