import { FC, useEffect } from "react";

export type TModal = {
  closeModal: any;
  children: any;
  modalActive: any;
};

export const Modal: FC<TModal> = ({ modalActive, closeModal, children }) => {
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
