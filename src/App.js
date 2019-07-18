import React from 'react';
import './App.css';

import PostList from './components/PostList';

import { getPosts, getUsers, getComments } from './api/getData';

const getArrFromPost = (name, value) => {
  if (name) {
    if (value.split(' ').length > 1) {
      return name.toLowerCase().startsWith(value.toLowerCase());
    }

    const arrFromPost = name.toLowerCase().split(' ');

    return arrFromPost.some(item => item.startsWith(value.toLowerCase()));
  }

  return false;
};

class App extends React.Component {
  state = {
    posts: [],
    visiblePosts: [],
    isLoaded: false,
    isLoading: false,
  }

  handleClick = async() => {
    this.setState({
      isLoading: true,
    });

    const posts = await getPosts();
    const users = await getUsers();
    const comments = await getComments();
    const listPostWithUser = posts.map(post => ({
      ...post,
      user: users.find(user => post.userId === user.id),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    setTimeout(() => {
      this.setState({
        posts: listPostWithUser,
        visiblePosts: listPostWithUser,
        isLoaded: true,
        isLoading: false,
      });
    }, 0);
  };

  getFilterPosts = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      visiblePosts: prevState.posts.filter((post) => {
        const byTitle = getArrFromPost(post.title, value);
        const byBodyPost = getArrFromPost(post.body, value);

        return byTitle || byBodyPost;
      }),
    }));
  }

  render() {
    const { visiblePosts, isLoaded, isLoading } = this.state;

    return (
      <div className="App">
        <h1 className="main-headline">Dynamic list of posts</h1>
        <main>
          {isLoaded ? (
            <div>
              <PostList
                posts={visiblePosts}
                getFilterPosts={this.getFilterPosts}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={this.handleClick}
              className="btn btn-primary btn-lg active"
            >
              {isLoading ? 'Loading...' : 'Load'}
            </button>
          )}
        </main>
      </div>
    );
  }
}

export default App;
