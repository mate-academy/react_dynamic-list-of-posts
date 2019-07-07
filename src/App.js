/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import './App.css';

import NotLoaded from './components/NotLoaded/NotLoaded';
import PostList from './components/PostList/PostList';

import fetchData from './components/fetchData';

class App extends Component {
  state = {
    postList: [],
    sortedPostList: [],
    isLoaded: false,
    isLoading: false,
    sortField: null,
  };

  getData = async() => {
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
    return (
      <main className="container">
        <h1 className="container__header">List of posts</h1>
        {
          this.state.isLoaded
            ? (
              <PostList
                posts={this.state.sortedPostList}
                sortData={this.sortData}
              />
            )
            : (
              <NotLoaded
                isLoading={this.state.isLoading}
                fetchData={this.getData}
              />
            )
        }
      </main>
    );
  }
}

export default App;
