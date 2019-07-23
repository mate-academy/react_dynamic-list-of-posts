import React from 'react';
import './styles/App.css';
import { getPosts, getUsers, getComments } from './getData';
import PostList from './PostList';
import FilterPosts from './FilterPosts';

const getData = async() => {
  const posts = await getPosts();
  const users = await getUsers();
  const comments = await getComments();

  return [...posts].map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    commentsList: comments.filter(comment => comment.postId === post.id),
  }));
};

class App extends React.Component {
  state = {
    posts: [],
    visiblePosts: [],
    filterStr: '',
    isLoaded: false,
    isLoading: false,
  };

  onHandlerClick = async() => {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoaded: true,
      });
    }, 2000);
    this.loadData();
  };

  loadData = async() => {
    const posts = await getData();

    this.state.posts = posts;
    this.setState({
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
    const { posts } = this.state;

    this.setState({
      filterStr: '',
      visiblePosts: posts,
    });
  };

  render() {
    const {
      isLoaded,
      isLoading,
      filterStr,
      visiblePosts,
    } = this.state;

    return (
      <main className="App">
        {
          (!isLoaded) ? (
            <button
              className="button--load"
              onClick={this.onHandlerClick}
              type="button"
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
