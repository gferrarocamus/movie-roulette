import React from 'react';
import List from '../List';
import { listDetails, listKeys } from '../../data';

const Lists = (props) => {
  return (
    <div>
      {listKeys.map((key, i) => (
        <List key={key} listKey={key} details={listDetails[i]} {...props} />
      ))}
    </div>
  );
};

export default Lists;
