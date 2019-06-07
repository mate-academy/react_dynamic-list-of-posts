import React, {Component} from 'react';
import Post from './Post';

class PostList extends Component {

  render() {
    const postItems = this.props.posts.map((post, i) => <Post {...post} key={i}/>);
    return (
        <div>{postItems}</div>
    );
  }
}

export default PostList;
