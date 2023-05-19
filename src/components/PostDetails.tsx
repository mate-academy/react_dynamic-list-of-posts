import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComment } from '../api/data';

type Props = {
  activePoste: Post,
};

export const PostDetails: React.FC<Props> = React.memo(({ activePoste }) => {
  const { id, title, body } = activePoste;

  const [listOfComments, setListOfComments] = useState<null | Comment[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGetCommentsError, setIsGetCommentsError] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setListOfComments(null);

    if (isGetCommentsError) {
      setIsGetCommentsError(false);
    }

    if (showNewCommentForm) {
      setShowNewCommentForm(false);
    }

    const commentsGetter = async () => {
      try {
        const comments = await getComment(id);

        setListOfComments(comments);
      } catch {
        setIsGetCommentsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    commentsGetter();
  }, [activePoste]);

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
                    const { name, email, body: bodyOfComment } = comment;

                    return (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={id}
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

                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setShowNewCommentForm(true)}
                  >
                    Write a comment
                  </button>

                  {showNewCommentForm && <NewCommentForm />}
                </>
              )}
            </>
          ) : <Loader /> }
        </div>
      </div>
    </div>
  );
});
