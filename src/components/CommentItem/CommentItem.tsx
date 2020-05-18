import React from 'react';
import { Comment } from 'semantic-ui-react';
import { getMessageDate } from '../../helpers';

type PropsCommentItem = Comment;

export const CommentItem: React.FC<PropsCommentItem> = ({
  id,
  name,
  email,
  body,
}) => (
  <>
    <Comment className="comment">
      <Comment.Content>
        <Comment.Author className="comment__title" content={name} />
        <Comment.Metadata>
          {`comment was added on ${getMessageDate(id)}`}
        </Comment.Metadata>
        <Comment.Text className="comment__text" content={body} />
        <Comment.Metadata>
          <Comment.Action content={email} />
        </Comment.Metadata>
      </Comment.Content>
    </Comment>
  </>
);
