import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends Component {
  state = {
    searchValue: '',
  }

  handleSearchText = (event) => {
    const { value } = event.target;

    this.setState({ searchValue: value });
  };

  handleSubmitPosts = (event) => {
    event.preventDefault();
    const { filterList } = this.props;
    const { searchValue } = this.state;

    filterList(searchValue);
  }

  handleResetList = () => {
    this.setState({ searchValue: '' });
    const { resetList } = this.props;

    resetList();
  }

  handleResetList

  render() {
    const { searchValue } = this.state;

    return (
      <div>
        <form className="search-form" onSubmit={this.handleSubmitPosts}>
          <input
            placeholder="type here..."
            onChange={this.handleSearchText}
            value={searchValue}
          />
          <button type="submit">Search</button>
        </form>
        <button
          type="submit"
          onClick={this.handleResetList}
        >
            Show all
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  filterList: PropTypes.func.isRequired,
  resetList: PropTypes.func.isRequired,
};

export default Search;
