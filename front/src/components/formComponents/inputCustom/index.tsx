import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, forwardRef, LegacyRef, useEffect, useState } from 'react';

import styles from './inputCustom.module.scss';

interface IInputCustomProps {
  type: InputType;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string | number | readonly string[] | undefined;
  value?: string | number | readonly string[] | undefined;
}
function InputCustom(
  { type, ...rest }: IInputCustomProps,
  ref: LegacyRef<HTMLInputElement> | undefined,
) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    setIsVisible(false);
  }, [type]);

  const handleVisibleChange = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className={`${styles.inputCustom} ${
        type === 'password' ? styles.customBorderRadius : ''
      }`}
    >
      <fieldset>
        <input ref={ref} type={isVisible ? 'text' : type} {...rest} />
        <div></div>
        {type === 'password' && (
          <FontAwesomeIcon
            icon={isVisible ? faEyeSlash : faEye}
            onClick={handleVisibleChange}
          />
        )}
      </fieldset>
    </div>
  );
}

export default forwardRef(InputCustom);
