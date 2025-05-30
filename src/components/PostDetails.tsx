import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

interface Props {
  selectedPost: Post;
  isOpenCommentForm: boolean;
  onCommentFormOpen: () => void;
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isOpenCommentForm,
  onCommentFormOpen,
}) => {
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoadingPost(true);
    setHasError(false);

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setIsLoadingPost(false));
  }, [selectedPost]);

  const handleCommentDelete = (commentId: number) => {
    client.delete(`/comments/${commentId}`);

    const filteredComments = comments.filter(
      comment => comment.id !== commentId,
    );

    setComments(filteredComments);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost.id}: {selectedPost.title}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoadingPost && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !isLoadingPost && !hasError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length >= 1 && !isLoadingPost && !hasError && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleCommentDelete(comment.id)}
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

          {!isOpenCommentForm && !isLoadingPost && !hasError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => onCommentFormOpen()}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenCommentForm && (
          <NewCommentForm setComments={setComments} postId={selectedPost.id} />
        )}
      </div>
    </div>
  );
};
