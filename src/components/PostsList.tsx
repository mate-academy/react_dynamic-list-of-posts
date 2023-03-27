import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';

type PostlistProps = {
  currentPostsList: Post[],
  setSelectedPost: (postId: number) => void,
};

export const PostsList: React.FC<PostlistProps> = ({
  currentPostsList,
  setSelectedPost,
}) => {
  const [isPostSelected, setIsPostSelected] = useState(false);

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
          {currentPostsList.map((post) => (
            <tr
              data-cy="Post"
              key={post.id}
            >
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">
                {post.title}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={classNames(
                    'button',
                    { 'is-link': isPostSelected },
                    { 'is-light': !isPostSelected },
                  )}
                  onClick={() => {
                    setSelectedPost(post.id);
                    setIsPostSelected(true);
                  }}
                >
                  {isPostSelected
                    ? ('Close')
                    : ('Open')}
                </button>
              </td>
            </tr>
          ))}
          {/*
          <tr data-cy="Post">
            <td data-cy="PostId">18</td>

            <td data-cy="PostTitle">
              voluptate et itaque vero tempora molestiae
            </td>

            <td className="has-text-right is-vcentered">
              <button
                type="button"
                data-cy="PostButton"
                className="button is-link"
              >
                Close
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};
