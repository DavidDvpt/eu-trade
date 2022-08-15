import { Route, Routes } from 'react-router';

import { useAppSelector } from '../app/hooks';
import { getAuthState } from '../features/auth/authSlice';
import HomePage from '../pages/HomePage';
import ManagePage from '../pages/ManagePage';
import SessionPage from '../pages/SessionPage';

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
                    <Route path="sessions" element={<SessionPage />} />
                </>
            )}
        </Routes>
    );
}

export default AppRouter;
