import React, { useState } from 'react';
import '../ControlPanel.css';
import { RosComponent } from '../services/RosConnection';

const Control = () => {

  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');
  //const [connectionStatus, setConnectionStatus] = useState(''); // Bağlantı durumu

  
  const { data: data, connectionStatus: connectionStatus } = 
       RosComponent(message, msgType);


  const [drivingMode, setDrivingMode] = useState(null);



  const handleManualDriving = () => {
    setDrivingMode('manual');
  };

  const handleAutonomousDriving = () => {
    setDrivingMode('autonomous');
  };

  // Başlangıç hızını tutacak state
  const [speed, setSpeed] = useState(0);
  const [isAutonomousDriving, setIsAutonomousDriving] = useState(false);


  const startAutonomousDriving = () => {
    console.log("Otonom sürüş başlatıldı, hız:", speed);
    setIsAutonomousDriving(true);
    // ROS Otonom sürüşü başlat komutu
  };

  const stopAutonomousDriving = () => {
    console.log("Otonom sürüş durduruldu");
    setIsAutonomousDriving(false);
    // Ros otonom sürüşü bitir komutu
  };

  // başlangıç hızı
  const handleSpeedChange = (event) => {
    if (event.target.value>=0 && event.target.value<=5)
    {
      setSpeed(event.target.value);
    }
    else
    {
      alert("Geçerli bir hız değeri girin!");
    }
  };

  if (connectionStatus !== 'connected')
  {
    return <div className='connection-page'>ROS has not been connected. {connectionStatus}</div>;
  }

  return (
  <div className="control-panel">
      <button className='button-choose' style={{ backgroundColor: drivingMode === 'manual' ? '	#0277BD' : 'orange' }} onClick={handleManualDriving}>Manuel Driving</button>
      <button className='button-choose' style={{ backgroundColor: drivingMode === 'autonomous' ? '	#F4511E' : 'orange' }} onClick={handleAutonomousDriving}>Autonomous Driving</button>
      
      {drivingMode === 'manual' && (
        <div className="control-panel-buttons">
         
          <button className='button-ileri'>↑</button>
          <button className='button-sol'>←</button>
          <button className='button-sağ'>→</button>
          <button className='button-geri'>↓</button>
          <button className='button-dur'>Stop</button>
        </div>
      )}



      {drivingMode === 'autonomous' && (
      <div className='autonomus'>
        <label className="speed-input">
          Başlangıç Hızı:
        <input type="number" value={speed} onChange={handleSpeedChange} />
        </label>
        <button className='button-control' onClick={startAutonomousDriving} disabled={isAutonomousDriving} 
            style={{ backgroundColor: isAutonomousDriving ? 'red' : 'orange' }}>Start Autonomous Driving</button>
        <button className='button-control' onClick={stopAutonomousDriving} disabled={!isAutonomousDriving}>Stop Autonomous Driving</button>
        <p style={{color:'white'}}> ros mesajı {message}</p>

      </div>
       )}
  </div>
);
};

export default Control;
