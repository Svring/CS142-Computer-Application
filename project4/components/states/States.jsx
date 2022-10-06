import React from 'react';
import './States.css';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    this.States = window.cs142models.statesModel();
    this.state = {
      filter: '',
      filteredStates: this.States,
    }
  }

  handleInput(event) {
    this.setState({ 
      filter: event.target.value,
      filteredStates: this.filteredStates(this.States, event.target.value)
    });
  }

  filteredStates(States, filter) {
    return States.filter( st => st.toLowerCase().includes(filter.toLowerCase()));
  }

  render() {
    return (
      <div>
        <div class="user-command">
          <p>Please input</p>
          <input 
            className="filter" 
            type="text" 
            value={this.state.filter} 
            onChange={ event => this.handleInput(event) }
          />
        </div>
        <div class="search-result">
          {this.state.filteredStates.map(st => <li key={st}>{st}</li>)}
        </div>
      </div>
    );
  }
}

export default States;
