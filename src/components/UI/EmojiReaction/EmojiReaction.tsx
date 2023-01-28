import React, { FC } from "react";

interface IEmojiReaction {
  children: React.ReactNode;
}

export const EmojiReaction: FC<IEmojiReaction> = ({ children }) => {
  return <div>{children}</div>;
};
