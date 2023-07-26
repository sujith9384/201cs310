import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        // Replace 'YOUR_BACKEND_API_URL' with your actual backend API endpoint
        const response = await axios.get('http://20.244.56.144:80/train/trains', {
          headers: {
            Authorization: 'http://20.244.56.144/train/auth/',
          },
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h1>All Trains Schedule</h1>
      {trains.map((train) => (
        <div key={train.trainNumber}>
          <h2>{train.trainName}</h2>
          <p>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}:{train.departureTime.Seconds}</p>
          <p>Seat Availability (Sleeper): {train.seatsAvailable.sleeper}</p>
          <p>Seat Availability (AC): {train.seatsAvailable.AC}</p>
          <p>Price (Sleeper): {train.price.sleeper}</p>
          <p>Price (AC): {train.price.AC}</p>
          <p>Delayed By: {train.delayedBy}</p>
        </div>
      ))}
    </div>
  );
};

export default TrainList;
