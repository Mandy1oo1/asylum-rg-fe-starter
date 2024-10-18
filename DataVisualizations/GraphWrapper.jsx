import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';

import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }

  let map_to_render;
  
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }

  const updateStateWithNewData = (years, view, office, stateSettingCallback) => {
    setLoading(true);
    setError(null); // Reset error state
  
    let url = '';
    const params = {
      from: years[0],
      to: years[1],
    };
  
    if (view === 'time-series') {
      url = `https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary`;
    } else if (view === 'citizenship') {
      url = `https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary`;
    }
  
    if (office && office !== 'all') {
      params.office = office; // Include office-specific data if provided
    }
  
    axios.get(url, { params })
      .then(result => {
        setLoading(false);
        const apiData = result.data;
  
        // Wrap single object in an array
        const dataToProcess = Array.isArray(apiData) ? apiData : [apiData];
  
        const processedData = processApiData(dataToProcess);
        stateSettingCallback(view, office, processedData);
      })
      .catch(err => {
        setLoading(false);
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      });
  };

  const processApiData = (data) => {
    const xYears = [];
    const yTotalPercentGranteds = [];
    const rowsForAllDisplay = [];

    data.forEach(item => {
      const { fiscalYear, totalCases, granted, denied, adminClosed } = item;

      xYears.push(fiscalYear);
      yTotalPercentGranteds.push(granted);

      rowsForAllDisplay.push({
        fiscalYear,
        totalCases,
        percentGranted: granted,
        percentAdminClose: (adminClosed / totalCases) * 100,
        percentDenied: (denied / totalCases) * 100,
      });
    });

    return {
      xYears,
      yTotalPercentGranteds,
      rowsForAllDisplay,
    };
  };

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
