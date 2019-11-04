import React from 'react';
import './App.css';
import PostList from './components/PostsList';
import { getPosts, getUsers, getComments } from './api/api';

class App extends React.Component {
  state = {
    listOfPosts: [],
    isLoaded: false,
    isLoading: false,
    posts: [],
  };

  handleClick = async() => {
    const comments = await getComments();
    const posts = await getPosts();
    const users = await getUsers();
    const usersPosts = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      posts: usersPosts,
      listOfPosts: usersPosts,
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 10);
  };

  handleSearch = (someType) => {
    const search = someType.target.value;

    this.setState(prevState => ({
      listOfPosts: prevState.posts.filter(
        world => [world.title, world.body]
          .join('')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    }));
  };

  render() {
    return (
      <div>
        { this.state.isLoaded ? (
          <>
            <div className="search__container">
              <input
                type="text"
                className="search__input"
                placeholder="Search"
                onChange={this.handleSearch}
              />
            </div>
            <PostList postsCurrent={this.state.listOfPosts} />
          </>
        ) : (
          <div className="btn-container">
            <button
              className="load-btn"
              type="button"
              onClick={this.handleClick}
            >
              {this.state.isLoading ? 'Loading...' : 'Load'}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
