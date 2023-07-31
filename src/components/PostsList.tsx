import React from 'react';
import cn from 'classnames';

import { Post } from '../types/Post';
import { PostsContext } from '../context/postsContext';

interface Props {
  posts: Post[];
}

export const PostsList: React.FC<Props> = ({ posts }) => {
  const {
    selectedPost,
    setSelectedPost,
  } = React.useContext(PostsContext);

  function onOpenPostClick(post: Post) {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  }

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
                  className={cn('button', 'is-link', {
                    'is-light': selectedPost?.id === post.id,
                  })}
                  onClick={() => onOpenPostClick(post)}
                >
                  Open
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
