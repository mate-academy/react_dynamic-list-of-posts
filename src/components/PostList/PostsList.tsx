import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { getComments } from '../../utils/fetch_Comments';
import './PostList.scss';

type Props = {
  posts: Post[],
  setLoadingError: React.Dispatch<React.SetStateAction<string>>,
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setIsCommentsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostsList: React.FC<Props> = ({
  posts,
  setLoadingError,
  selectedPost,
  setSelectedPost,
  setComments,
  setIsCommentsLoaded,
}) => {
  const [isPostOpened, setIsPostOpened] = useState(false);

  const handleOpenBtnClick = (post: Post) => {
    setSelectedPost(post);
    setIsPostOpened(true);
    setIsCommentsLoaded(false);

    getComments()
      .then(commentsFromApi => {
        setComments(
          commentsFromApi.filter(comment => comment.postId === post.id),
        );
        setIsCommentsLoaded(true);
      })
      .catch(() => setLoadingError('Something went wrong!'));
  };

  const handleCloseBtnClick = () => {
    setIsCommentsLoaded(false);
    setIsPostOpened(false);
    setComments([]);
    setSelectedPost(null);
  };

  return (
    <div
      data-cy="PostsList"
      className={
        !selectedPost
          ? 'PostList-stretch'
          : ''
      }
    >
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
                {(!isPostOpened || post.id !== selectedPost?.id)
              && (
                <button
                  type="button"
                  data-cy="PostButton"
                  className="button is-light"
                  onClick={() => handleOpenBtnClick(post)}
                >
                  Open
                </button>
              )}
                {(post.id === selectedPost?.id && isPostOpened)
               && (
                 <button
                   type="button"
                   data-cy="PostButton"
                   className="button is-link"
                   onClick={() => handleCloseBtnClick()}
                 >
                   Close
                 </button>
               )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
