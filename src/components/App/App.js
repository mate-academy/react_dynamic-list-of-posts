import React from 'react';
import './App.css';

import {
  usersLink, commentsLink, postsLink, loadData,
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
    await this.preparePosts();
    this.setState(prevState => ({ isLoaded: !prevState.isLoaded }));
  };

  async preparePosts() {
    const users = await loadData(usersLink);
    const posts = await loadData(postsLink);
    const comments = await loadData(commentsLink);

    const preparedPosts = posts.map(post => ({
      postItem: post,
      postAuthor: users.find(user => user.id === post.userId),
      postComments: comments.filter(comment => comment.postId === post.id),
    }));

    this.setState({
      posts: preparedPosts,
    });
  }

  render() {
    return (
      <main className="main">
        {
          !this.state.isLoaded && (
            <button onClick={() => this.load()} className="load-btn">
              {this.state.btnText}
            </button>
          )
        }
        {
          this.state.isLoaded && <ListOfPosts posts={this.state.posts} />
        }
      </main>
    );
  }
}

export default App;
