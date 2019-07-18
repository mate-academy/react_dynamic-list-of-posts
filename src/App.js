import React from 'react';
import './App.css';

import getData from './api/getData';
import PostList from './components/PostList';

class App extends React.Component {
  state = {
    posts: [],
    visiblePosts: [],
    isLoaded: false,
    isLoading: false,
  }

  handleClick = async() => {
    const posts = await getData();

    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
        visiblePosts: posts,
        posts,
      });
    }, 2000);
  };

  handleFilter = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      visiblePosts: prevState.posts.filter(
        post => ((
          post.title
            .toLowerCase()
            .includes(value
              .toLowerCase()
              .trim())
        ) || (
          post.body
            .toLowerCase()
            .includes(value
              .toLowerCase()
              .trim())
        ))
      ),
    }));
  }

  render() {
    const {
      visiblePosts,
      isLoaded,
      isLoading,
    } = this.state;

    return (
      <div className="App">
        { isLoaded ? (
          <>
            <h1>Dynamic list of posts</h1>

            <div className="filter-wrapper">
              <label htmlFor="filter-input">
                Filter by title or text:
                <input
                  type="text"
                  id="filter-input"
                  className="filter-input"
                  onChange={this.handleFilter}
                />
              </label>
            </div>

            <PostList
              posts={visiblePosts}
            />
          </>
        ) : (
          <button type="button" onClick={this.handleClick} className="load-btn">
            {isLoading ? 'Loading...' : 'Load' }
          </button>
        )}
      </div>
    );
  }
}

export default App;
