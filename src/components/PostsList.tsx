import React, { useState } from 'react';
import { Post } from '../types/Post';

type Props = {
  posts: Post[];
  showPostDetails: (post: Post) => void;
};

export const PostsList: React.FC<Props> = ({ posts, showPostDetails }) => {
  const [isOpenButton, setIsOpenButton] = useState(false);
  const [openPost, setOpenPost] = useState<Post>();

  const handleButton = (
    post: Post,
  ) => {
    if (post !== openPost) {
      setOpenPost(post);
      setIsOpenButton(true);
      showPostDetails(post);
    } else {
      setIsOpenButton(!isOpenButton);
      showPostDetails(post);
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
          {posts.map(post => (
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
                  className={`button is-link ${!(isOpenButton && (openPost?.id === post.id)) && 'is-light'}`}
                  onClick={() => {
                    handleButton(post);
                  }}
                >
                  {isOpenButton
                    && (openPost?.id === post.id) ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
