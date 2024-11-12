import React from 'react';
import GraphWrapper from './GraphWrapper';
import 'antd/dist/antd.css';

function AllOfficesRoute(props) {
  const { set_view } = props;
  return (
    <div className="all-offices-route">
      <GraphWrapper set_view={set_view} />
    </div>
  );
}

export default AllOfficesRoute;
