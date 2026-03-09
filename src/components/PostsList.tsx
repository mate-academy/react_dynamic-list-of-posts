import React from 'react';
import { Post } from '../types/Post';
interface Props {
  posts: Post[];
  selectedPost: number | null;
  setSelectedPost: (postId: number | null) => void;
  isOpenDetails: boolean;
  setIsOpenDetails: (value: boolean) => void;
}

export const PostsList: React.FC<Props> = ({
  posts,
  setSelectedPost,
  selectedPost,
  setIsOpenDetails,
}) => {
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
          {posts.map(post => {
            const isCurrentPostOpen = selectedPost === post.id;

            return (
              <tr key={post.id} data-cy="Post">
                <td data-cy="PostId">{post.id}</td>
                <td data-cy="PostTitle">{post.title}</td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={`button is-link ${isCurrentPostOpen ? '' : 'is-light'}`}
                    onClick={() => {
                      if (isCurrentPostOpen) {
                        setSelectedPost(null);
                        setIsOpenDetails(false);
                      } else {
                        setSelectedPost(post.id);
                        setIsOpenDetails(true);
                      }
                    }}
                  >
                    {isCurrentPostOpen ? 'Close' : 'Open'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
