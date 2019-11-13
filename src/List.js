import React from 'react';

import Content from './Content';
import loadConnect from './loadConnect';

class List extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      posts: null,
      isLoaded: false,
      value: '',
    };

    this.loads = this.loads.bind(this);
    this.filterName = this.filterName.bind(this);
  }

  async loads() {
    this.setState({
      isLoaded: true
    });
    let posts = await loadConnect('https://jsonplaceholder.typicode.com/comments',
      'https://jsonplaceholder.typicode.com/posts',
      'https://jsonplaceholder.typicode.com/users');
    this.setState({
      posts,
    });
  }

  filterName (event) {
    this.setState({value: event.target.value});
  }

  render() {
    const { value } = this.state;
    return (
      <>
        <input
          type={"text"}
          value={value}
          onChange={this.filterName}
          hidden={this.state.posts === null}
        ></input>
        <button hidden={this.state.isLoaded} onClick={() => this.loads()}>
          Load
        </button>
        <p hidden={this.state.isLoaded}>not loaded</p>
        <Content list={this.state} />
      </>
    );
  }
}

export default List;
