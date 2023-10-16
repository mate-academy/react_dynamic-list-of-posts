import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { deleteComment, getComments } from '../../services/comments';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsAreLoading, setCommentsAreLoading] = useState(false);
  const [errorInCommentsOccured, setErrorInCommentsOccured] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    setCommentsAreLoading(true);

    if (selectedPost) {
      getComments(selectedPost.id)
        .then((currentComments) => {
          setComments(currentComments);
          setIsButtonClicked(false);
        })
        .catch(() => setErrorInCommentsOccured(true))
        .finally(() => {
          setCommentsAreLoading(false);
        });
    }
  }, [selectedPost.id, selectedPost]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setComments(currentComments => currentComments.filter(
          comment => comment.id !== commentId,
        ));
      })
      .catch(() => setErrorInCommentsOccured(true));
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id} ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {commentsAreLoading && (
            <Loader />
          )}

          {errorInCommentsOccured && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !commentsAreLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => {
                const {
                  id,
                  name,
                  body,
                  email,
                } = comment;

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
                        onClick={() => handleDelete(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {!isButtonClicked && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleButtonClick}
            >
              Write a comment
            </button>
          )}
        </div>

        {isButtonClicked && (
          <NewCommentForm
            selectedPost={selectedPost}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
