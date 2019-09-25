import React, { Component } from 'react';
import './App.css';
import PostList from './components/PostList/PostList';
import getPostsWithUsers from './getPostsWithUsers';
import getPostWithComments from './getPostWithComments';

const API_URL = 'https://jsonplaceholder.typicode.com/';

const getData = dataName => (
  fetch(`${API_URL}${dataName}`)
    .then(response => response.json())
);

class App extends Component {
  state = {
    postList: [],
    isLoading: false,
    isLoaded: false,
    isError: false,
    buttonText: 'Load',
  }

  loadDataFromServer = () => {
    this.setState({
      buttonText: 'loading...',
      isLoading: true,
    });
    Promise.all([
      getData('comments'),
      getData('posts'),
      getData('users'),
    ])
      .then(([comments, posts, users]) => {
        this.setState({
          postList: getPostWithComments(
            getPostsWithUsers(posts, users), comments
          ),
          isLoaded: true,
          isError: false,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          buttonText: 'try again',
          isError: true,
          isLoading: false,
        });
      });
  }

  render() {
    const {
      postList,
      isLoaded,
      isLoading,
      isError,
      buttonText,
    } = this.state;

    if (!isLoaded) {
      return (
        <div>
          {isError
            ? <p>No Data :( Try again</p>
            : null
          }
          <button
            type="submit"
            disabled={isLoading}
            onClick={this.loadDataFromServer}
          >
            {buttonText}
          </button>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="header">
          <h1>Static list of posts</h1>
        </header>
        <PostList posts={postList} />
      </div>
    );
  }
}

export default App;
