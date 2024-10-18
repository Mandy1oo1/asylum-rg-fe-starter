import React, { useEffect } from 'react';
import { rawApiDataToPlotlyReadyInfo } from '../../../utils/rawApiDataToPlotlyReadyInfo';

const YearLimitsSelect = ({ stateSettingFn, updateStateWithNewData }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Log the fetched data to inspect its structure
        console.log('Fetched data:', data);

        // Process the data using the imported function
        const processedData = rawApiDataToPlotlyReadyInfo(data);
        
        // Update state only if processedData is valid
        if (processedData) {
          stateSettingFn(processedData);
          updateStateWithNewData(processedData);
        } else {
          console.error('Processed data is invalid or undefined:', processedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cleanup function if needed
    return () => {
      // Any cleanup logic if needed
    };
  }, [stateSettingFn, updateStateWithNewData]);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default YearLimitsSelect;
