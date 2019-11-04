import React from 'react';
import { Card, Comment, Header, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PostComment from '../comment/Comment';

const Post = ({ post: { title, body, user: {username}, commentList } }) => (
  <div className="post">
    <Card>
      <Image src="https://react.semantic-ui.com/images/avatar/large/matthew.png" wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a className="postAuthorContainer">
          <Icon name="user" />
          {username}
        </a>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>
          {commentList.map(comment => (
            <PostComment
              commentText={comment.body}
              userName={comment.email}
            />
          ))}
        </Comment.Group>
      </Card.Content>
    </Card>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    commentList: PropTypes.arrayOf(PropTypes.shape({
      body: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default Post;
