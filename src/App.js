import React from 'react';
// import { connect } from 'react-redux';
import { Spinner } from "react-bootstrap";
import preparedData from './api/getData';
import PostList from './components/PostList';

const data = async() => {
  const response = await preparedData();
  return response;
};

class App extends React.Component {
  state = {
    posts: [],
    visiblePosts: [],
    isloaded: false,
    isLoading: false,
  };

  async componentDidMount() {
    const postsWithUsers = await data();

    this.setState({
      visiblePosts: postsWithUsers,
      posts: postsWithUsers,
    });
  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isloaded: true,
      });
    }, 1200);
  };

  onSearchPosts = (event) => {
    const searchField = event.target.value;

    this.setState(prevState => ({
      visiblePosts: prevState.posts.filter(post => [post.title, post.body]
        .join('')
        .toLowerCase()
        .includes(searchField.toLowerCase())),
    }));
  };

  render() {
    return (
      <div className="text-monospace">
        <h1>Dynamic list of posts</h1>
        {!this.state.isloaded ? (
          <div className="button-box">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={this.handleClick}
            >
              {!this.state.isLoading ? (
                "Click for load posts"
              ) : (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="search-box">
              <label className="search" htmlFor="searchField">
                <input
                  className="form-control"
                  onChange={this.onSearchPosts}
                  type="input"
                  placeholder="search posts"
                  id="searchField"
                />
              </label>
            </div>
            <PostList postsList={this.state.visiblePosts} />
          </>
        )}
      </div>
    );
  }
}

export default App;
