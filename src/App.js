import React from 'react';
import getData from './data/getData';
import './App.css';
import PostList from './components/PostList';

const getDataList = async() => {
  const users = await getData('https://jsonplaceholder.typicode.com/users');
  const posts = await getData('https://jsonplaceholder.typicode.com/posts');
  const comments = await
  getData('https://jsonplaceholder.typicode.com/comments');

  return posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }));
};

class App extends React.Component {
  state = {
    users: [],
    isLoaded: false,
    isLoading: false,
  };

  load = async() => {
    this.setState({
      isLoading: true,
    });
    const result = await getDataList();

    this.setState({
      users: result,
      isLoaded: true,
      isLoading: false,
      posts: result,
    });
  };

  handleSearch = (event) => {
    const search = event.target.value;

    this.setState(prevState => ({
      users: prevState.posts.filter(
        text => [text.title || text.body]
          .join('').toLowerCase().includes(search.toLowerCase())
      ),
    }));
  };

  render() {
    const { users } = this.state;

    if (!this.state.isLoaded) {
      return (
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-success mt-5"
            onClick={this.load}
            disabled={this.state.isLoading}
          >
            {this.state.isLoading ? 'Loading...' : 'Load posts' }
          </button>
        </div>
      );
    }

    return (
      <div className="container">
        <h1
          className="alert alert-primary text-center"
        >
          Dynamic list of posts
        </h1>
        <form className="form-horizontal">
          <input
            placeholder="filter by title and the text..."
            onChange={this.handleSearch}
            className="form-control mb-4"
          />
        </form>
        <PostList currentPosts={users} />
      </div>
    );
  }
}

export default App;
