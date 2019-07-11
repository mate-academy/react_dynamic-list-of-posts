import React from 'react';
import './App.css';

import {
  loadUsers, loadComments, loadPosts,
} from '../../api/loadData';

import ListOfPosts from '../ListOfPosts/ListOfPosts';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoaded: false,
      btnText: 'Load',
    };
  }

  load = async() => {
    this.setState({ btnText: 'Loading' });
    const users = await loadUsers();
    const posts = await loadPosts();
    const comments = await loadComments();

    const preparedPosts = posts.map(post => ({
      postItem: post,
      postAuthor: users.find(user => user.id === post.userId),
      postComments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      posts: preparedPosts,
    });

    this.setState(prevState => ({
      isLoaded: !prevState.isLoaded,
      posts: preparedPosts,
    }));
  };

  render() {
    return (
      <main className="main">
        {
          !this.state.isLoaded
            ? (
              <button onClick={() => this.load()} className="load-btn">
                {this.state.btnText}
              </button>
            ) : (
              <ListOfPosts posts={this.state.posts} />
            )
        }
      </main>
    );
  }
}

export default App;
