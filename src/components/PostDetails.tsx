import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteCommentData, getCommentsData } from '../api/api';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post,
  createNewComment: boolean,
  setCreateNewComment: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  createNewComment,
  setCreateNewComment = () => {},
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    setLoader(true);
    setErrorMessage(false);

    getCommentsData(selectedPost.id)
      .then(setPostComments)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoader(false));
  }, [selectedPost]);

  const createNewCommentForm = () => {
    setCreateNewComment(true);
  };

  const deleteComment = async (commentId: number) => {
    const temporaryComments = [...postComments];

    setPostComments(prevComments => prevComments
      .filter(comment => comment.id !== commentId));

    try {
      await deleteCommentData(commentId);
    } catch {
      setPostComments(temporaryComments);
    }
  };

  const { id, title, body } = selectedPost;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {loader && (
            <Loader />
          )}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!loader && !errorMessage
            && postComments && postComments.length === 0) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!errorMessage && postComments && postComments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {
                postComments.map(comment => {
                  const {
                    id: commentId,
                    name,
                    email,
                    body: commentBody,
                  } = comment;

                  return (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={commentId}
                    >
                      <div className="message-header">
                        <a
                          href={`mailto:${email}`}
                          data-cy="CommentAuthor"
                        >
                          {name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => deleteComment(commentId)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {commentBody}
                      </div>
                    </article>
                  );
                })
              }
            </>
          )}

          {!errorMessage && (
            createNewComment
              ? (
                <NewCommentForm
                  postId={id}
                  setPostComments={setPostComments}
                  setErrorMessage={setErrorMessage}
                />
              ) : (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={createNewCommentForm}
                >
                  Write a comment
                </button>
              )
          )}

        </div>

      </div>
    </div>
  );
};
