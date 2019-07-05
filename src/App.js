import React from 'react';
import './App.css';
import PostList from './components/PostList';
import { getPosts, getUsers, getComments } from './api/getData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      disable: false,
      posts: [],
      filteredPosts: [],
    };
  }

  onLoad = () => {
    this.setState(prev => ({
      disable: !prev.disable,
    }));

    const delayPromise = new Promise((resolve) => {
      setTimeout(resolve, 600);
    });

    const dataPromise = this.loadData();

    delayPromise
      .then(() => dataPromise)
      .then(() => {
        this.setState({ isLoaded: true });
      });
  };

  filterPosts = (event) => {
    const currentValue = event.target.value.toUpperCase();
    const postsWithFilter = this.state.posts
      .filter(post => post.title.toUpperCase().includes(currentValue));

    this.setState({
      filteredPosts: postsWithFilter,
    });
  };

  async loadData() {
    const [posts, users, comments] = await Promise.all(
      [getPosts(), getUsers(), getComments()]
    );
    const postWithAllData = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));
    this.setState({
      posts: postWithAllData,
      filteredPosts: postWithAllData,
    });
  }

  render() {
    return (
      <div className="box-of-posts">
        <h1 className="title"> Dynamic list of posts </h1>
        {this.state.isLoaded ? (
          <PostList
            posts={this.state.filteredPosts}
            filter={this.filterPosts}
          />
        )
          : (
            <button
              type="button"
              className="btn"
              onClick={this.onLoad}
            >
              {this.state.disable ? 'Loading...' : 'Load'}
            </button>
          )
        }
      </div>
    );
  }
}

export default App;
