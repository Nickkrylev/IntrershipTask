import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: "",
      type: "",
      color: "",
      wheelSize: 0,
      price: 0,
      id: "",
      description: "",
    };
    this.state = this.initialState;
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  validateForm = () => {
    const { name, type, color, wheelSize, price, id, description } = this.state;
  
    // Trim the values for validation
    const trimmedName = name.trim();
    const trimmedType = type.trim();
    const trimmedColor = color.trim();
    const trimmedId = id.trim();
    const trimmedDescription = description.trim();
  
    // Check if any field is empty
    if (!trimmedName || !trimmedType || !trimmedColor || !wheelSize || !price || !trimmedId || !trimmedDescription) {
      alert("All fields are required.");
      return false;
    }
  
    // Check for minimum length of text fields
    if (trimmedName.length < 5 || trimmedType.length < 5 || trimmedColor.length < 3 || trimmedId.length < 5 || trimmedDescription.length < 5) {
      alert("All text fields must be at least 5 characters long and color field must be at least 3 characters long.");
      return false;
    }
  
    // Check if wheelSize and price are valid numbers
    if (wheelSize <0 || price<0) {
      alert("Wheel Size and Price must be valid numbers and more 0.");
      return false;
    }
  
    // Check if the ID is unique
    if (this.props.existingIds.includes(trimmedId)) {
      alert("ID must be unique. Please enter a different ID.");
      return false;
    }
  
    return true;
  }
  
  handleSave = async () => {
    if (this.validateForm()) {
      try {
        const response = await fetch('/api/bikeAdd', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const savedBike = await response.json();
        console.log('Bike saved:', savedBike);
  
        this.props.onAdd(savedBike); // Update the state in the parent component if necessary
      } catch (error) {
        console.error('Failed to save bike:', error);
      }
    }
  }
  

  handleReset = () => {
    this.setState(this.initialState);
  }

  render() {
    return (
      <form className="formAdmin">
        <div className="block">
          <input name="name" placeholder="Name" value={this.state.name} onChange={this.handleInputChange} />
          <input name="type" placeholder="Type" value={this.state.type} onChange={this.handleInputChange} />
        </div>
        <div className="block">
          <input name="color" placeholder="Color" value={this.state.color} onChange={this.handleInputChange} />
          <input name="wheelSize" placeholder="Wheel Size" type="number" onChange={this.handleInputChange} />
        </div>
        <div className="block">
          <input name="price" type="number" placeholder="Price"  onChange={this.handleInputChange} />
          <input name="id" placeholder="ID (slug):" value={this.state.id} onChange={this.handleInputChange} />
        </div>
        <div className="block">
          <input name="description" className="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange} />
        </div>
        <div className="block">
          <button type="button" onClick={this.handleSave}>SAVE</button>
          <button type="reset" onClick={this.handleReset}>CLEAR</button>
        </div>
      </form>
    );
  }
}

export default Form;
