import React from 'react';
import './App.css';
import PostList from './components/PostList/PostList';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

class App extends React.Component {
  state = {
    posts: [],
    originalPosts: [],
    isLoaded: false,
    isLoading: false,
    hasError: false,
  };

  loadPosts = async () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    try {
      const [
        postsResponse,
        usersResponse,
        commentsResponse,
      ] = await Promise.all([
        fetch(`${BASE_URL}/posts`),
        fetch(`${BASE_URL}/users`),
        fetch(`${BASE_URL}/comments`),
      ]);

      const posts = await postsResponse.json();
      const users = await usersResponse.json();
      const comments = await commentsResponse.json();
      const postsWithComments = posts.map(post => ({
        ...post,
        user: users.find(user => user.id === post.userId),
        comments: comments.filter(comment => comment.postId === post.id),
      }));

      this.setState({
        posts: postsWithComments,
        originalPosts: postsWithComments,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }

    this.setState({
      isLoading: false,
    });
  };

  handleSearchChange = (event) => {
    const { originalPosts } = this.state;
    const { value } = event.target;

    this.setState({
      posts: [...originalPosts].filter(post => (
        post.title.includes(value) || post.body.includes(value)
      )),
    });
  };

  render() {
    const {
      posts,
      isLoaded,
      isLoading,
      hasError,
    } = this.state;

    return (
      <>
        <h1 className="heading">Dynamic list of todos</h1>
        {isLoaded ? (
          <>
            <input
              type="text"
              name="search-input"
              placeholder="Search..."
              className="search"
              onChange={this.handleSearchChange}
            />
            <PostList posts={posts} />
          </>
        ) : (
          <>
            {hasError && (
              <h2 className="error-title">
                Oh, something went wrong! Please, try again
              </h2>
            )}
            <button
              type="button"
              className="load-button"
              onClick={this.loadPosts}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load posts'}
            </button>
          </>
        )}
      </>
    );
  }
}

export default App;
