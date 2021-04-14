import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader/Loader';
import './PostDetails.scss';
import { removeComment, getPostComments } from '../../api/api';
import { Post, Comment } from '../../types';

interface Props {
  selectedPost: Post,
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [buttonIsActive, setButtonIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const reloadComments = async () => {
    setIsLoading(true);

    const result = await getPostComments(selectedPost.id);

    setComments(result);

    setIsLoading(false);
  };

  useEffect(() => {
    reloadComments()
  }, [selectedPost]);

  const handleButton = () => {
    if (buttonIsActive) {
      setButtonIsActive(false);
    } else {
      setButtonIsActive(true);
    }
  }

  const deleteComment = async (id: number) => {
    await removeComment(id);
    getPostComments(selectedPost.id)
      .then(setComments);
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="PostDetails">
    <h2>Post details:</h2>

    <section className="PostDetails__post">
      <p>{selectedPost.title}</p>
    </section>

    <section className="PostDetails__comments">
      <button
        type="button"
        className="button"
        onClick={handleButton}
      >
        {buttonIsActive ? `Show ${comments.length} comments` : `Hide ${comments.length} comments`}
      </button>

      <ul className="PostDetails__list">
        {comments.length > 0 && !buttonIsActive && comments.map((comment) => (
          <li className="PostDetails__list-item" key={comment.id}>
            <button
              type="button"
              className="PostDetails__remove-button button"
              onClick={() => deleteComment(comment.id)}
            >
              X
            </button>
            <p>{comment.name}</p>
          </li>
        ))}
      </ul>
    </section>

    <section>
      <div className="PostDetails__form-wrapper">
        <NewCommentForm
          postId={selectedPost.id}
          onSetComments={setComments}
        />
      </div>
    </section>
  </div>
  )
}
