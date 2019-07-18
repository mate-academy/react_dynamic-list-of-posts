import React from 'react';
import './App.css';
import propTypes from './propTypes';
import { getPosts, getUsers, getComments } from './api/api';
import PostsList from './components/PostList';

class App extends React.Component {
  state = {
    posts: [],
    // sortedPostsList: [],
    users: [],
    comments: [],
    isLoaded: false,
    isLoading: false,
    sortType: 'id',
    sortDirection: 1, // 1 = 'asc', // 2 = desc
  };

  urlParams =
    `?_sort=${this.state.sortType}
    &_order=${this.state.sortDirection === 1 ? 'asc' : 'desc'}`;

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    this.loadData()
      .then(() => {
        this.sortData(this.state.sortType);
        this.setState({
          isLoaded: true,
          isLoading: false,
        });
      });
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
    await getPosts(this.urlParams)
      .then((postsData) => {
        this.setState(previousState => (
          {
            posts: postsData.map(post => ({
              ...post,
              user: previousState.users.find(user => user.id === post.userId),
              commentsList: previousState.comments
                .filter(comment => comment.postId === post.userId),
            })),
          }
        ));
      });
  }

  render() {
    return (
      <main>
        {this.state.isLoaded ? (
          <div className="App">
            <form>
              <input
                type="text"
                // onChange={handleChange}
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
