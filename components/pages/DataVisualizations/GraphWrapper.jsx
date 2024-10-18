import React from 'react';
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

  function updateStateWithNewData(years, view, office, stateSettingCallback) {
    let url = ''; // Initialize a URL variable

    if (view === 'time-series') {
      url = `https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary`;
    } else if (view === 'citizenship') {
      url = `https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary`;
    }

    const params = {
      from: years[0],
      to: years[1],
    };

    if (office && office !== 'all') {
      params.office = office; // Include office-specific data if provided
    }

    axios.get(url, { params })
      .then(result => {
        console.log('API Response:', result.data); // Log the response

        // Ensure that result.data is in the expected format
        if (!result.data || !Array.isArray(result.data)) {
          throw new Error('Unexpected data format');
        }

        // Convert API data to an array format for rendering
        const processedData = processApiData(result.data);

        // Call the state setting function with the processed data
        stateSettingCallback(view, office, processedData);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const processApiData = (data) => {
    // Assuming data is structured as an array of objects
    const xYears = []; // Initialize years array
    const yTotalPercentGranteds = []; // Initialize y data array
    const rowsForAllDisplay = []; // Prepare rows for all display

    data.forEach(item => {
      // Extract relevant information from each item
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
