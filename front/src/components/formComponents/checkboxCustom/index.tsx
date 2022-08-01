import { forwardRef, LegacyRef } from 'react';

import styles from './checkboxCustom.module.scss';

interface CheckboxCustomProps {
    name: string;
    checked: boolean;
    // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    // defaultValue?: string | number | readonly string[] | undefined;
    // value?: string | number | readonly string[] | undefined;
}

function CheckboxCustom(
    { checked, ...rest }: CheckboxCustomProps,
    ref: LegacyRef<HTMLInputElement> | undefined,
) {
    return (
        <div className={styles.inputCustom}>
            <fieldset>
                <input ref={ref} type="checkbox" checked={checked} {...rest} />
            </fieldset>
        </div>
    );
}

export default forwardRef(CheckboxCustom);
