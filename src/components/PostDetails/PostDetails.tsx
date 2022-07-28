import React, { useEffect, useState } from 'react';
import { addComment, loadComments, removeComment } from '../../api/comments';
import { loadPost } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isComments, setIsComments] = useState(true);

  const deleteComment = async (id: number) => {
    await removeComment(id);
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

  const addNewComment = async (
    name: string,
    email: string,
    body: string,
  ) => {
    await addComment(postId, name, email, body);
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
          <ul
            className="PostDetails__list"
            data-cy="postDetails"
          >
            {comments.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  onClick={() => deleteComment(comment.id)}
                  className="PostDetails__remove-button button"

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
          <NewCommentForm createComment={addNewComment} />
        </div>
      </section>
    </div>
  );
};
