import React, { FC, useEffect } from "react";

interface IModal {
  closeModal: VoidFunction;
  children: React.ReactNode;
  modalActive: boolean;
}

export const Modal: FC<IModal> = ({ modalActive, closeModal, children }) => {
  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        closeModal();
      }
    }
    if (modalActive) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [modalActive, closeModal]);
  return <div>{children}</div>;
};
