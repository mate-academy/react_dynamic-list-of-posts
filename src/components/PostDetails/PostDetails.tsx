import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentVisible, setIsCommentVisible] = useState(true);

  useEffect(() => {
    (async () => {
      const postDetailsFromAPI = await getPostDetails(selectedPostId);

      setPost(postDetailsFromAPI);
    })();

    (async () => {
      const postCommentsFromAPI = await getPostComments(selectedPostId);

      setComments(postCommentsFromAPI);
    })();
  }, [selectedPostId]);

  const addNewComment = async (newComment: Partial<Comment>) => {
    const postCommentsFromAPI = await addComment(newComment);

    setComments((currentComments) => [...currentComments, postCommentsFromAPI]);
  };

  const deleteCommentFromAPI = async (commentId: number) => {
    await deleteComment(commentId);

    setComments((currentComments) => currentComments.filter(comment => comment.id !== commentId));
  };

  const handleClick = () => {
    setIsCommentVisible(!isCommentVisible);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleClick}
        >
          {isCommentVisible
            ? `Hide ${comments.length} comments`
            : `Show ${comments.length} comments`}
        </button>

        <ul className="PostDetails__list">
          {isCommentVisible && (
            <>
              {comments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => deleteCommentFromAPI(comment.id)}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </>
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
