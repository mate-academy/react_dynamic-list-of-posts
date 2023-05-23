import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComments, deleteComment } from '../api/data';

type Props = {
  activePostData: Post,
};

export const PostDetails: React.FC<Props> = React.memo(({ activePostData }) => {
  const { id, title, body } = activePostData;

  const [listOfComments, setListOfComments] = useState<null | Comment[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGetCommentsError, setIsGetCommentsError] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  const commentsGetter = useCallback(async (postId: number) => {
    try {
      const comments = await getComments(postId);

      setListOfComments(comments);
    } catch {
      setIsGetCommentsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteComment = (param: number) => {
    const visibleComments = listOfComments?.filter(comment => {
      const { id: commentId } = comment;

      return commentId !== param;
    });

    if (visibleComments) {
      setListOfComments(visibleComments);
    }

    deleteComment(param)
      .finally(() => commentsGetter(id));
  };

  useEffect(() => {
    setIsLoading(true);
    setListOfComments(null);

    if (isGetCommentsError) {
      setIsGetCommentsError(false);
    }

    if (showNewCommentForm) {
      setShowNewCommentForm(false);
    }

    commentsGetter(id);
  }, [activePostData]);

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
          {!isLoading ? (
            <>
              {isGetCommentsError ? (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              ) : (
                <>
                  {listOfComments && listOfComments.length
                    ? (<p className="title is-4">Comments:</p>)
                    : (
                      <p className="title is-4" data-cy="NoCommentsMessage">
                        No comments yet
                      </p>
                    )}

                  {listOfComments?.map(comment => {
                    const {
                      id: commentId,
                      name,
                      email,
                      body: bodyOfComment,
                    } = comment;

                    return (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={commentId}
                      >
                        <div className="message-header">
                          <a href={`mailto:${email}`} data-cy="CommentAuthor">
                            {name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => handleDeleteComment(commentId)}
                          >
                            delete button
                          </button>
                        </div>

                        <div className="message-body" data-cy="CommentBody">
                          {bodyOfComment}
                        </div>
                      </article>
                    );
                  })}

                  {!showNewCommentForm && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => setShowNewCommentForm(true)}
                    >
                      Write a comment
                    </button>
                  )}

                  {showNewCommentForm
                    && (
                      <NewCommentForm
                        postId={id}
                        getNewComments={commentsGetter}
                        commentError={setIsGetCommentsError}
                      />
                    )}
                </>
              )}
            </>
          ) : <Loader /> }
        </div>
      </div>
    </div>
  );
});
