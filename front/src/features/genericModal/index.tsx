import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch } from '../../../App/reduxHooks';
import { loginModalClose } from '../../../redux/modalReducer';
import styles from './genericModal.module.scss';

interface IModalDefaultLayerProps {
  children: React.ReactNode;
  title: string;
}
function ModalDefaultLayer({ title, children }: IModalDefaultLayerProps) {
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(loginModalClose());
  };

  return (
    <div className={styles.backgroundLayer}>
      <div className={styles.modalLayer}>
        <div className={styles.titleContainer}>
          <h2 onClick={handleCloseClick}>{title}</h2>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalDefaultLayer;
