import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './genericModal.module.scss';

interface IGenericModalProps {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
}

function GenericModal({ title, children, onClose }: IGenericModalProps) {
    const handleCloseClick = () => {
        onClose();
    };

    return (
        <div className={styles.backgroundLayer}>
            <div className={styles.modalLayer}>
                <div className={styles.titleContainer}>
                    <h2>{title}</h2>
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={handleCloseClick}
                    />
                </div>
                <div className={styles.modalContentContainer}>{children}</div>
                <div className={styles.modalButtonsContainer}></div>
            </div>
        </div>
    );
}

export default GenericModal;
