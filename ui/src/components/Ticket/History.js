
import { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import dateFormat from 'dateformat'

import { fetchAllResults } from '../../flux/slices/resultsSlice';
import { isEmail, length } from '../../util/validators';
import { fetchAllUsers } from '../../flux/slices/usersSlice';


const HistoryCheck = () => {

    const dispatch = useDispatch()

    const users = useSelector(state => state.users.users)
    console.log(users, 'users')

    const handleDelete = () => {

    }

    return (
        <>
            <div className="row m-5">
                <div className="col-12 text-center text-danger fs-1 fw-bolder my-5">
                    <div> checking history</div>
                </div>

                <div
                    className="m-3 d-flex justify-content-start"
                    style={{ gap: '1rem' }}
                >
                    <Button
                        className="mx-3 px-3"
                        color="dark"
                        // onClick={handleDeleteAll}
                    >
                        delete history
                    </Button>
                </div>

                < Table striped responsive className="text-center">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th> date </th>
                            <th> checking value</th>
                            <th> won </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users[9].historyCheck.map((check, index) => (
                            <tr key={check}>
                                <th scope="row">{index}</th>
                                <td>{dateFormat(check.date, "d/m/yyyy")}</td>
                                <td>{check.value}</td>
                                <td>{check.win}</td>
                                <td>
                                    <Button onClick={handleDelete} className="mx-3 my-9" color="dark" >delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <p>total {users[9].historyCheck.length} found</p>
                {/* sao cu load lai cai la thanh do */}
            </div>
        </>
    )

}

export default HistoryCheck