import React from 'react';

export const getHighlightedText = (text, highlight) => {
  const parts = (text || '').split(new RegExp(`(${highlight})`, 'gi'));

  return parts.map((part, i) => (
    <span key={`${part + i}`}>
      {part.toLowerCase() === highlight.toLowerCase()
        ? <span className="highlighted">{part}</span> : part}
    </span>
  ));
};
