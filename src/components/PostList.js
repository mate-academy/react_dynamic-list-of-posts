import React from "react";
import Post from "./Post";

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      requested: false,
      postList: [],
      postFiltred: null,
      input: ""
    };
    this.loadAllData = this.loadAllData.bind(this);
    this.findPhrase = this.findPhrase.bind(this);
  }

  getData(url) {
    return fetch(url).then(result => result.json());
  }

  loadAllData() {
    this.setState({
      requested: true
    });

    Promise.all([
      this.getData("https://jsonplaceholder.typicode.com/posts"),
      this.getData("https://jsonplaceholder.typicode.com/users"),
      this.getData("https://jsonplaceholder.typicode.com/comments")
    ]).then(([posts, users, comments]) =>
      this.setState({
        loaded: true,
        postList: posts.map(post => ({
          ...post,
          user: users.find(user => user.id === post.userId),
          comments: comments.filter(comment => comment.postId === post.id)
        }))
      })
    );
  }

  findPhrase(event) {
    const value = event.target.value.toLowerCase();
    this.setState({
      input: value,
      postFiltred: this.state.postList.filter(
        elem => elem.title.includes(value) || elem.body.includes(value)
      )
    });
  }

  render() {
    if (!this.state.requested) {
      return <button onClick={this.loadAllData}>Load Posts</button>;
    } else if (this.state.loaded) {
      return (
        <section className="posts">
          <input className="findPhrase" type="text" onInput={this.findPhrase} />
          {this.state.input
            ? this.state.postFiltred.map(elem => (
                <Post item={elem} key={elem.id} />
              ))
            : this.state.postList.map(elem => (
                <Post item={elem} key={elem.id} />
              ))}
        </section>
      );
    }
    return <button desabled="true">Loading...</button>;
  }
}

export default PostList;
