import React from 'react';
import './App.css';

import { getData } from './api/data';
import { PostList } from './components/PostList/PostList';
import { LoadingPage } from './components/LoadingPage/LoadingPage';

function getPostsWithUsers(posts, users, comments) {
  return posts.map(post => ({
    ...post,
    user: users.find(item => item.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }));
}

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_API_URL = 'https://jsonplaceholder.typicode.com/comments';

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

    Promise.all([getData(POSTS_API_URL), getData(USERS_API_URL), getData(COMMENTS_API_URL)])
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
    const { value } = event.target;

    this.setState({
      posts: [...originPosts].filter(
        post => post.title.toLowerCase().includes(value.toLowerCase())
          || post.body.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  render() {
    const {
      posts,
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
        {!isLoaded && !isLoading && (
          <button onClick={this.getData} className="btn btn-outline-dark">
              Load posts
          </button>
        )}
        <LoadingPage isLoading={isLoading} hasError={hasError} getData={this.getData} />
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
