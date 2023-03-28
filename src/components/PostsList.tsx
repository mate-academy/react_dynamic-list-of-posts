import classNames from 'classnames';
import React from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  setSelectPost: (post:Post | null) => void;
  selectPost : Post | null;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectPost,
  selectPost,
}) => {
  const handleClick = (post:Post | null) => {
    if (selectPost === post) {
      setSelectPost(null);
    } else {
      setSelectPost(post);
    }
  };

  return (
    <>
      {posts.length
        ? (
          <div data-cy="PostsList">
            <p className="title">Posts:</p>
            <table
              className="table is-fullwidth is-striped is-hoverable is-narrow"
            >
              <thead>
                <tr className="has-background-link-light">
                  <th>#</th>
                  <th>Title</th>
                  <th> </th>
                </tr>
              </thead>

              <tbody>
                {posts.map(post => {
                  const { id, title } = post;

                  return (
                    <tr data-cy="Post" key={id}>
                      <td data-cy="PostId">{id}</td>

                      <td data-cy="PostTitle">
                        {title}
                      </td>

                      <td className="has-text-right is-vcentered">
                        <button
                          type="button"
                          data-cy="PostButton"
                          className={classNames(
                            'button',
                            'is-link',
                            { 'is-light': selectPost?.id !== id },
                          )}
                          onClick={() => handleClick(post)}
                        >
                          {selectPost?.id === id ? 'Close' : 'Open'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
        : (
          <div className="notification is-warning" data-cy="NoPostsYet">
            No posts yet
          </div>
        )}
    </>
  );
};
