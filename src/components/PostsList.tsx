import React, { Dispatch, SetStateAction } from 'react';
import { Post } from '../types/Post'; // Assuming Post type is defined in a separate file

interface PostsListProps {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
  isDetailOpen: boolean;
  setIsDetailOpen: Dispatch<SetStateAction<boolean>>;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  selectedPost,
  setSelectedPost,
  isDetailOpen,
  setIsDetailOpen,
}) => {
  const togglePostDetails = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setIsDetailOpen(!isDetailOpen);
    } else {
      setSelectedPost(post);
      setIsDetailOpen(true);
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
                  className={`button is-link ${selectedPost?.id === post.id && isDetailOpen ? 'is-light' : ''}`}
                  onClick={() => togglePostDetails(post)}
                >
                  {!isDetailOpen ? <p>Open</p> : <p>Close</p>}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
