import React from 'react';
import './App.css';
import propTypes from './propTypes';
import { getPosts, getUsers, getComments } from './api/api';
import PostsList from './components/PostList';

class App extends React.Component {
  state = {
    posts: [],
    users: [],
    comments: [],
    isLoaded: false,
    isLoading: false,
    query: '',
  };

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    this.loadData()
      .then(() => {
        this.setState({
          isLoaded: true,
          isLoading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  search = (event) => {
    event.preventDefault();
    this.setState(previousState => ({
      posts: previousState.posts
        .filter(post => post.body.includes(previousState.query)),
    }));
  };

  async loadData() {
    await getUsers()
      .then((userData) => {
        this.setState(
          { users: userData },
        );
      });
    await getComments()
      .then((commentsData) => {
        this.setState(
          { comments: commentsData },
        );
      });
    await getPosts()
      .then((postsData) => {
        const result = postsData.map(post => ({
          ...post,
          user: this.state.users.find(user => user.id === post.userId),
          commentsList: this.state.comments
            .filter(comment => comment.postId === post.userId),
        }));

        this.setState({
          posts: result,
        });
      });
  }

  render() {
    return (
      <main>
        {this.state.isLoaded ? (
          <div className="App">
            <form onSubmit={this.search}>
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.query}
              />
              <button type="submit">find</button>
            </form>
            <h1>Dynamic list of Posts</h1>
            <PostsList posts={this.state.posts} />
          </div>
        ) : (
          <button
            className="btn"
            type="submit"
            disabled={this.state.isLoading}
            onClick={this.handleClick}
          >
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </main>
    );
  }
}
propTypes.state = propTypes;

export default App;
