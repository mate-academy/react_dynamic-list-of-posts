import React from 'react';
import './App.css';
import PostList from './PostList';

const getPosts = async() => {
const response = await fetch('https://jsonplaceholder.typicode.com/posts');
const currentPost = await response.json();

return currentPost;
};

const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const currentUsers = await response.json();

  return currentUsers;
};

const getComments = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const currentComment = await response.json();

  return currentComment;
};

class App extends React.Component {
  state = {
    listOfPost: [],
    isLoaded: false,
    isLoading: false,
  };

   handleClick = async() => {
    const comments= await getComments();
    const posts = await getPosts();
    const users = await getUsers();
    const userWhitpostAndComments = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      listOfPost: userWhitpostAndComments,
      isLoading: true,
    });

     setTimeout(() => {
      this.setState({
        isLoaded: true,
        isLoading: false,
      });
    }, 1000);
  };

   render() {
    return (
      <div>
         { this.state.isLoaded ? (
          <div className="App">
            <PostList postsCurrent={this.state.listOfPost} />
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
