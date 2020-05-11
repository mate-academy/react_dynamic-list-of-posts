import React, { Component } from 'react';
import { StateSearch } from '../Interface';

interface Props {
  setSearchQuery: (query: string) => void;
}

export class Search extends Component<Props> {
  state: StateSearch = {
    searchQuery: '',
  };

  // eslint-disable-next-line react/sort-comp
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };

  debounce = (f: Function, delay: number) => {
    let timerId: any;

    const debounced = () => {
      clearTimeout(timerId);
      timerId = setTimeout(f, delay);
    };

    return debounced;
  };

  sendQuery = () => {
    const { setSearchQuery } = this.props;
    const { searchQuery } = this.state;

    setSearchQuery(searchQuery);
  };

  wrapper = this.debounce(this.sendQuery, 1000);

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
              this.wrapper();
            }}
          />
        </div>
      </div>
    );
  }
}
