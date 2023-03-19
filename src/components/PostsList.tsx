import classNames from 'classnames';
import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[],
  onPostDetails: (post: Post) => void,
  onShowPostDetails: (click:boolean) => void,
};

export const PostsList: React.FC<Props> = ({
  posts,
  onPostDetails,
  onShowPostDetails,
}) => {
  const [currentPostId, setCurrentPostId] = useState(-1);

  const clickHandler = (post:Post) => {
    setCurrentPostId(post.id);
    onPostDetails(post);
    onShowPostDetails(true);
    if (currentPostId === post.id) {
      setCurrentPostId(-1);
      onShowPostDetails(false);
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
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {posts.map((post) => {
            return (
              <tr data-cy="Post" key={post.id}>
                <td data-cy="PostId">{post.id}</td>

                <td data-cy="PostTitle">
                  {post.title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={classNames('button is-link',
                      { 'is-light': currentPostId !== post.id })}
                    onClick={() => clickHandler(post)}
                  >
                    {currentPostId === post.id ? 'Closed' : ' Open'}
                  </button>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
    </div>
  );
};
