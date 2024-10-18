import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import Table from './TableComponents/Table';
import { colors } from '../../../../styles/data_vis_colors';

const { background_color } = colors;

const mapStateToProps = (state) => {
  return {
    timeSeriesAllData: state.vizReducer.timeSeriesAllData,
  };
};

function TimeSeriesAll(props) {
  const { timeSeriesAllData } = props;
  const currentYear = new Date().getFullYear();
  const [rowsForAllDisplay, setRowsForAllDisplay] = useState([]);

  // Table columns definition
  const columnsForAllDisplay = [
    'Fiscal Year',
    'Total Cases',
    '% Granted',
    '% Admin Close / Dismissal',
    '% Denied',
  ];

  // Update table rows when timeSeriesAllData changes
  useEffect(() => {
    // Safely access rowsForAllDisplay
    if (!timeSeriesAllData || !timeSeriesAllData.xYears || !timeSeriesAllData.yTotalPercentGranteds) {
      return <div>Loading data...</div>; // or handle as appropriate
  } else {
      setRowsForAllDisplay([]); // Set to empty array if undefined
    }
  }, [timeSeriesAllData]);

  // Debugging log to check the structure of timeSeriesAllData
  console.log('TimeSeriesAllData:', timeSeriesAllData);

  return (
    <div
      className="time-series-all-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100px',
        justifyContent: 'center',
      }}
    >
      <p>Showing: Time series data for all USCIS Asylum Offices</p>
      <Plot
        data={[
          {
            x: timeSeriesAllData['xYears'] || [], // Fallback to empty array if undefined
            y: timeSeriesAllData['yTotalPercentGranteds'] || [], // Fallback to empty array if undefined
            type: 'scatter',
            mode: 'lines+markers',
            dy: 1,
            dx: 1,
          },
        ]}
        layout={{
          title: 'Asylum Grant Rate for All USCIS Asylum Offices Over Time',
          height: 500,
          width: 700,
          yaxis: {
            range: [0, 100],
            title: 'Asylum Grant Rate %',
            autotick: false,
            dtick: 10,
          },
          xaxis: {
            range: [
              (timeSeriesAllData['xYears'] && timeSeriesAllData['xYears'][0]) || 2015,
              (timeSeriesAllData['xYears'] && timeSeriesAllData['xYears'][timeSeriesAllData['xYears'].length - 1]) || currentYear,
            ],
            title: 'Fiscal Year',
          },
          paper_bgcolor: background_color,
          hoverlabel: {
            bordercolor: background_color,
          },
        }}
      />
      <p>Table view</p>
      <Table
        columns={columnsForAllDisplay}
        rows={rowsForAllDisplay}
        tableWidth={'100%'}
        rowHeight={'50px'}
      />
    </div>
  );
}

export default connect(mapStateToProps)(TimeSeriesAll);
