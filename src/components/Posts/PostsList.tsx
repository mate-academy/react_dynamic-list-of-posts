import { useContext } from 'react';

import { Notifications, Messages } from '../../libs/enums';
import { NotificationBlock } from '../common';
import { StateContext } from '../../store';
import { PostsListItem } from './PostsListItem';

export const PostsList: React.FC = () => {
  const {
    posts: { posts },
  } = useContext(StateContext);

  const hasPosts = !!posts.length;

  return (
    hasPosts ? (
      <div data-cy="PostsList">
        <p className="title">Posts:</p>

        <table className="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead>
            <tr className="has-background-link-light">
              <th>#</th>
              <th>Title</th>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {posts.map(post => (
              <PostsListItem
                key={post.id}
                post={post}
              />
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <NotificationBlock
        type={Notifications.Warning}
        dataCy="NoPostsYet"
        message={Messages.NoPostsYet}
      />
    )
  );
};
