import React from 'react';
import './App.css';

import { getUsers } from './api/users';
import { getPosts } from './api/posts';
import { getComments } from './api/comments';

import { PostList } from './components/PostList/PostList';

function getPostsWithUsers(posts, users, comments) {
  return posts.map(post => ({
    ...post,
    user: users.find(item => item.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }));
}

class App extends React.Component {
  state = {
    posts: [],
    originPosts: [],
    users: [],
    comments: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  };

  getData = () => {
    this.setState({
      posts: [],
      isLoading: true,
      hasError: false,
    });

    getPosts().then((data) => {
      this.setState({
        posts: data,
        originPosts: data,
      });
    });

    getUsers().then((data) => {
      this.setState({
        users: data,
      });
    });
    getComments().then((data) => {
      this.setState({
        comments: data,
      });
    });

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(() => {
        this.setState({
          isLoaded: true,
        });
      })
      .catch(() => {
        this.setState({
          hasError: true,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  searchFunc = (event) => {
    const { originPosts } = this.state;

    this.setState({
      posts: [...originPosts].filter(
        v => v.title.toLowerCase().includes(event.target.value.toLowerCase())
          || v.body.toLowerCase().includes(event.target.value.toLowerCase())
      ),
    });
  };

  render() {
    const {
      posts,
      users,
      comments,
      isLoading,
      hasError,
      isLoaded,
    } = this.state;
    const preparedPosts = getPostsWithUsers(posts, users, comments);

    return (
      <div className="main">
        <h1>Dynamic list of posts</h1>
        <p>
          <span>posts: </span>
          {posts.length}
        </p>
        {!posts.length
          && !users.length
          && !comments.length
          && !isLoading
          && !hasError && (
          <button onClick={this.getData} className="btn btn-outline-dark">
              Load posts
          </button>
        )}
        {isLoading && (
          <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {hasError && (
          <>
            <h3>Something went wrong:(</h3>
            <button
              type="button"
              onClick={this.getData}
              className="btn btn-outline-dark"
            >
              Try again
            </button>
          </>
        )}
        {isLoaded && (
          <>
            <input
              type="text"
              name="text-area"
              placeholder="Search your post ❤"
              className="form-control form-control-lg"
              onChange={this.searchFunc}
            />
            <PostList posts={preparedPosts} />
          </>
        )}
      </div>
    );
  }
}

export default App;
