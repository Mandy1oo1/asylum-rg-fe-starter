export const rawApiDataToPlotlyReadyInfo = (data) => {
  // Check if the data is valid
  if (!data || typeof data !== 'object') {
    console.error('Invalid data structure:', data);
    return null; // or return a default value if applicable
  }

  // Assuming you need to access data in a specific way, adjust accordingly
  const xYears = data.xYears || []; // Default to an empty array if not found
  const yTotalPercentGranteds = data.yTotalPercentGranteds || []; // Default to an empty array if not found

  // Example of further processing (adjust according to your actual structure)
  if (!Array.isArray(xYears) || !Array.isArray(yTotalPercentGranteds)) {
    console.error('Expected arrays but received:', { xYears, yTotalPercentGranteds });
    return null;
  }

  // Further processing...
  return {
    xYears,
    yTotalPercentGranteds,
    // Include other processed information as needed
  };
};
