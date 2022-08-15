import React, { useEffect, useState } from 'react';
import { addNewComment, loadComments, rmComment } from '../../api/comments';
import { loadPost } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isComments, setIsComments] = useState(true);

  const deleteComment = async (id: number) => {
    await rmComment(id);
    const commentsFromServer = await loadComments(postId);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    const getPostDetails = async () => {
      const [postFromServer, commentsFromServer] = await Promise.all([
        loadPost(postId),
        loadComments(postId),
      ]);

      setPost(postFromServer);
      setComments(commentsFromServer);
    };

    getPostDetails();
  }, [postId]);

  const addComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    await addNewComment(postId, name, email, body);
    const commentsFromServer = await loadComments(postId);

    setComments(commentsFromServer);
  };

  const buttonName = isComments
    ? 'Hide'
    : 'Show';

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
          onClick={() => setIsComments(!isComments)}
        >
          {`${buttonName} ${comments.length} comments`}
        </button>

        {isComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm createComment={addComment} />
        </div>
      </section>
    </div>
  );
};
