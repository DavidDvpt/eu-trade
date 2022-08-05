import { Route, Routes } from 'react-router';

import { useAppSelector } from '../../app/hooks';
import HomePage from '../../pages/HomePage';
import ManagePage from '../../pages/ManagePage';
import { getAuthState } from '../auth/authSlice';

function AppRouter() {
    const { isAdmin, isLogged } = useAppSelector(getAuthState);
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {isLogged && (
                <>
                    {isAdmin && (
                        <Route path="manage" element={<ManagePage />}>
                            {/* <Route path="families" /> */}
                        </Route>
                    )}
                </>
            )}
        </Routes>
    );
}

export default AppRouter;
