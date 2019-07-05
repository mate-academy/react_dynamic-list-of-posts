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
  console.log(posts);
  console.log(users);
  console.log(comments);
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

  getPosts = () => {
    const posts = Promise.resolve(postsFromServer());
    const users = Promise.resolve(usersFromServer());
    const comments = Promise.resolve(commentsFromServer());
    this.setState({
      posts: prepareData(posts, users, comments)
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="main-div">
        {this.state.btnVisible === true && (
          <button
            ref="btn"
            type="button"
            className="load-button"
            dissabled="false"
            onClick={() => {
              this.setState({ visible: true, btnText: "Loading..." });
              this.refs.btn.setAttribute("disabled", "disabled");
            }}
          >
            {this.state.btnText}
          </button>
        )}

        {this.state.visible === true ? (
          this.state.posts.length > 0 ? (
            <>
              {this.setState({ btnVisible: false })}
              <h1>Dynamic list of posts</h1>
              <Filter />
              <PostList posts={this.state.posts} />
            </>
          ) : (
            <>
              <MDSpinner />
              {this.getPosts()}
            </>
          )
        ) : null}
      </div>
    );
  }
}

export default App;
