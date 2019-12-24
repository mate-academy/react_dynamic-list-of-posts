import React from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { Comment, Icon } from 'semantic-ui-react';

function SingleComment({ comment }) {
  const { name, email, body } = comment;

  return (
    <>
      <Comment.Group>
        <Comment>
          <Comment.Avatar
            as="a"
            src="https://react.semantic-ui.com/images/avatar/small/stevie.jpg"
          />
          <Comment.Content>
            <Comment.Author>
              {name}
              <p />
              {email}
            </Comment.Author>
            <Comment.Metadata>
              <div>2 days ago</div>
              <div>
                <Icon name="star" />
5 Faves
              </div>
            </Comment.Metadata>
            <Comment.Text>
              {body}
            </Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </>
  );
}

export default SingleComment;

SingleComment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};
