import React from 'react';

import './App.css';
import PostList from './components/PostList/PostList';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

class App extends React.Component {
  state = {
    posts: [],
    users: [],
    comments: [],
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
      .then(([res1, res2, res3]) => (
        Promise.all([res1.json(), res2.json(), res3.json()])))
      .then(([data1, data2, data3]) => this.setState({
        posts: data1,
        users: data2,
        comments: data3,
        isLoading: false,
        isShowButton: false,
      }))
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  }

  render() {
    const {
      posts, users, comments, isLoading, error, isShowButton,
    } = this.state;

    const postWithUserAndComments = posts.map(post => ({
      ...post,
      user: users.find(user => post.userId === user.id),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    if (isLoading) {
      return (
        <div className="App">
          <button type="button" disabled>
            Loading...
          </button>
        </div>
      );
    }

    if (error) {
      return <div>{`Error: ${error.message} data`}</div>;
    }

    return (
      <div className="App">
        {isShowButton && (
          <button
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
