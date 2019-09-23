import React from 'react';
import './App.css';
import PostList from './components/PostList/PostList';
import { getComments } from './api/getComments';
import { getPosts } from './api/getPosts';
import { getUsers } from './api/getUsers';

class App extends React.Component {
  state = {
    posts: [],
    copyPosts: [],
    users: [],
    comments: [],
    isLoading: false,
  };

  dataLoading = () => {
    this.setState({
      isLoading: true,
    });

    getComments().then((comments) => {
      this.setState({ comments });
    });
    getUsers().then((users) => {
      this.setState({ users });
    });
    getPosts().then((posts) => {
      this.setState({ copyPosts: posts, posts, isLoading: false });
    });
  };

  searchPost = (event) => {
    this.setState(prevState => ({
      posts: prevState.copyPosts.filter(
        post => post.title.toLowerCase().includes(event.target.value.toLowerCase())
          || post.body.toLowerCase().includes(event.target.value.toLowerCase())
      ),
    }));
  };

  render() {
    const preparedPosts = UserToPosts(this.state.posts, this.state.users);

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>

        <p>
          <span>posts: </span>
          {this.state.posts.length}
        </p>

        <p>
          <span>comments: </span>
          {this.state.comments.length}
        </p>

        <p>
          <span>Users: </span>
          {this.state.users.length}
        </p>
        {this.state.copyPosts.length === 0 ? (
          <button
            type="button"
            onClick={this.dataLoading}
            className="btn btn-info"
          >
            {this.state.isLoading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              <span>Load</span>
            )}
            {' '}
          </button>
        ) : (
          <>
            <input
              type="text"
              name="text-area"
              placeholder="Write text you find"
              className="form-control"
              onChange={this.searchPost}
            />
            <PostList posts={preparedPosts} comments={this.state.comments} />
          </>
        )}
      </div>
    );
  }
}

function UserToPosts(listPost, listUser) {
  return listPost.map(post => ({
    ...post,
    user: listUser.find(user => user.id === post.userId),
  }));
}

export default App;
