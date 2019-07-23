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
        openComments: !previousState.openComments,
      }
    ));
  };

  render() {
    const {
      id, title, body, user, commentsList,
    } = this.props.postData;

    return (
      <li
        key={`post_${id}`}
        className="post_item"
      >
        <h3>{title}</h3>
        <p>{body}</p>
        <User user={user} />
        {
          this.state.openComments ? (
            <CommentList
              comment={commentsList}
            />
          ) : ``
        }
        <div>
          <span>
            {commentsList.length}
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
    id: propTypes.number,
    title: propTypes.string,
    body: propTypes.string,
    user: propTypes.shape({}),
    commentsList: propTypes.array,
  }).isRequired,
};

export default Post;
