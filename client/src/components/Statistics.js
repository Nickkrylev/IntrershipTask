import React from 'react';

class Statistics extends React.Component {
  render() {
 
    const { total, available, booked, averagePrice } = this.props.data;

    return (
      <div className='statisticsMain'>
        <span className='headerStatic'>STATISTICS</span>
        <div>Total Bikes: <span>{total}</span></div>
        <div>Available Bikes: <span>{available}</span></div>
        <div>Booked Bikes: <span>{booked}</span></div>
        <div>Average Bike Cost: <span>{averagePrice.toFixed(2)}</span> UAH/hr</div>
      </div>
    );
  }
}

export default Statistics;
