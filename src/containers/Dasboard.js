import React from 'react';
import LineBox from '../components/LineBox';
import { RosComponent } from '../services/RosConnection';

const Dashboard = () => {

  const { data: batteryData,} = RosComponent('/battery', 'battery_creator/Battery');
  const {data : temperatureData,} = RosComponent('/tempeture', 'tempeture_creator/Tempeture');


  return (
    <div style={{
      color: 'white',
      padding: '10px',
      display : 'flex',
      justifyContent: 'right',
      
     
  
    }}>
      
      <LineBox title="Temperature"  value={temperatureData ? `${temperatureData.tempeture}` : 'Loading ...'} unit="°C" />
      <LineBox title="Humidity" value={temperatureData ? `${temperatureData.humidity}` : 'Loading ...'} unit="%" />
      <LineBox title="Battery" value={batteryData ? `${batteryData.battery}` : 'Loading ...'} unit="%" />

      
    </div>
  );
};

export default Dashboard;
