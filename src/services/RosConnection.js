import { useEffect, useState} from 'react';
import ROSLIB from 'roslib';

export const RosComponent = (msgTopic, messageType) => {
  const [data, setData] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  useEffect(() => {
    // ROS Bridge bağlantısı kurulur
    const ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090' 
    });

    ros.on('connection', () => {
      console.log('connected');
      setConnectionStatus('connected');
     
    });

    ros.on('error', (error) => {
      console.log('connection error', error);
      setConnectionStatus('connection error');
      
    });

    ros.on('close', () => {
      console.log('Closed');
      setConnectionStatus('closed');
     
      
    });

  
    const connect = new ROSLIB.Topic({
      ros,
      name: msgTopic,
      messageType: messageType,
    });

    connect.subscribe((message) => {
      setData(message);
     
    });


    return () => {
      connect.unsubscribe();
    };
  }, [msgTopic, messageType]);

  return {data, connectionStatus};
};

