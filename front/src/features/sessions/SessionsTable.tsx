import { nanoid } from '@reduxjs/toolkit';

import { useGetSessionsQuery } from '../appApi/sessionsApi';
import SessionsRow from './SessionsRow';

function SessionsTable() {
    const { data } = useGetSessionsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Type</th>
                        <th>Cost</th>
                        <th>Win</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row) => (
                        <SessionsRow key={nanoid()} data={row} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SessionsTable;
