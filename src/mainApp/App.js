import React from 'react';

import MDSpinner from 'react-md-spinner';
import {
  usersFromServer,
  postsFromServer,
  commentsFromServer,
} from '../helper/Helper';
import Filter from '../filter/Filter';
import PostList from '../posts/PostList';
import './App.css';

const prepareData = (posts, users, comments) => {
  return posts.map(currentPost => ({
    ...currentPost,
    user: users.find(user => user.id === currentPost.userId),
    comments: comments.filter(comment => comment.postId === currentPost.id),
  }));
};

class App extends React.Component {
  state = {
    posts: [],
    btnVisible: true,
    btnText: 'Load',
    visible: false,
  };

  async getPosts() {
    const posts = await postsFromServer();
    const users = await usersFromServer();
    const comments = await commentsFromServer();

    this.setState({
      posts: prepareData(posts, users, comments),
      btnVisible: false,
    });
  }

  findPostByText = (text) => {
    const findedPosts = this.state.posts.filter(post => post.title.includes(text) || post.body.includes(text));
    console.log('into findPostByText, text is ' + text);
    console.log(findedPosts);

    this.setState({ posts : findedPosts });
  }

  render() {
    return (
      <div className="main-div">
        {this.state.btnVisible && (
          <button
            type="button"
            className="load-button"
            onClick={() => {
              this.setState({ visible: true, btnText: 'Loading...' });
              this.getPosts();
            }}
          >
            {this.state.btnText}
          </button>
        )}

        {this.state.visible && (
          this.state.posts.length > 0 ? (
            <>
              <h1 className="main-title">Dynamic list of posts</h1>
              <Filter onFilter={this.findPostByText} />
              <PostList posts={this.state.posts} />
            </>
          ) : (
            <MDSpinner size={50} />
          )
        )}
      </div>
    );
  }
}

export default App;
