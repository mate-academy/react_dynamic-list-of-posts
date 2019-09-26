import React from 'react';
import PostList from './components/PostList/PostList';
import './App.css';

const BASE_URL = 'https://jsonplaceholder.typicode.com//';

class App extends React.Component {
  state = {
    preparedPosts: [],
    isLoading: false,
    isLoaded: false,
    error: null,
  }

  loadData = async() => {
    this.setState({ isLoading: true });

    try {
      const [
        postsResponse,
        usersResponse,
        commentsResponse,
      ] = await Promise.all([
        fetch(`${BASE_URL}posts`),
        fetch(`${BASE_URL}users`),
        fetch(`${BASE_URL}comments`),
      ]);

      const posts = await postsResponse.json();
      const users = await usersResponse.json();
      const comments = await commentsResponse.json();

      const preparedPosts = posts.map(post => ({
        ...post,
        user: users.find(user => post.userId === user.id),
        comments: comments.filter(comment => comment.postId === post.id),
      }));

      console.log(preparedPosts);

      this.setState({
        preparedPosts,
        isLoaded: true,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const {
      preparedPosts,
      isLoading,
      isLoaded,
      error,
    } = this.state;

    if (!isLoaded) {
      return (
        <button
          type="button"
          onClick={this.loadData}
          disabled={isLoading}
        >
          {isLoading ? 'Getting...' : 'Get POSTS'}
        </button>
      );
    }

    // eslint-disable-next-line no-unused-expressions
    error && <p>{error}</p>;

    return (
      <div className="App">
        <h1 className="title">Static list of posts</h1>
        <PostList posts={preparedPosts} />
      </div>
    );
  }
}

export default App;
