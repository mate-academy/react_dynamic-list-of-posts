import React, { useState } from 'react';

type Props = {
  loadPosts: () => void;
};

export const LoadButton: React.FC<Props> = ({ loadPosts }) => {
  const [title, setTitle] = useState<string>('Load');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadTodos = () => {
    setTitle('Loading...');
    setIsLoading(true);

    setTimeout(() => {
      loadPosts();
    }, 1000);
  };

  return (
    <button
      type="button"
      className="waves-effect waves-light btn-large"
      disabled={isLoading}
      onClick={loadTodos}
    >
      {title}
    </button>
  );
};
