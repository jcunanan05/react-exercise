import React from 'react';

class EditFishForm extends React.Component {
  handleChange = (e) => {
    //update the fish
    console.log(e.currentTarget);
    // 1. Take a copy of that fish and edit it
    const updatedFish = {
      ...this.props.fish,
      [e.currentTarget.name]: e.currentTarget.value
    };
    //pass it to the state
    this.props.updateFish(this.props.index, updatedFish);
  }

  render() {
    return <div className="fish-edit">
      <input 
        type="text" 
        name="name" 
        onChange={this.handleChange} 
        value={this.props.fish.name} /> 
      <input 
        type="text" 
        name="price" 
        onChange={this.handleChange} 
        value={this.props.fish.price} />
      <select 
        name="status" 
        onChange={this.handleChange} 
        value={this.props.fish.status} >
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea 
        name="desc" 
        onChange={this.handleChange} 
        value={this.props.fish.desc}></textarea>
      <input 
        type="text" 
        name="image" 
        onChange={this.handleChange} 
        value={this.props.fish.image} />

      <button onClick={() => {this.props.deleteFish(this.props.index)}}>
        Remove Fish
      </button>
    </div>;
  }
}

export default EditFishForm;