import React, { Component } from 'react';
import { debounce } from '../../helpers';

type State = {
  searchQuery: string;
};

type Props = {
  setSearchQuery: (query: string) => void;
};

export class Search extends Component<Props> {
  state: State = {
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
