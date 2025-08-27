import styles from "./Overlay.module.scss";

export const OverlayUI = ({ onClick }: { onClick: () => void }) => (
	<div className={styles.overlay} onClick={onClick} />
);
