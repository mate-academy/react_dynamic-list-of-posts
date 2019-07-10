// /* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import './App.css';

import LoadButton from './components/LoadButton/LoadButton';
import PostList from './components/PostList/PostList';

import fetchData from './components/fetchData';

class App extends Component {
  state = {
    postList: [],
    sortedPostList: [],
    isLoaded: false,
    isLoading: false,
  };

  getTodos = async() => {
    this.setState({ isLoading: true });
    const data = await fetchData();
    this.setState({
      postList: data,
      sortedPostList: data,
      isLoading: false,
      isLoaded: true,
    });
  }

  sortData = (event) => {
    const { value } = event.target;
    this.setState(state => ({
      sortedPostList: state.postList
        .filter(post => post.body.includes(String(value))),
    }));
  }

  render() {
    const { sortedPostList, isLoading } = this.state;
    return (
      <main className="container">
        <h1 className="container__header">List of posts</h1>
        {
          this.state.isLoaded
            ? (
              <PostList
                posts={sortedPostList}
                sortData={this.sortData}
              />
            ) : (
              <LoadButton
                isLoading={isLoading}
                getTodos={this.getTodos}
              />
            )
        }
      </main>
    );
  }
}

export default App;
