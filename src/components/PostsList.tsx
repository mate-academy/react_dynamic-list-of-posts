import React from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  selectedPost: Post;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post>>;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
}) => {
  const handleSelectedPost = (passedPost: Post) => {
    if (selectedPost.id !== passedPost.id) {
      setSelectedPost(passedPost);
    } else {
      setSelectedPost({
        id: 0,
        userId: 0,
        title: '',
        body: '',
      });
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

        {posts.map(post => (
          <tbody>
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': post.id !== selectedPost.id,
                  })}
                  onClick={() => handleSelectedPost(post)}
                >
                  {post.id !== selectedPost.id ? 'Open' : 'Close'}
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
