import React from 'react';
import './App.css';

import { getData } from './api/getData';
import PostList from './components/PostList';

class App extends React.Component {
  state = {
    posts: [],
    visiblePosts: [],
    isLoaded: false,
    isLoading: false,
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async() => {
    const posts = await getData();

    this.setState({
      visiblePosts: posts,
      posts,
    });
  };

  handleClick = () => {
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  handleFilter = (event) => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      visiblePosts: prevState.posts.filter(
        post => (
          post[name]
            .toLowerCase()
            .includes(value
              .toLowerCase()
              .trim())
        )
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

            <div className="filter-inputs">
              <label htmlFor="name-input">
                Filter by title:
                <input
                  type="text"
                  id="title-input"
                  className="filter-input"
                  name="title"
                  onChange={this.handleFilter}
                />
              </label>
              <label htmlFor="text-input">
                Filter by text:
                <input
                  type="text"
                  id="text-input"
                  className="filter-input"
                  name="body"
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
