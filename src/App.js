import React from 'react';
import './App.css';
import PostList from './components/PostList';

import { getUsers, getPosts, getComments } from './api/data';

class App extends React.Component {
  state = {
    posts: [],
    isLoading: false,
    isLoaded: false,
  };

  handleClick = async() => {
    const posts = await getPosts();
    const users = await getUsers();
    const comments = await getComments();
    const postsPrepared = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        posts: postsPrepared,
        isLoading: false,
        isLoaded: true,
      });
    }, 1000);
  };

  render() {
    const { isLoaded, isLoading, posts } = this.state;
    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>
        {isLoaded
          ? (
            <PostList
              posts={posts}
            />
          )
          : (
            <button
              type="button"
              onClick={this.handleClick}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          )
        }
      </div>
    );
  }
}

export default App;
