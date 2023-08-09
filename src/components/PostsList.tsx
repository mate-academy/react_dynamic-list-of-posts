import React from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComments } from '../utils/api';

interface Props {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>;
  setIsCommentLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentsError: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostsList: React.FC<Props> = ({
  posts,
  selectedPost,
  setSelectedPost,
  setComments,
  setIsCommentLoading,
  setCommentsError,
}) => {
  const handleOpenPost = (post: Post) => {
    setSelectedPost(post);
    setIsCommentLoading(true);

    getComments(post.id)
      .then((comments) => {
        setComments(comments);
      })
      .catch(() => setCommentsError(true))
      .finally(() => setIsCommentLoading(false));

    if (selectedPost && selectedPost.id === post.id) {
      setSelectedPost(null);
      setComments(null);
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
            const { id, title } = post;
            const isPostSelected = id === selectedPost?.id;

            return (
              <tr data-cy="Post" key={id}>
                <td data-cy="PostId">{id}</td>

                <td data-cy="PostTitle">
                  {title}
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    type="button"
                    data-cy="PostButton"
                    className={`button ${
                      isPostSelected
                        ? 'is-link'
                        : 'is-light'
                    }`}
                    onClick={() => handleOpenPost(post)}
                  >
                    {isPostSelected
                      ? 'Close'
                      : 'Open'}
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
