import React from 'react';
import GraphWrapper from './GraphWrapper';
import 'antd/dist/antd.css';

function SingleOfficeRoute(props) {
  const { set_view } = props;
  return (
    <div
      className="single-office-route"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <GraphWrapper set_view={set_view} />
    </div>
  );
}

export default SingleOfficeRoute;
