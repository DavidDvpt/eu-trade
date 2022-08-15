interface SessionRowProps {
    data: Session;
}

function SessionsRow({ data }: SessionRowProps) {
    return (
        <tr>
            <td>{data.number}</td>
            <td>{data.type.toLowerCase()}</td>
            <td>{data.ttCost}</td>
            <td>{data.ttWin}</td>
            <td>{data.isOpen === true ? 'Open' : 'Closed'}</td>
        </tr>
    );
}

export default SessionsRow;
