import React, { useState, useEffect } from 'react';
import { loadPostComments, addCommentToServer, deleteCommentFromServer } from '../../api/comments';
import { loadPostDetails } from '../../api/post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isHiddenComments, setIsHiddenComments] = useState(false);

  useEffect(() => {
    (async () => {
      const commentsFromApi = await loadPostComments(selectedPostId);

      setComments(commentsFromApi);
    })();

    (async () => {
      const postsFromApi = await loadPostDetails(selectedPostId);

      setSelectedPost(postsFromApi);
    })();
  }, [selectedPostId]);

  const handleHiddenComments = () => {
    setIsHiddenComments(!isHiddenComments);
  };

  const addComments = async (newComment: Partial<Comment>) => {
    await addCommentToServer(newComment);
    const commentsFromApi = await loadPostComments(selectedPostId);

    setComments(commentsFromApi);
  };

  const deleteComment = async (commentId: number) => {
    await deleteCommentFromServer(commentId);
    const commentsFromApi = await loadPostComments(selectedPostId);

    setComments(commentsFromApi);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost?.body}</p>
      </section>

      {comments.length > 0 && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={handleHiddenComments}
          >
            {`${!isHiddenComments ? 'Hide' : 'Show'} `
             + `${comments.length} comments`}
          </button>

          <ul className="PostDetails__list">
            {!isHiddenComments && (
              comments.map(comment => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))
            )}
          </ul>
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            onAddComments={addComments}
          />
        </div>
      </section>
    </div>
  );
};
