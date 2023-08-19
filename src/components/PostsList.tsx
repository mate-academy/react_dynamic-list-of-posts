import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  isShowPostDetails: boolean;
  setIsShowPostDetails: (a: boolean) => void;
  selectedPostId: number | undefined;
  setSelectPostId: (n: number) => void;
};

export const PostsList: React.FC<Props> = ({
  posts,
  setIsShowPostDetails,
  isShowPostDetails,
  selectedPostId,
  setSelectPostId,
}) => {
  const handleShowDetails = (id: number) => {
    if (selectedPostId === id) {
      setIsShowPostDetails(!isShowPostDetails);
    } else {
      setIsShowPostDetails(true);
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

            const buttonText = ((selectedPostId === id)
              && isShowPostDetails)
              ? 'Close'
              : 'Open';

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
                          && isShowPostDetails),
                      },
                    )}
                    onClick={() => handleShowDetails(id)}
                  >
                    {buttonText}
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
