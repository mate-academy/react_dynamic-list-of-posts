import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  userPosts: Post[] | undefined;
  selectTitle: number | null;
  setSelectTitle: React.Dispatch<React.SetStateAction<number | null>>;
  setStateCommentButton: React.Dispatch<React.SetStateAction<boolean>>;
  // setStateAWriteAComment: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  selectTitle,
  setSelectTitle,
  setStateCommentButton,
  // setStateAWriteAComment,
}) => {
  const handleToggle = (id: number) => {
    setSelectTitle(prev => (prev === id ? null : id));

    if (selectTitle !== id) {
      setStateCommentButton(false);
    }
  };

  return (
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
          {userPosts?.map(userPost => (
            <tr data-cy="Post" key={userPost.id}>
              <td data-cy="PostId">{userPost.id}</td>

              <td data-cy="PostTitle">{userPost.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames('button is-link', {
                    'is-light': selectTitle !== userPost.id,
                  })}
                  onClick={() => {
                    handleToggle(userPost.id);
                    setStateCommentButton(
                      selectTitle === userPost.id ? true : false,
                    );
                  }}
                >
                  {selectTitle === userPost.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
