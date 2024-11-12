// IMPORTANT: This needs to be run BEFORE any API call; the pagination on the BE is set up to be variable, depending on the device's screen.
// Hence, it will depend on the value of bigScreen, below

// Ideally, then, it should live at the tip-top
// that way the useEffect hook will run on the very first render/mount,
// and "bigScreen" can be passed where needed for API calls/pagination/etc

import React, { useEffect, useState } from 'react';
import PageNav from './PageNav';

export default function TempPageContainer() {
  const windowSize = window.innerWidth;
  console.log('window size:', windowSize);

  const [bigScreen, setBigScreen] = useState(true);

  // if windowSize is below 700 then bigScreen is set to false and the "defaultPageSize" changes from 40 to 20
  // page sizes tentative; will change as we coordinate with BE folks

  useEffect(() => {
    if (windowSize < 700) {
      setBigScreen(false);
    } else {
      setBigScreen(true);
    }
  }, []); // eslint-disable-line

  return <PageNav bigScreen={bigScreen} />;
}

// if this isn't read from state, then I don't believe it will affect the render - needs to be plugged into React
