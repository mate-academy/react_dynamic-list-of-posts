import React from 'react';

import './App.css';
import PostList from './components/PostList/PostList';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

class App extends React.Component {
  state = {
    postWithUserAndComments: [],
    isLoading: false,
    error: null,
    isShowButton: true,
  }

  loadTodos = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(POSTS_URL),
      fetch(USERS_URL),
      fetch(COMMENTS_URL),
    ])
      .then(([postsRes, usersRes, commentsRes]) => (
        Promise.all([postsRes.json(), usersRes.json(), commentsRes.json()])))
      .then(([postsData, usersData, commentsData]) => this.setState({
        isLoading: false,
        isShowButton: false,
        postWithUserAndComments: postsData.map(post => ({
          ...post,
          user: usersData.find(user => post.userId === user.id),
          comments: commentsData.filter(comment => comment.postId === post.id),
        })),
      }))
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: err,
        });
      });
  }

  render() {
    const {
      isLoading, error, isShowButton, postWithUserAndComments,
    } = this.state;

    if (isLoading) {
      return (
        <div className="App">
          <h1>Dynamic list of posts</h1>
          <button
            className="button"
            type="button"
            disabled
          >
            Loading...
          </button>
        </div>
      );
    }

    if (error) {
      return (
        <div className="App">
          <div>{`Error: ${error.message} data`}</div>
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        {isShowButton && (
          <button
            className="button"
            type="button"
            onClick={this.loadTodos}
          >
            Load
          </button>
        )}
        <PostList posts={postWithUserAndComments} />
      </div>
    );
  }
}

export default App;
