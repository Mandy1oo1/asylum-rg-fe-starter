import React from 'react';
//Import links for graph images
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

function RenderLandingPage(props) {
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const history = useHistory();

  return (
    <div className="main">
      <div className="header">
        <div className="header-text-container">
          <h1>Asylum Office Grant Rate Tracker</h1>
          <h3>
            The Asylum Office Grant Rate Tracker provides asylum seekers,
            researchers, policymakers, and the public an interactive tool to
            explore USCIS data on Asylum Office decisions
          </h3>
        </div>
      </div>

       {/* Section displaying imported graphs from folder /style/Images */}     
       <div className="graphs-section">
   <div className="graph-container">
     <img src={GrantRatesByOfficeImg} alt="Bar graph" className="graph-img" />
     <h4>Search Grant Rates by Office</h4>
   </div>
   <div className="graph-container">
     <img src={GrantRatesByNationalityImg} alt="Pie chart" className="graph-img pie-chart-img" />
     <h4>Search Grant Rates by Nationality</h4>
   </div>
   <div className="graph-container">
     <img src={GrantRatesOverTimeImg} alt="Line graph" className="graph-img" />
     <h4>Search Grant Rates Over Time</h4>
   </div>
</div>



  
      <div className="view-more-data-btn-container">
        <Button
          type="default"
          style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
          onClick={() => history.push('/graphs')}
        >
          View the Data
        </Button>
      </div>

      <div className="middle-section">
        <div className="hrf-img-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>
            Human Rights First has created a search tool to give you a
            user-friendly way to explore a data set of asylum decisions between
            FY 2016 and May 2021 by the USCIS Asylum Office, which we received
            through a Freedom of Information Act request. You can search for
            information on asylum grant rates by year, nationality, and asylum
            office, visualize the data with charts and heat maps, and download
            the data set
          </h3>
        </div>
      </div>

    {/*Bottom Section containing paragraphs on insights from the data */}
      <div>
  <div className="bottom-section">
    <div className="section-title">Systemic Disparity Insights</div>
    
    <div className="stat-container">
      <div className="statistic">
        <div className="title">36%</div>
        <div className="description">
          By the end of the Trump administration, the average asylum office grant rate had fallen 36 percent from an average of 44 percent in the fiscal year 2016 to 28 percent in the fiscal year 2020.
        </div>
      </div>
      
      <div className="statistic">
        <div className="title">5%</div>
        <div className="description">
          The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.
        </div>
      </div>
      
      <div className="statistic">
        <div className="title">6x Lower</div>
        <div className="description">
          Between fiscal year 2017 and 2020, the New York asylum office's average grant rate was six times lower than the San Francisco asylum office.
        </div>
        </div>
    </div>

        <p onClick={() => scrollToTop()} className="back-to-top">
          Back To Top ^
        </p>
      </div>
    </div>
    </div>
    
  );
}
export default RenderLandingPage;
