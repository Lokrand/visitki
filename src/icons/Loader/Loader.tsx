import React, { FC } from "react";

export const Loader: FC = () => {
  return (
    <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M20.0001 7.66663C13.1886 7.66663 7.66675 13.1884 7.66675 20C7.66675 26.8115 13.1886 32.3333 20.0001 32.3333C26.8116 32.3333 32.3334 26.8115 32.3334 20C32.3334 19.4477 32.7811 19 33.3334 19C33.8857 19 34.3334 19.4477 34.3334 20C34.3334 27.916 27.9162 34.3333 20.0001 34.3333C12.084 34.3333 5.66675 27.916 5.66675 20C5.66675 12.0839 12.084 5.66663 20.0001 5.66663C20.5524 5.66663 21.0001 6.11434 21.0001 6.66663C21.0001 7.21891 20.5524 7.66663 20.0001 7.66663Z'
        fill='#FF00A8'
      />
    </svg>
  );
};