import React from 'react';
import LineBox from '../components/LineBox';
import { RosComponent } from '../services/RosConnection';

const Dashboard = () => {

  const batteryData = RosComponent('/battery', 'battery_creator/Battery');
  const temperatureData = RosComponent('/temperature', 'std_msgs/String');
  const humidityData = RosComponent('/humidity', 'std_msgs/String');

  return (
    <div style={{
      color: 'white',
      padding: '10px',
    
      display : 'flex',
      justifyContent: 'right',
      
     
  
    }}>
      
      <LineBox title="Temperature" value={temperatureData?.data || 'Loading ... '} unit="°C" />
      <LineBox title="Humidity" value={humidityData?.data || 'Loading ...'} unit="%" />
      <LineBox title="Battery" value={batteryData?.battery || 'LOading...'} unit="%" />

      
    </div>
  );
};

export default Dashboard;
