
import { Button, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

// import { deleteAllTickets } from '../../flux/slices/ticketsSlice';
import { deleteAllTickets } from '../../flux/slices/authSlice';

const HistoryCheck = () => {

    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    const user = useSelector(state => state.auth.user)

    const handleDeleteAll = () => {
        dispatch(deleteAllTickets(token))
    }


    return (
        <>
            <div className="row m-5">
                <div className="col-12 text-center text-danger fs-1 fw-bolder my-5">
                    <div> Checking history</div>
                </div>

                {user && (
                    <div
                        className="m-3 d-flex justify-content-start"
                        style={{ gap: '1rem' }}
                    >
                        <Button
                            className="mx-3 px-3"
                            color="dark"
                            onClick={handleDeleteAll}
                        >
                            Delete history
                        </Button>
                    </div>
                )}

                < Table striped responsive className="text-center">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> Date </th>
                            <th> Checking value</th>
                            <th> Won </th>
                            {/* <th> update </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {user && user?.historyCheck?.length > 0 && user?.historyCheck.map((check, index) => (
                            <tr key={check}>
                                <th scope="row">{+index+1}</th>
                                <td>{check.date}</td>
                                <td>{check.value}</td>
                                <td>{check.wonPrize}</td>
                                {/* <td>
                                    <Button onClick={handleDelete} className="mx-3 my-9" color="dark" >delete</Button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <p>Total {user ? user?.historyCheck?.length : '0'} found</p>
            </div>
        </>
    )

}

export default HistoryCheck