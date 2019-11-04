import React from 'react';
import {Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Post from '../post/Post';

class PostList extends React.PureComponent {
  state = {
    modifiedPosts: [], // objects which have property user: it's author of the post and comments: it's comments of the post
  };

  componentDidMount() {
    const { posts, users, comments } = this.props;

    this.setState({
      modifiedPosts: this.getmodifiedPosts(posts, users, comments),
    });
  }

  getmodifiedPosts = (postsList, usersList, commentsList) => {
    return postsList.map(post => ({
      ...post,
      user: usersList.find(user => user.id === post.userId),
      commentList: commentsList.filter(comment => comment.postId === post.id),
    }));
  };

  sortPostsByFilter = (filter) => {
    this.setState((prevState) => {
      const newPostList = [...prevState.modifiedPosts];

      switch (filter) {
        case 'title':
          newPostList.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'author':
          newPostList.sort((a, b) => a.user.name.localeCompare(b.user.name));
          break;
        case 'postContent':
          newPostList.sort((a, b) => a.body.localeCompare(b.body));
          break;
      }

      return ({
        modifiedPosts: newPostList,
      });
    });
  };

  render() {
    return (
      <>
        <div className="sortButtonContainer">
          <Button secondary onClick={this.sortPostsByFilter.bind(this, 'title')}>Sort by post title</Button>
          <Button secondary onClick={this.sortPostsByFilter.bind(this, 'author')}>Sort by author name</Button>
          <Button secondary onClick={this.sortPostsByFilter.bind(this, 'postContent')}>Sort by post text</Button>
        </div>
        <section>
          {this.state.modifiedPosts.map(post => (
            <Post
              post={post}
            />
          ))}
        </section>
      </>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  users: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
};

export default PostList;
