import React from 'react';

import PostList from './components/PostList/PostList';
import './App.css';

const API_POSTS = 'https://jsonplaceholder.typicode.com/posts';
const API_USER = 'https://jsonplaceholder.typicode.com/users';
const API_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

class App extends React.Component {
  state = {
    users: [],
    posts: [],
    comments: [],
    isLoading: false,
  };

  getPostUsers = (postList, usersList) => postList.map(post => (
    {
      ...post,
      user: usersList.find(user => (user.id === post.userId)),
    }
  ));

  loadData = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(API_POSTS),
      fetch(API_USER),
      fetch(API_COMMENTS),
    ])
      .then(([posts, users, comments]) => Promise.all([
        posts.json(),
        users.json(),
        comments.json(),
      ]))
      .then(([dataPosts, dataUsers, dataComments]) => this.setState({
        users: [...dataUsers],
        comments: [...dataComments],
        posts: [...dataPosts],
        isLoading: false,
      }));
  };

  render() {
    const {
      users, comments, posts, isLoading,
    } = this.state;

    const usersPosts = this.getPostUsers(posts, users);

    if (isLoading) {
      return <p className="loading">Loading...</p>;
    }

    if (usersPosts.length === 0) {
      return (
        <div className="container">
          <h1 className="static-list__title">Dynamic List of Posts</h1>
          <p className="no-todos-list">No todos yet</p>
          <button
            type="button"
            onClick={this.loadData}
            className="info-load"
          >
            Load
          </button>
        </div>
      );
    }

    return <PostList posts={usersPosts} commentList={comments} />;
  }
}

export default App;
