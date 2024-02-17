import { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { getComments } from '../api/posts';
import { Notifications } from '../types/Notifications';
import { Loader } from './Loader';
import { CommentItem } from './CommentItem';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { id, title, body } = selectedPost;

  useEffect(() => {
    setOpenForm(false);
    setLoadingComments(true);
    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setErrorMessage(Notifications.loadingError))
      .finally(() => setLoadingComments(false));
  }, [selectedPost]);

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
          {loadingComments && <Loader />}

          {errorMessage && !loadingComments && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              {Notifications.loadingError}
            </div>
          )}

          {!comments.length && !loadingComments && !errorMessage && (
            <p
              className="title is-4"
              data-cy="NoCommentsMessage"
            >
              {Notifications.noComments}
            </p>
          )}

          {comments.length > 0 && !loadingComments && !errorMessage && (
            <>
              <p className="title is-4">
                Comments:
              </p>
              {comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  setComments={setComments}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {openForm && (
        <NewCommentForm
          selectedPost={selectedPost}
          setComments={setComments}
        />
      )}

      {!errorMessage && !openForm && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setOpenForm(true)}
        >
          Write a comment
        </button>
      )}
    </div>
  );
};
