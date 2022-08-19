import React, { useEffect, useState } from 'react';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/post';
import { NewCommentForm } from '../NewCommentForm';
import { deleteComment, getPostComments } from '../../api/comments';
import './PostDetails.scss';
import { Comment } from '../../types/comment';

interface Props {
  postId: string;
}

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comsVisibility, setComsVisibility] = useState<boolean>(true);

  async function loadPost() {
    try {
      const loaded = await getPostDetails(postId);

      setSelectedPost(loaded);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  async function loadComments() {
    const comsFromServer = await getPostComments(postId);

    setComments(comsFromServer);
  }

  useEffect(() => {
    loadPost();
    loadComments();
  }, [postId]);

  const comsVisTrigger = () => {
    setComsVisibility(prevState => !prevState);
  };

  const deleteCommentHandler = async (commId: number) => {
    await deleteComment(commId);
    loadComments();
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length === 0
          ? null
          : (
            <button
              type="button"
              className="button"
              onClick={comsVisTrigger}
            >
              Hide&#160;
              {comments.length}
              &#160;comments
            </button>
          )}
        {comsVisibility && (
          <ul className="PostDetails__list" data-cy="postList">
            {comments.map(oneComment => (
              <li className="PostDetails__list-item" key={oneComment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteCommentHandler(oneComment.id)}
                >
                  X
                </button>
                <p>{oneComment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            // eslint-disable-next-line react/jsx-no-bind
            reloadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};
