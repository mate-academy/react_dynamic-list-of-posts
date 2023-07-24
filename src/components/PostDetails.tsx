import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import * as postService from '../api/dataFromService';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isErrorOccured, setIsErrorOccured] = useState<boolean>(false);
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false);

  useEffect(() => {
    setComments([]);
    setIsDataLoading(true);
    setIsErrorOccured(false);
    setIsFormOpened(false);

    postService.getComments(id)
      .then((commentsFromServer) => setComments(commentsFromServer))
      .catch(() => setIsErrorOccured(true))
      .finally(() => setIsDataLoading(false));
  }, [post]);

  const handleAddNewComment = (newComment: CommentData) => {
    const comment = { ...newComment, postId: id };

    return postService.postComment(comment)
      .then((addedComment) => {
        setComments(prevComments => [...prevComments, addedComment]);
      });
  };

  const handleDeleteButton = (currentId: number) => {
    postService.deleteComment(currentId)
      .then(() => {
        setComments(prevComments => prevComments.filter(
          comment => comment.id !== currentId,
        ));
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isDataLoading && <Loader />}

          {isErrorOccured && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {!isDataLoading && !isErrorOccured
            && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map((comment: Comment) => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
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
                      onClick={() => handleDeleteButton(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isDataLoading && !isErrorOccured && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpened(true)}
            >
              Write a comment
            </button>
          )}

        </div>

        {isFormOpened && (
          <NewCommentForm
            addNewComment={(newComment) => handleAddNewComment(newComment)}
          />
        )}
      </div>
    </div>
  );
};
