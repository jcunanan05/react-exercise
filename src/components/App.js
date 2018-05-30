import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }; 

  componentDidMount() {
    const params = this.props.match.params;
    //reinstate our localStorage
    const localStorageRef = localStorage.getItem(`${params.storeId}`);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // make copy of state
    const fishes = { ...this.state.fishes };
    // add fish to variable
    fishes[`fish${Date.now()}`] = fish;
    // set state
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    //take copy of current state
    const fishes = { ...this.state.fishes };
    //set state
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  deleteFish = (key) => {
    //take a copy of state 
    const fishes = { ...this.state.fishes };
    //update the state 
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    // 1. take a copy of state,
    const order = { ...this.state.order };
    // 2. Add to order or Update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. setState
    this.setState({ order });
  }

  removeFromOrder = (key) => {
    // 1. take a copy of state,
    const order = { ...this.state.order };
    // 2. Remove the item from order
    delete order[key]
    // 3. setState
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />

          <ul className="fishes">
            { 
              Object.keys(this.state.fishes).map(key => (
                  <Fish key={key} 
                    index={key}
                    details={this.state.fishes[key]} 
                    addToOrder={this.addToOrder} />
                )) 
            }
          </ul>
        </div>

        <Order 
          fishes={this.state.fishes}
          removeFromOrder={this.removeFromOrder} 
          order={this.state.order} />

        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes} />
      </div>
    );
  }
}

export default App;