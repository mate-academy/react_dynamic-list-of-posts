import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import { getMessageDate } from '../../helpers';

const generateNumber = (min = 0, max = 70) => Math.floor(
  Math.random() * (max - min + 1) + min,
);

type PropsUser = User & {
  commentId: number;
};

export const User: React.FC<PropsUser> = ({
  id,
  commentId,
  name,
  email,
  address
}) => (
  <Feed className="user">
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary className="user__summary">
          <Feed.User>{name}</Feed.User>
          <Feed.Date>
            {`added this post on ${getMessageDate(commentId + id)}`}
          </Feed.Date>
        </Feed.Summary>
        <p className="user__address" aria-label={email}>
          {`email: ${email}`}
        </p>
        <p className="user__address" aria-label={address.city}>
          {`city: ${address.city}`}
        </p>
        <Feed.Meta>
          <Feed.Like>
            <Icon name="like" />
            {`${generateNumber()} Likes`}
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  </Feed>
);
