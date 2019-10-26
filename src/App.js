import React, { Component } from 'react';
import './App.css';
import MultiSelectDropdown from './multi-select-dropdown';

class App extends Component {

  state = {
    selected: []
  }

  options = [
    {
      name: 'option 1',
      id: '1'
    },
    {
      name: 'option 2',
      id: '2'
    },
    {
      name: 'option 3',
      id: '3'
    },
    {
      name: 'option 4',
      id: '4'
    }
  ];

  getSelected = selected => {
    this.setState({
      selected: selected
    })
  }

  render() {
    return (
      <div className="App border" style={{ width: '300px', margin: '0 auto' }}>
        <MultiSelectDropdown options={this.options} getSelected={this.getSelected} />
        <br />
        <hr />
        <p>Selected: </p>
        {this.state.selected.map((value, key) => (
          <p key={key}>{value.name}</p>
        ))}
      </div>
    );
  }
}

export default App;
