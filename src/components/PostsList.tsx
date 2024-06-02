import React, { Dispatch, SetStateAction } from 'react';
import { Post } from '../types/Post';

interface PostsListProps {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
  isDetailOpen: boolean;
  setIsDetailOpen: Dispatch<SetStateAction<boolean>>;
  isFormVisible: boolean;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  selectedPost,
  setSelectedPost,
  isDetailOpen,
  setIsDetailOpen,
  setIsFormVisible,
}) => {
  const togglePostDetails = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setIsDetailOpen(!isDetailOpen);
      setIsFormVisible(false);
    } else {
      setSelectedPost(post);
      setIsDetailOpen(true);
      setIsFormVisible(false);
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
            <tr key={post.id} data-cy="Post">
              <td data-cy="PostId">{post.id}</td>
              <td data-cy="PostTitle">{post.title}</td>
              <td className="has-text-right is-vcentered">
                <button
                  type="button"
                  data-cy="PostButton"
                  className={`button is-link ${selectedPost?.id === post.id && isDetailOpen ? '' : 'is-light'}`}
                  onClick={() => togglePostDetails(post)}
                >
                  {selectedPost?.id === post.id && isDetailOpen
                    ? 'Close'
                    : 'Open'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
