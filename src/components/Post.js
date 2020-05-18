import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import User from './User';
import CommentList from './CommentList';

const Post = ({ title, body, user, comments }) => (
  <Segment raised color="blue" className="post">
    <Item.Group>
      <Item>
        <Item.Image
          size="tiny"
          src={user.photo || 'img/noavatar.png'}
        />
        <Item.Content>
          <Item.Header as="h2" className="post__title" title={title}>
            {title}
          </Item.Header>
          <Item.Meta>
            <User {...user} cmtsId={comments[comments.length - 1].id} />
          </Item.Meta>
          <Item.Description className="post__text" content={body} />
          <Item.Extra>
            <CommentList comments={comments} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  </Segment>
);

export default Post;
