import React from 'react';
// import { connect } from 'react-redux';
import preparedData from './api/getData';
import PostList from './components/PostList';
import { Spinner } from "react-bootstrap";


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
  }

  async componentDidMount() {
    const postsWithUsers = await data();

    this.setState({
      visiblePosts: postsWithUsers,
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





  }

  render() {
    return (
      <>
        <h1>Dynamic list of posts</h1>
        {!this.state.isloaded ? (
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={this.handleClick}
          >
            {!this.state.isLoading ? (
              'Click for load posts'
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
          </button>
        ) : (
          <PostList postsList={this.state.visiblePosts} />
        )}
      </>
    );
  }
}

export default App;
