import { useState } from 'react';

import Families from '../features/manage/families';
import styles from './styles/managePage.module.scss';

enum manageEnum {
    NONE,
    FAMILIES,
    CATEGORIES,
    ITEMS,
}

function ManagePage() {
    const [manageSelected, setManageSelected] = useState(manageEnum.NONE);
    const handleNavClick = (value: manageEnum) => {
        setManageSelected(value);
    };
    return (
        <div className={styles.managePage}>
            <div className={styles.navigation}>
                <ul>
                    <li onClick={() => handleNavClick(manageEnum.FAMILIES)}>
                        Families
                    </li>
                    <li onClick={() => handleNavClick(manageEnum.CATEGORIES)}>
                        Categories
                    </li>
                    <li onClick={() => handleNavClick(manageEnum.ITEMS)}>
                        Items
                    </li>
                </ul>
            </div>
            <div className={styles.manageContainer}>
                {manageSelected === manageEnum.FAMILIES && <Families />}
            </div>
        </div>
    );
}

export default ManagePage;
