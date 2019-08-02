import React from 'react';
import './App.css';
import Post from './Post';
import { getUsers, getPosts, getComments } from './GetInfo';

class App extends React.Component {
  state = {
    users: [],
    posts: [],
    visiblePosts: [],
    comments: [],
    inputText: '',
    isLoaded: false,
    isLoading: false,
  }

  loadData = async() => {
    this.setState({
      isLoading: true,
    });

    const usersData = await getUsers();
    const postsData = await getPosts();
    const commentsData = await getComments();

    this.setState({
      users: usersData,
      posts: postsData,
      visiblePosts: postsData,
      comments: commentsData,
      isLoaded: true,
      isLoading: false,
    });
  }

  checkPostInfo = (info, inputValue) => info
    && info.toLowerCase().includes(inputValue.toLowerCase());

  inputFilter = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      inputText: value,
      visiblePosts: prevState.posts.filter((post) => {
        const filterFields = post.title + post.body;

        return this.checkPostInfo(filterFields, value);
      }),
    }));
  }

  render() {
    const {
      users, visiblePosts, comments, isLoaded, isLoading, inputText,
    } = this.state;

    const posts = visiblePosts.map(
      post => (
        <Post
          key={post.id}
          post={post}
          users={users}
          comments={comments}
        />
      )
    );

    return (
      <div className="App">
        <h1 className="title">Dynamic list of posts</h1>
        {(isLoaded)
          ? (
            <>
              <input
                type="text"
                className="inputFilter"
                value={inputText}
                onChange={this.inputFilter}
                placeholder="Find your post"
              />
              {posts}
            </>
          ) : (
            <button
              type="button"
              className="loadButton"
              disabled={isLoading}
              onClick={() => this.loadData()}
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          )
        }
      </div>
    );
  }
}

export default App;
