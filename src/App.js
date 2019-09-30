import React from 'react';
import PostList from './components/PostList/PostList';
import './App.css';

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_API_URL = 'https://jsonplaceholder.typicode.com/comments';

const getData = url => fetch(url).then(response => response.json());

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

    Promise.all([
      getData(POSTS_API_URL),
      getData(USERS_API_URL),
      getData(COMMENTS_API_URL),
    ])
      .then(([posts, users, comments]) => {
        this.setState({
          posts: getPostsWithComments(posts, users, comments),
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

  render() {
    const {
      posts, users, comments, isLoading, hasError, isLoaded,
    } = this.state;

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
            <PostList posts={posts} />
          </>
        )}
      </div>
    );
  }
}

export default App;
