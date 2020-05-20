import React from 'react';
import { Comment } from '../helper/api';


export const CommentCard = ({ name, body }: Comment) => (
  <div className="comment">
    <div className="commentator-panel">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHN0eWxlPi5zdDEyM3tmaWxsOiNkZmUzZTh9PC9zdHlsZT48ZyBpZD0iTGF5ZXJfM18xXyI+PHBhdGggY2xhc3M9InN0MTIzIiBkPSJNMjAgMmM5LjkyNSAwIDE4IDguMDc1IDE4IDE4cy04LjA3NSAxOC0xOCAxOFMyIDI5LjkyNSAyIDIwIDEwLjA3NSAyIDIwIDJtMC0yQzguOTU0IDAgMCA4Ljk1NCAwIDIwczguOTU0IDIwIDIwIDIwIDIwLTguOTU0IDIwLTIwUzMxLjA0NiAwIDIwIDB6Ii8+PGNpcmNsZSBjbGFzcz0ic3QxMjMiIGN4PSIyMCIgY3k9IjE1LjMzMyIgcj0iOS4zMjYiLz48cGF0aCBjbGFzcz0ic3QxMjMiIGQ9Ik0yMCA0MGM1Ljg5MiAwIDExLjE3Mi0yLjU2MyAxNC44MzItNi42MTdhMTUuNDYxIDE1LjQ2MSAwIDAwLTcuMDU5LTkuMDk0QzI1LjY5IDI2LjEgMjIuOTc2IDI3LjIwMiAyMCAyNy4yMDJzLTUuNjktMS4xMDMtNy43NzMtMi45MTNhMTUuNDYxIDE1LjQ2MSAwIDAwLTcuMDU5IDkuMDk0QzguODI4IDM3LjQzNyAxNC4xMDggNDAgMjAgNDB6Ii8+PC9nPjwvc3ZnPg==" alt="" />
      <div className="comment-name">{name}</div>
    </div>
    <div>{body}</div>
  </div>
);
