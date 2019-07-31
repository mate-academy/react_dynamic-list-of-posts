import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import Comment from './Comment';

class Post extends React.Component {
  state = {
    isActive: false,
  }

  commentButton = (id) => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }));
  }

  render() {
    const { post, users, comments } = this.props;
    const { isActive } = this.state;

    const findUser = users.find(user => user.id === post.userId);
    const user = <User key={findUser.id} user={findUser} />;

    const filterCom = comments.filter(com => com.postId === post.id);
    const Comments = filterCom.map(
      com => <Comment key={com.id} comment={com} isActive={isActive} />
    );

    return (
      <div className="post">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        {user}
        <button
          type="button"
          className="commentButton"
          onClick={() => this.commentButton(post.id)}
        >
          Comments
        </button>
        <hr />
        {Comments}
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object,
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
}.isRequired;

export default Post;
