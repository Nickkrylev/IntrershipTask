import React from 'react';

class Bike extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          status: this.props.bike.status || 'unavailable'
        };
      }

   
      handleStatusChange = async (event) => {
        const newStatus = event.target.value.toLowerCase();
        const oldStatus = this.state.status;
        console.log('New Status:', newStatus); // Debugging
      
        this.setState({ status: newStatus }, async () => {
          try {
            const response = await fetch(`/api/bikes/${this.props.bike.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ status: newStatus })
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            console.log(newStatus, this.state.status);
            this.props.onStatusChange(newStatus, oldStatus);
          } catch (error) {
            console.error("Failed to update bike status:", error);
            this.setState({ status: this.state.status });
          }
        });
      };
      
      handleRemove = async () => {
        try {
          const response = await fetch(`/api/bikeDel/${this.props.bike.id}`, {
            method: 'DELETE'
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          console.log(`Bike with ID ${this.props.bike.id} deleted`);
          this.props.onRemoveBicycle(this.props.bike.id);
        } catch (error) {
          console.error("Failed to delete bike:", error);
        }
      }
      
    render() {
       
        const { status } = this.state;
   

        // Dynamically create options
        const statusOptions = ['unavailable', 'available', 'busy'];
        const orderedOptions = [
            status, // Add the current status first
            ...statusOptions.filter(opt => opt !== status) // Then add the rest of the statuses, excluding the current one
        ];

        return (
            <div className={`Bike ${status}`}>
                <div className='BikeHeader'>
                    <span>
                        <span className='name'>{this.props.bike.name}</span> - 
                        <span className='typeAndcolor'> {this.props.bike.type}({this.props.bike.color})</span>
                    </span>
                    <span className='close' onClick={this.handleRemove}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 9L1 1M9 1L1 9" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </span>
                </div>
                <span className='ID'> ID: {this.props.bike.id}</span>
                
                <div className="status">
                    <span className='statusSelect'>STATUS:
                        <div className="select-container">
                        <select onChange={this.handleStatusChange} value={status}>
                                {orderedOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                            <svg viewBox="138 11 10 5" fill="none" xmlns="http://www.w3.org/2000/svg" className="select-arrow">
                                <path d="M138 11L143 16L148 11H138Z" fill="black"></path>
                            </svg>
                        </div>
                    </span>
                    <span className="price">{this.props.bike.price} UAH/hr.</span>
                </div>
            </div>
        );
    }
}

export default Bike;
