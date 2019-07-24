import React from 'react';
import './styles/App.css';
import getData from './getData';
import PostList from './PostList';
import FilterPosts from './FilterPosts';

class App extends React.Component {
  state = {
    posts: [],
    visiblePosts: [],
    filterStr: '',
    isLoaded: false,
    isLoading: false,
    disabled: false,
  };

  onHandlerClick = async() => {
    this.setState({
      isLoading: true,
      disabled: true,
    });
    setTimeout(() => {
      this.loadData();
    }, 2000);
  };

  loadData = async() => {
    const posts = await getData();

    this.setState({
      isLoaded: true,
      posts,
      visiblePosts: posts,
    });
  };

  onHandlerChange = (event) => {
    const filterStr = event.target.value.toLowerCase();
    const { posts } = this.state;
    const filteredPosts = posts.filter(post => (
      post.body.toLowerCase().includes(filterStr)
      || post.title.toLowerCase().includes(filterStr)
    ));

    this.setState({
      filterStr,
      visiblePosts: filteredPosts,
    });
  };

  clearFilter = () => {
    this.setState(prevState => ({
      filterStr: '',
      visiblePosts: prevState.posts,
    }));
  };

  render() {
    const {
      isLoaded,
      isLoading,
      filterStr,
      visiblePosts,
      disabled,
    } = this.state;

    return (
      <main className="App">
        {
          (!isLoaded) ? (
            <button
              className="button--load"
              onClick={this.onHandlerClick}
              type="button"
              disabled={disabled}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          ) : (
            <>
              <div className="post-list">
                <FilterPosts
                  filterStr={filterStr}
                  onHandlerChange={this.onHandlerChange}
                  clearFilter={this.clearFilter}
                />
                <PostList posts={visiblePosts} />
              </div>
            </>
          )
        }
      </main>
    );
  }
}

export default App;
