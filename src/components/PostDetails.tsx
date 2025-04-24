import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  setSelectedPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentError, setCommentError] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  const [formOpened, setFormOpened] = useState(false);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    setLoadingComments(true);
    setFormOpened(false);
    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(setComments)
      .catch(() => setCommentError(true))
      .finally(() => setLoadingComments(false));
  }, [selectedPost, setSelectedPost]);

  const deleteComment = (commentId: number) => {
    client
      .delete(`/comments/${commentId}`)
      .then(() => {
        setComments(currentComments =>
          currentComments.filter(comment => comment.id !== commentId),
        );
      })
      .catch(() => setCommentError(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}
          {commentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!loadingComments && comments.length === 0 && !commentError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!loadingComments && comments.length !== 0 && !commentError && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map((comment: Comment) => {
                return (
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
          {!formOpened && !loadingComments && !commentError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormOpened(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {formOpened && (
          <NewCommentForm
            selectedPost={selectedPost}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
