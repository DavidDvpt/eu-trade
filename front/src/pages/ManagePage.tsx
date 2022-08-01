import { useState } from 'react';

import CategoriesManage from '../features/manage/categoriesManage';
import FamiliesManage from '../features/manage/familiesManage';
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
                {manageSelected === manageEnum.FAMILIES && <FamiliesManage />}
                {manageSelected === manageEnum.CATEGORIES && (
                    <CategoriesManage />
                )}
            </div>
        </div>
    );
}

export default ManagePage;
