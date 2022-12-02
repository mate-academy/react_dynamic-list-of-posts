import React, { memo, useCallback } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setSideBarOpened: (value: boolean) => void;
  sideBarOpened: boolean;
  setSelectedPostId: (postId: number) => void;
  selectedPostId: number;
};

export const PostsList: React.FC<Props> = memo(({
  posts,
  setSideBarOpened,
  sideBarOpened,
  setSelectedPostId,
  selectedPostId,
}) => {
  const handleSelectedPost = useCallback((postId: number) => {
    if (!sideBarOpened && !selectedPostId) {
      setSideBarOpened(true);
      setSelectedPostId(postId);
    }

    if (sideBarOpened && (selectedPostId === postId)) {
      setSideBarOpened(false);
      setSelectedPostId(0);
    }

    if (sideBarOpened && (selectedPostId !== postId)) {
      setSelectedPostId(postId);
    }

    if (!sideBarOpened && (selectedPostId !== postId)) {
      setSideBarOpened(true);
      setSelectedPostId(postId);
    }
  }, [sideBarOpened, selectedPostId]);

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': !(selectedPostId === post.id),
                  })}
                  onClick={() => handleSelectedPost(post.id)}
                >
                  {!(selectedPostId === post.id) ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
