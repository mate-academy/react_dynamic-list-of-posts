import { FC, useState } from 'react';
import { Post } from '../types/Post';
import cn from 'classnames';

interface IProps {
  posts: Post[];
  setSelectedPost: (post: Post) => void;
  setIsOpen: (bool: boolean) => void;
}

export const PostsList: FC<IProps> = ({
  posts,
  setSelectedPost,
  setIsOpen,
}) => {
  const [postId, setPostId] = useState<number | null>(null);

  const handleSideBar = (selectPost: Post) => {
    if (postId === selectPost.id) {
      setPostId(null);
      setIsOpen(false);
    } else {
      setPostId(selectPost.id);
      setSelectedPost(selectPost);
      setIsOpen(true);
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
          {posts.map(post => (
            <tr data-cy="Post" key={post.id}>
              <td data-cy="PostId">{post.id}</td>

              <td data-cy="PostTitle">{post.title}</td>

              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={cn('button is-link', {
                    'is-light': postId !== post.id,
                  })}
                  onClick={() => handleSideBar(post)}
                >
                  {postId === post.id ? 'Close' : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
