import React from 'react';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';
import { Card, Icon, Image } from 'semantic-ui-react';
import { URL_IMG } from './Post.constants';
import User from '../User/User';
import Comments from '../Comments/Comments';

function Post({ postData }) {
  const { user, comments } = postData;

  return (
    <>
      <Image
        src={URL_IMG[Math.floor(Math.random() * (3 + 1 - 1))]}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header><User currentUser={user} /></Card.Header>
        <p />
        <Card.Header>{postData.title}</Card.Header>
        <Card.Meta>
          <p className="date">
Post id
            {postData.id}
          </p>
          <p className="date">{postData.body}</p>
          <p className="date">
Joined in 20
            {Math.floor(10 + Math.random() * (19 + 1 - 10))}
          </p>
        </Card.Meta>
        <Card.Description>
          <Comments currentComments={comments} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href="./#">
          <Icon name="user" />
          {Math.floor(Math.random() * (100 + 1 - 1))}
          {' '}
Friends
        </a>
      </Card.Content>
    </>
  );
}

export default Post;

Post.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};
