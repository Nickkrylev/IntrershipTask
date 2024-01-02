import Bike from "./Bike"
import React from 'react';
class BikesCard extends React.Component{
  
  render(){
    if(this.props.bikes.length > 0)
      return(<div>
        {this.props.bikes.map((bike) => (
          <Bike key={bike.id} bike={bike} onStatusChange={this.props.onStatusChange} onRemoveBicycle={this.props.onRemoveBicycle}  />
        ))}
   
    </div>)
    else
        return(
          <div className="Bike">
            <h1>No data about bike</h1>
          </div>
      )
  }
}

export default BikesCard;