import React, { Component } from 'react';
import { SearchPanelProps } from '../../constants/proptypes';
import './SearchPanel.css';

class SearchPanel extends Component {
  state = {
    term: '',
  };

  onSearchChange = (e) => {
    const term = e.target.value;

    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    return (
      <div className="ui input">
        <input
          placeholder="Type here to search"
          className="form-control search-input"
          value={this.state.term}
          onChange={this.onSearchChange}
        />
      </div>
    );
  }
}

SearchPanel.propTypes = SearchPanelProps;

export default SearchPanel;
