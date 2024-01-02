import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import BikesCard from './components/BikesCard';
import Statistics from './components/Statistics';
import './style/App.css';
import './style/Form.css';
import './style/Bike.css';
import './style/Statistics.css';
function App() {
    
  useEffect(() => {
    async function fetchBikes() {
      try {
        const response = await fetch('/api/bikes');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const bikesData = await response.json();
        setBikes(bikesData);
  
        // Now calculate the initial statistics based on the fetched bikes
        calculateInitialStatistics(bikesData);
      } catch (error) {
        console.error("Failed to fetch bikes:", error);
      }
    }
  
    fetchBikes();
  }, []);
  
  // Define the function to calculate initial statistics
  const calculateInitialStatistics = (bikesData) => {
    const total = bikesData.length;
    const totalprice = bikesData.reduce((sum, bike) => sum + parseFloat(bike.price), 0);
    const averagePrice = total > 0 ? totalprice / total : 0;
    const available = bikesData.filter(bike => bike.status === 'available').length;
    const booked = bikesData.filter(bike => bike.status === 'busy').length;
  
    setStatistic({
      total: total,
      available: available,
      booked: booked,
      averagePrice: averagePrice
    });
  };
  

  const [bikes, setBikes] = useState([]);
  const [statistic, setStatistic] = useState({
    total: 0,
    available: 0,
    booked: 0,
    averagePrice: 0
  });
  function updateStatistics(newStatus, oldStatus) {
    setStatistic(currentStats => {
      let { available, booked } = currentStats;
  
      // Increment or decrement the counts based on the status change
      if (oldStatus === 'available') available--;
      if (oldStatus === 'busy') booked--;
      if (newStatus === 'available') available++;
      if (newStatus === 'busy') booked++;
  
      return {
        ...currentStats,
        available,
        booked,
      };
    });
  }
  
  function addBicycle(bike) {
    setBikes(currentBikes => {
      // Add the new bike to the array
      const updatedBikes = [...currentBikes, bike];
  
      // Calculate the total number of bikes
      const total = updatedBikes.length;
  
      // Calculate the total price of all bikes
      const totalprice = updatedBikes.reduce((sum, currentBike) => sum + parseFloat(currentBike.price), 0);
  
      // Calculate the average price
      const averagePrice = total > 0 ? totalprice / total : 0;
  
      // Update dataStatistic state
      setStatistic(statistic => ({
        ...statistic,
        total: total,
        averagePrice: averagePrice
      }));
  
      return updatedBikes;
    });
  }
  
  function removeBicycle(bikeID) {
    setBikes(currentBikes => {
      // Remove the bike from the list
      const updatedBikes = currentBikes.filter(bike => bike.id !== bikeID);
  
      // Recalculate the statistics
      const total = updatedBikes.length;
      const totalprice = updatedBikes.reduce((sum, bike) => sum + parseFloat(bike.price), 0);
      const averagePrice = total > 0 ? totalprice / total : 0;
  
      // Update the number of available and booked bikes
      const available = updatedBikes.filter(bike => bike.status === 'available').length;
      const booked = updatedBikes.filter(bike => bike.status === 'busy').length;
  
      // Set the new statistics
      setStatistic({
        total: total,
        available: available,
        booked: booked,
        averagePrice: averagePrice
      });
  
      return updatedBikes;
    });
  }
  const existingIds = bikes.map(bike => bike.id);

  return (
    <div className="App">
      <header className="App-header">
        ADMIN.BIKE-BOOKING.COM
      </header>
      <div className="center">
        <BikesCard bikes={bikes} onStatusChange={updateStatistics}  onRemoveBicycle={removeBicycle}  />

        <div className="blockFormAndStatistics">
        <Form onAdd={addBicycle} existingIds={existingIds} />
          <Statistics data={statistic} />
          
        </div>
      </div>
      <footer className="App-footer">
        <span className="Developer">Developer: </span>
        <span>Mykyta Kryliev</span>
      </footer>
    </div>
  );
}

export default App;