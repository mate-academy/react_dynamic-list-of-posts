import React from "react";

import {
  usersFromServer,
  postsFromServer,
  commentsFromServer
} from "../helper/Helper";
import Filter from "../filter/Filter";
import PostList from "../posts/PostList";
import MDSpinner from "react-md-spinner";
import "../mainApp/App.css";

const prepareData = (posts, users, comments) => {
  return posts.map(currentPost => ({
    ...currentPost,
    user: users.find(user => user.id === currentPost.userId),
    comments: comments.filter(comment => comment.postId === currentPost.id)
  }));
};

class App extends React.Component {
  state = {
    posts: [],
    filterField: null,
    btnVisible: true,
    btnText: "Load",
    visible: false
  };

  async getPosts() {
    const posts = await postsFromServer();
    const users = await usersFromServer();
    const comments = await commentsFromServer();
    this.setState({
      posts: prepareData(posts, users, comments),
      btnVisible: false
    });
  }

  render() {
    return (
      <div className="main-div">
        {this.state.btnVisible && (
          <button
            type="button"
            className="load-button"
            onClick={() => {
              this.setState({ visible: true, btnText: "Loading..." });
              this.getPosts();
            }}
          >
            {this.state.btnText}
          </button>
        )}

        {this.state.visible ? (
          this.state.posts.length > 0 ? (
            <>
              <h1 className="main-title">Dynamic list of posts</h1>
              <Filter />
              <PostList posts={this.state.posts} />
            </>
          ) : (
            <MDSpinner size={50} />
          )
        ) : null}
      </div>
    );
  }
}

export default App;
