import React from 'react';
import propTypes from 'prop-types';
import User from './User';
import CommentList from './CommentsList';

class Post extends React.Component {
  state = {
    openComments: false,
  };

  handleCommentClick = () => {
    this.setState(previousState => (
      {
        openComments: previousState.openComments === false,
      }
    ));
  };

  render() {
    const { postData } = this.props;

    return (
      <li
        key={`post_${postData.id}`}
        className="post_item"
      >
        <h3>{postData.title}</h3>
        <p>{postData.body}</p>
        <User user={postData.user} />
        {
          this.state.openComments ? (
            <CommentList
              comment={postData.commentsList}
            />
          ) : ``
        }
        <div>
          <span>
            {postData.commentsList.length}
            {` comments : `}
          </span>
          <button
            type="button"
            onClick={this.handleCommentClick}
          >
            {this.state.openComments ? 'close' : 'open'}
          </button>
        </div>
      </li>
    );
  }
}

Post.propTypes = {
  postData: propTypes.shape({
    title: propTypes.string,
    body: propTypes.string,
    user: propTypes.shape({}),
    commentsList: propTypes.array,
  }).isRequired,
};

export default Post;
