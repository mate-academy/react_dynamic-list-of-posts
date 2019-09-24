import React from 'react';
import PostList from './components/PostList/PostList';
import './App.css';

const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json());

const getPosts = () => fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json());

const getComments = () => fetch('https://jsonplaceholder.typicode.com/comments')
  .then(response => response.json());

const getPostsWithComments = (postsList, commentsList, userList) => (
  postsList
    .map(post => ({
      ...post,
      comments: commentsList.filter(comment => comment.postId === post.id),
      user: userList.find(item => item.id === post.userId),
    }))
);

class App extends React.Component {
  state = {
    posts: [],
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

  render() {
    const {
      posts,
      users,
      comments,
      isLoading,
      hasError,
      isLoaded,
    } = this.state;

    const preparedPosts = getPostsWithComments(posts, users, comments);

    return (
      <div className="main">
        <h1>Dynamic list of posts</h1>
        <p>
          <span>posts: </span>
          {posts.length}
        </p>
        <p>
          <span>users: </span>
          {users.length}
        </p>
        <p>
          <span>comments: </span>
          {comments.length}
        </p>
        {!posts.length
        && !users.length
        && !comments.length
        && !isLoading
        && !hasError && (
          <button
            onClick={this.getData}
            type="button"
          >
           Loaded
          </button>
        )}
        {isLoading && (
          <div>
            <span>Loading...</span>
          </div>
        )}
        {hasError && (
          <>
            <h3>Error loading:(</h3>
            <button
              type="button"
              onClick={this.getData}
            >
              Try again
            </button>
          </>
        )}
        {isLoaded && (
          <>
            <PostList posts={preparedPosts} />
          </>
        )}
      </div>
    );
  }
}

export default App;
