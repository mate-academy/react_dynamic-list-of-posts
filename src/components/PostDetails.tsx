import React, { Dispatch, SetStateAction } from 'react';
import { deleteComment } from '../api/commets';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  isCommentError: boolean;
  postComments: Comment[];
  postIdComments: number | null;
  userPosts: Post[];
  setPostComments: Dispatch<SetStateAction<Comment[]>>;
  isCommentsLoading: boolean;
  isNewComment: boolean;
  setIsNewComment: Dispatch<SetStateAction<boolean>>
};

export const PostDetails: React.FC<Props> = ({
  isCommentError,
  postComments,
  postIdComments,
  userPosts,
  setPostComments,
  isCommentsLoading,
  setIsNewComment,
  isNewComment,
}) => {
  const handleDeleteComment = async (id: number) => {
    deleteComment(id);
    setPostComments(postComments.filter(comment => comment.id !== id));
  };

  const handleNewComment = async () => {
    setIsNewComment(true);
  };

  const openedPost = userPosts.find(post => post.id === postIdComments);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {openedPost?.title}
          </h2>

          <p data-cy="PostBody">
            {openedPost?.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoading && (
            <Loader />
          )}

          {!isCommentsLoading && isCommentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isCommentsLoading && !isCommentError && postComments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => {
                return (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {!isCommentsLoading && !isCommentError && postComments.length < 1 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isNewComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleNewComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isNewComment && (
          <NewCommentForm
            postIdComments={postIdComments}
            postComments={postComments}
            setPostComments={setPostComments}
          />
        )}
      </div>
    </div>
  );
};
