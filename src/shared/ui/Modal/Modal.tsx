import { useCallback, useEffect, type FC, type ReactNode } from "react";
import style from "./Modal.module.scss";
import { OverlayUI } from "../Overlay";
import { useNavigate } from "react-router-dom";
import { useModalStatus } from "../../../store/use-app-store";
import clsx from "clsx";

interface IModalProps {
  children: ReactNode;
}

export const Modal: FC<IModalProps> = ({ children }) => {
  const navigate = useNavigate();
  const modalStatus = useModalStatus();

  const onClose = useCallback((): void => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <OverlayUI onClick={onClose} />
      <div className={clsx(style.modal, !modalStatus && style.modal_open)}>
        <button className={style.close_button} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </>
  );
};
