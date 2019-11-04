import React, { Component } from 'react';
import Post from '../post/Post';

export default class PostList extends Component {

  state = {
    filter: '',
  }

  filterOfPosts = (event) => {
    const textToFilter = event.target.value;
    this.setState({
      filter: textToFilter
    });
  }

  render() {
    const { postInfo } = this.props;
    const filteredPosts = postInfo
      .filter(post =>
        post.title.includes(this.state.filter)
      ||
       post.body.includes(this.state.filter));

    return (
      <>
        <input
          type="text"
          className="form-control w-50 my-5"
          placeholder="What need to be found?"
          onChange={this.filterOfPosts}
        />
        <div className="container">
          {filteredPosts.map(post => (<Post post={post} key={post.id} />))}
        </div>
      </>
    );
  }
}
