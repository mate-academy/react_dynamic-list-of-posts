import React from 'react';
import { Post } from '../types/Post';

interface Props {
  posts: Post[];
  setPostDetails: (p: boolean) => void;
  postDetais: boolean;
  setSelectedPost: (post: Post | null) => void;
  selectedPost: Post | null;
}

export const PostsList: React.FC<Props> = ({
  posts,
  setPostDetails,
  postDetais,
  setSelectedPost,
  selectedPost,
}) => (
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
                className={`button is-link ${selectedPost?.id === post.id ? '' : 'is-light'}`}
                onClick={() => {
                  if (selectedPost?.id === post.id) {
                    setPostDetails(false);
                    setSelectedPost(null);
                  } else {
                    setSelectedPost(post);
                    setPostDetails(!postDetais);
                  }
                }}
              >
                {selectedPost?.id === post.id ? 'Close' : 'Open'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
