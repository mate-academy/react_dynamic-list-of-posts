import React from 'react';
import './App.css';

import {
  fetchPosts,
  fetchUsers,
  fetchComments
} from './components/api/Fetching';
import PostList from './components/postList/PostList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      postList: [],
    };
  }

  loadData = () => {
    this.setState({
      loading: true,
    });

    Promise.all([fetchPosts(), fetchUsers(), fetchComments()])
      .then(([postsItems, usersItems, commentsItems]) => {
        const postList = postsItems.map(post => ({
          ...post,
          user: usersItems.find(user => user.id === post.userId),
          comments: commentsItems.filter(comment => comment.postId === post.id),
        }));

        this.setState({
          postList,
          loading: false,
        });
      });
  };

  render() {
    const { postList, loading } = this.state;

    if (!postList.length) {
      if (loading) {
        return (
          <button
            type="button"
            className="ui basic loading button"
            onClick={this.loadData}
          />
        );
      } else {
        return (
          <button
            type="button"
            className="ui button"
            onClick={this.loadData}
          >
            Load Posts
          </button>
        );
      }
    }

    return (
      <div className="container">
        <PostList posts={postList} />
      </div>
    );
  }
}

export default App;
