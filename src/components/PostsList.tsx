import React from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';

type Props = {
  userPosts: Post[];
  setIsSideBar: React.Dispatch<React.SetStateAction<boolean>>,
  isSideBar: boolean,
  currentPost: Post | null,
  setCurrentPost: React.Dispatch<React.SetStateAction<Post | null>>,
  setHasCommentForm: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostsList: React.FC<Props> = ({
  userPosts,
  setIsSideBar,
  isSideBar,
  currentPost,
  setCurrentPost,
  setHasCommentForm,
}) => {
  if (userPosts.length === 0) {
    return null;
  }

  const handleClick = (
    postItem: Post,
  ) => {
    if (postItem.id === currentPost?.id) {
      setIsSideBar(false);
      setCurrentPost(null);

      return;
    }

    setCurrentPost(postItem);
    setHasCommentForm(false);
    setIsSideBar(currentIsSideBar => (
      !isSideBar ? !isSideBar : currentIsSideBar));
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
          {userPosts.map(post => (
            <tr
              key={post.id}
              data-cy="Post"
            >
              <td data-cy="PostId">
                {post.id}
              </td>
              <td data-cy="PostTitle">
                {post.title}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    'is-link',
                    { 'is-light': post.id !== currentPost?.id },
                  )}
                  onClick={() => handleClick(post)}
                >
                  {post.id === currentPost?.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
