import { Navigate, Route } from 'react-router';

import { useAppSelector } from '../../app/hooks';
import ManagePage from '../../pages/ManagePage';
import { getAuthState } from '../auth/authSlice';

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
