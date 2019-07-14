import React from 'react';
import './App.css';
import PostList from './PostList';
import { getPosts, getUsers, getComments } from './serverLoad';

class App extends React.Component {
  state = {
    listOfPosts: [],
    isLoaded: false,
    isLoading: false,
    posts: [],
  };

  handleClick = async() => {
    const comments = await getComments();
    const posts = await getPosts();
    const users = await getUsers();
    const userWhitpostAndComments = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      posts: userWhitpostAndComments,
      listOfPosts: userWhitpostAndComments,
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 10);
  };

  handleSearch = (someType) => {
    const search = someType.target.value;

    this.setState(prevState => ({
      listOfPosts: prevState.posts.filter(
        world => [world.title, world.body]
          .join('')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    }));
  }

  render() {
    return (
      <div>
        { this.state.isLoaded ? (
          <div className="App">
            <input
              type="text"
              className="search_input"
              placeholder="Search for"
              onChange={this.handleSearch}
            />
            <PostList postsCurrent={this.state.listOfPosts} />
          </div>
        ) : (
          <button type="button" onClick={this.handleClick}>
            {this.state.isLoading ? 'Loading...' : 'Load'}
          </button>
        )}
      </div>
    );
  }
}

export default App;
