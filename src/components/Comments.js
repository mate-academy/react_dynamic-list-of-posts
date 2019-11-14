import React from 'react';
import PropTypes from 'prop-types';

function Comments(props) {
  const { comments } = props;

  return (
    <div>
      <div className="comments-start-title">
        Comments :
      </div>
      {
        comments.map(
          comment => (
            <div className="comment">
              <div>
                {
                  comment.name
                }
              </div>
              <div>
                {
                  comment.email
                }
              </div>
              <div>
                {
                  comment.body
                }
              </div>
            </div>
          )
        )
      }
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.instanceOf(Array).isRequired,
};

export default Comments;
