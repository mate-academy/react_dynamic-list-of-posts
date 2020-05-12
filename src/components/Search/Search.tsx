import React, { Component } from 'react';
import { StateSearch } from '../Interface';
import { debounce } from '../../helpers';

interface Props {
  setSearchQuery: (query: string) => void;
}

export class Search extends Component<Props> {
  state: StateSearch = {
    searchQuery: '',
  };

  debouncedSendQuery = debounce(() => {
    const { setSearchQuery } = this.props;
    const { searchQuery } = this.state;

    setSearchQuery(searchQuery);
  }, 1000);

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="field">
        <div className="control">
          <input
            className="input is-primary"
            type="text"
            placeholder="Input text"
            value={searchQuery}
            onChange={e => {
              this.handleInputChange(e);
              this.debouncedSendQuery();
            }}
          />
        </div>
      </div>
    );
  }
}
