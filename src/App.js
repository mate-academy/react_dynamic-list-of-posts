import React from 'react';
import './App.css';

import { getData } from './api/data';
import { PostList } from './components/PostList/PostList';

function getPostsWithUsers(posts, users, comments) {
  return posts.map(post => ({
    ...post,
    user: users.find(item => item.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }));
}

const urlUsers = 'https://jsonplaceholder.typicode.com/users';
const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
const urlComments = 'https://jsonplaceholder.typicode.com/comments';

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

    Promise.all([getData(urlPosts), getData(urlUsers), getData(urlComments)])
      .then(([posts, users, comments]) => {
        this.setState({
          originPosts: getPostsWithUsers(posts, users, comments),
          posts: getPostsWithUsers(posts, users, comments),
          isLoaded: true,
          users,
          comments,
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

  searchPost = (event) => {
    const { originPosts } = this.state;

    this.setState({
      posts: [...originPosts].filter(
        post => post.title.toLowerCase().includes(event.target.value.toLowerCase())
          || post.body.toLowerCase().includes(event.target.value.toLowerCase())
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
              onChange={this.searchPost}
            />
            <PostList posts={posts} />
          </>
        )}
      </div>
    );
  }
}

export default App;
