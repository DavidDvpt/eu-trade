import { Navigate, Route } from 'react-router';

import { useAppSelector } from '../app/hooks';
import { getAuthState } from '../features/auth/authSlice';
import ManagePage from '../pages/ManagePage';

function ProtectedRoutes() {
    const { isAdmin, isLogged } = useAppSelector(getAuthState);

    if (!isLogged) {
        return <Navigate to="/" />;
    }

    return (
        <>
            {isAdmin && (
                <Route path="manage" element={<ManagePage />}>
                    {/* <Route path="families" /> */}
                </Route>
            )}
        </>
    );
}

export default ProtectedRoutes;
