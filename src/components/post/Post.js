import React from 'react';
import { Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import CommentList from '../commentList/CommentList';
import User from '../user/User';

const Post = ({ postData }) => (
  <Item>
    <Item.Image size="small" src="https://source.unsplash.com/600x600/?cars" />
    <Item.Content>
      <Item.Header as="h2">{postData.title}</Item.Header>
      <Item.Meta><User user={postData.user} /></Item.Meta>
      <Item.Description>
        <p>{postData.body}</p>
      </Item.Description>
      <Item.Extra><CommentList commentList={postData.comments} /></Item.Extra>
    </Item.Content>
  </Item>
);

Post.propTypes = {
  postData: PropTypes.shape().isRequired,
};

export default Post;
