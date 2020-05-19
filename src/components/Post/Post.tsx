import React, { Fragment } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { User } from '../User';
import { CommentList } from '../CommentList';

type PropsPost = Post;

export const Post: React.FC<PropsPost> = ({
  title,
  body,
  user,
  comments,
  highlightedText,
}) => {
  const highlightText = (text: string) => {
    if (!highlightedText) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlightedText})`, 'gi'));

    return parts.map((part, i) => (
      <Fragment key={`${part + i}`}>
        {part.toLowerCase() === highlightedText.toLowerCase()
          ? <span className="highlighted-text">{part}</span>
          : part}
      </Fragment>
    ));
  };

  return (
    <Segment raised color="blue" className="post">
      <Item.Group>
        <Item>
          <Item.Image
            size="tiny"
            src={user.photo || 'img/noavatar.png'}
          />
          <Item.Content>
            <Item.Header
              as="h2"
              title={title}
              className="post__title"
              content={highlightText(title)}
            />
            <Item.Meta>
              <User {...user} commentId={comments[comments.length - 1].id} />
            </Item.Meta>
            <Item.Description
              className="post__text"
              content={highlightText(body)}
            />
            <Item.Extra>
              <CommentList comments={comments} />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  );
};
