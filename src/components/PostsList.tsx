import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  postInfo: boolean;
  setpostInfo: (a: boolean) => void;
  selectedPostId: number | undefined;
  setSelectPostId: (n: number) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setpostInfo,
  postInfo,
  selectedPostId,
  setSelectPostId,
}) => {
  const showComments = (id: number) => {
    if (selectedPostId === id) {
      setpostInfo(!postInfo);
    } else {
      setpostInfo(true);
    }

    setSelectPostId(id);
  };

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
                      {
                        'is-light': !((selectedPostId === id)
                          && postInfo),
                      },
                    )}
                    onClick={() => showComments(id)}
                  >
                    {((selectedPostId === id) && postInfo)
                      ? 'Close'
                      : 'Open'}

                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
