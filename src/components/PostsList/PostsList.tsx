import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { getPostsOfUser } from '../../api/post';

import { PostItem } from '../PostItem';
import { Loader } from '../Loader';

import { Post } from '../../types/Post';
import { LoadStage } from '../../types/LoadStage';

type Props = {
  selectedUserId: number;
};

export const PostsList: React.FC<Props> = ({ selectedUserId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadStage, setLoadStage]
    = useState<LoadStage>(LoadStage.Uninitialized);

  useEffect(() => {
    setLoadStage(LoadStage.Loading);

    getPostsOfUser(selectedUserId)
      .then(setPosts)
      .then(
        () => setLoadStage(LoadStage.Success),
        () => setLoadStage(LoadStage.Error),
      );
  }, [selectedUserId]);

  return (
    <>
      {loadStage === LoadStage.Loading && (
        <Loader />
      )}

      {loadStage === LoadStage.Error && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {loadStage === LoadStage.Success && !posts.length && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {loadStage === LoadStage.Success && posts.length > 0 && (
        <div data-cy="PostsList">
          <p className="title">Posts:</p>

          <table
            className={classNames(
              'table',
              'is-fullwidth',
              'is-striped',
              'is-hoverable',
              'is-narrow',
            )}
          >
            <thead>
              <tr className="has-background-link-light">
                <th>#</th>
                <th>Title</th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {posts.map(post => (
                <PostItem
                  key={post.id}
                  post={post}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
