import React from 'react';
import SendMessage from '../services/RosPublisher';


const EmergencyStop = () => {
   
    const handleEmergencyStop = () => {
    SendMessage('/power_down', 'std_msgs/String', 'power_down');
    console.log('Acil Stop Aktif!');
    
    };
      
  return (
    <button onClick={handleEmergencyStop} className="emergency-stop">Acil Stop</button>
  );
};

export default EmergencyStop;
