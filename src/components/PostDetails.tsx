import React, { useEffect, useState } from 'react';
import * as FunctionCalls from '../api/functionServerRequests';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  choosePost: Post;
};

export const PostDetails: React.FC<Props> = ({ choosePost }) => {
  const [shoowLoadingComments, setShoowLoadingComments] = useState(false);
  const [shoowErrorLoading, setShoowErrorLoading] = useState(false);
  const [shoowNewComment, setShoowNewComment] = useState(false);
  const [allComments, setAllComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    setShoowNewComment(false);
    setAllComments(null);
    if (choosePost) {
      setShoowLoadingComments(true);
      FunctionCalls.getComments(choosePost.id)
        .then(comments => {
          let id: number = 0;
          const newComments = comments.map(com => {
            id++;

            return {
              id: id,
              postId: choosePost.id,
              name: com.name,
              email: com.email,
              body: com.body,
            };
          });

          setAllComments(newComments);
        })
        .catch(() => {
          setShoowErrorLoading(true);
        })
        .finally(() => {
          setShoowLoadingComments(false);
        });
    }
  }, [choosePost]);

  function deleteComment(id: number) {
    setAllComments(current =>
      current ? current.filter(com => com.id !== id) : [],
    );
    FunctionCalls.deleteComment(id).then(() => {});
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${choosePost?.id}: ${choosePost?.title}`}</h2>

          <p data-cy="PostBody">{choosePost?.body}</p>
        </div>

        <div className="block">
          {shoowLoadingComments && <Loader />}

          {shoowErrorLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!allComments ||
            (allComments.length < 1 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ))}

          {allComments && allComments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {allComments.map(comment => {
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
                        onClick={() => deleteComment(comment.id)}
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
          {!shoowNewComment && !shoowLoadingComments && !shoowErrorLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShoowNewComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {shoowNewComment && (
          <NewCommentForm
            setAllComments={setAllComments}
            postId={choosePost.id}
            allComments={allComments}
          />
        )}
      </div>
    </div>
  );
};
