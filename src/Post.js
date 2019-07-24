import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';
import './styles/Post.css';

class Post extends React.Component {
  state = {
    showComments: false,
  };

  changeShowComments() {
    this.setState(prevState => ({
      showComments: !prevState.showComments,
    }));
  }

  render() {
    const { post } = this.props;
    const { user, commentsList } = post;
    const { showComments } = this.state;

    return (
      <div className="post">
        <div className="post__content">
          <h2 className="post__content--title">{post.title}</h2>
          <p className="post__content--body">{post.body}</p>
        </div>
        <User
          key={user.id}
          user={user}
        />
        <button
          type="button"
          onClick={() => this.changeShowComments()}
          className="post__comments"
        >
          {showComments ? 'Hide comments'
            : `Show ${commentsList.length} comments`
          }
        </button>
        <div
          className={showComments ? 'comments-show' : 'comments-hide'}
        >
          <CommentList
            commentsList={commentsList}
          />
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    commentsList: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  }).isRequired,
};

export default Post;
