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

    Promise.all([getComments(), getUsers(), getPosts()]).then(data => this.setState({
      comments: data[0],
      users: data[1],
      posts: data[2],
      copyPosts: data[2],
      isLoading: false,
    }));
  };

  searchPost = ({ target }) => {
    this.setState(prevState => ({
      posts: prevState.copyPosts.filter(
        post => post.title.toLowerCase().includes(target.value.toLowerCase())
          || post.body.toLowerCase().includes(target.value.toLowerCase())
      ),
    }));
  };

  render() {
    const {
      posts, users, comments, copyPosts,
    } = this.state;
    const preparedPosts = UserToPosts(posts, users);

    return (
      <div className="App">
        <h1>Dynamic list of posts</h1>

        <p>
          <span>posts: </span>
          {posts.length}
        </p>

        <p>
          <span>comments: </span>
          {comments.length}
        </p>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        {copyPosts.length === 0 ? (
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
              name="text"
              placeholder="Write text you find"
              className="form-control"
              onChange={this.searchPost}
            />
            <PostList posts={preparedPosts} comments={comments} />
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
