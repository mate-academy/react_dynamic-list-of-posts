import React from 'react';
import './App.css';
import PostsList from './components/PostsList/PostsList';

class App extends React.Component {
  state = {
    posts: [],
    filteredPosts: [],
    users: [],
    comments: [],
    isLoaded: false,
    hasError: false,
    isButtonShow: true,
    isInputShow: false,
  }

  handleGetData = () => {
    this.setState({
      isButtonShow: false,
      isLoaded: true,
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users'),
      fetch('https://jsonplaceholder.typicode.com/posts'),
      fetch('https://jsonplaceholder.typicode.com/comments'),
    ])
      .then(([res1, res2, res3]) => Promise
        .all([res1.json(), res2.json(), res3.json()]))
      .then(([users, posts, comments]) => this.setState({
        isLoaded: false,
        isInputShow: true,
        users,
        posts,
        filteredPosts: posts,
        comments,
      }))
      .catch(() => {
        this.setState({
          hasError: true,
        });
      });
  }

  getPostWithProps = (postsArr, usersArr, commentsArr) => (
    postsArr.map(post => ({
      ...post,
      user: usersArr.find(user => user.id === post.userId),
      comments: commentsArr.filter(comment => post.id === comment.postId),
    }))
  );

  handleSearch = (event) => {
    const val = event.target.value;
    const { posts } = this.state;

    this.setState({
      filteredPosts: [...posts].filter(post => (
        post.title.toLowerCase().includes(val.toLowerCase())
        || post.body.toLowerCase().includes(val.toLowerCase())
      )),
    });
  }

  render() {
    const {
      filteredPosts,
      users,
      comments,
      isLoaded,
      hasError,
      isButtonShow,
      isInputShow,
      searchValue,
    } = this.state;

    const preparedPost = this.getPostWithProps(
      filteredPosts,
      users,
      comments
    );

    if (hasError) {
      return (
        <div>
          Error: omg wtf something wrong go away
        </div>
      );
    }

    if (isLoaded) {
      return (
        <div className="loading">Loading...</div>
      );
    }

    return (
      <div className="App">
        <h1>Static list of posts</h1>
        <div className="wrapp">
          {isButtonShow
            && (
              <button
                className="btnLoad"
                type="button"
                onClick={this.handleGetData}
              >
                get Data
              </button>
            )
          }
          {isInputShow
            && (
              <input
                className="search-input"
                placeholder="search post"
                onChange={this.handleSearch}
                value={searchValue}
                type="text"
              />
            )
          }
          <PostsList posts={preparedPost} />
        </div>
      </div>
    );
  }
}

export default App;
