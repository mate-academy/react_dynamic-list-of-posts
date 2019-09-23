import React from 'react';
import PostList from './components/PostList/PostList';

import './App.css';

class App extends React.Component {
  state = {
    dataFromServer: [],
    isLoading: false,
  }

  getList = () => {
    this.setState({
      isLoading: true,
    });
    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/comments'),
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch(' https://jsonplaceholder.typicode.com/posts'),
    ])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([comments, users, posts]) => this.setState({
        dataFromServer: posts.map(post => ({
          ...post,
          comments: comments.filter(comment => comment.postId === post.id),
          user: users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {})[post.userId],
        })),
        isLoading: false,
      }));
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="app">
          <p>Loading ...</p>
        </div>
      );
    }

    if (this.state.dataFromServer.length === 0) {
      return (
        <div className="app">
          <button type="button" onClick={this.getList}> Show posts </button>
        </div>
      );
    }

    return (
      <div className="app">
        <h1>Static list of posts</h1>
        <PostList fullPosts={this.state.dataFromServer} />
      </div>
    );
  }
}

export default App;
