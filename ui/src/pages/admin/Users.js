
import { useEffect } from 'react';
import { Spinner, Button, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllUsers, toggleModalMessage, setUser, setAdmin } from '../../flux/slices/usersSlice';
import { Search } from '../../components/Search';
import Paginator from '../../components/Paginator';
import Messenger from '../../components/Messenger';


const Users = () => {

    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)

    const users = useSelector(state => state.users.users)
    const paginatedUsers = useSelector(state => state.users.paginatedUsers)
    const searchedUsers = useSelector(state => state.users.searchedUsers)
    const pickedUser = useSelector(state => state.users.pickedUser)
console.log(users)
    const currentPage = useSelector(state => state.users.currentPage)
    const searchText = useSelector(state => state.users.searchText)
    const isLoading = useSelector(state => state.users.isLoading)

    const handleDelete = userId => {
        const deletingUser = users.find(user => user._id === userId)

        const email = deletingUser.email

        const confirm = `delete user ${email} ?`

        dispatch(toggleModalMessage(confirm))
        dispatch(setUser(deletingUser))

    }

    const handleAdmin = userId => {
        const updatingUser = users.find(user => user._id === userId)
        dispatch(setUser(updatingUser))

        const updatedUser = {
            ...pickedUser,
            isAdmin: true
        }

        dispatch(setAdmin({
            updatedUser: updatedUser,
            currentPage: currentPage,
            token: token
        }))
    }


    useEffect(() => {
        dispatch(fetchAllUsers({
            currentPage: currentPage,
            searchText: searchText,
            token: token
        }))
    }, [currentPage, searchText, token, dispatch])


    return (
        <div className="container pt-5 mw-100">
            <Messenger />
            <title className="row">
                <div className="col-12 text-center text-danger fs-1 fw-bolder">
                    <div> users management</div>
                    <hr />
                </div>
            </title>

            <div
                className="m-3 d-flex justify-content-end flex-wrap"
                style={{ gap: '1rem' }}
            >
                <Search placeholder='type email' />
            </div>


            {isLoading && (
                <div className="m-3 d-flex justify-content-center" >
                    <Spinner
                        className="m-3"
                        color="danger"
                    >
                        Loading...
                    </Spinner>
                </div>
            )}

            {users.length <= 0 && !isLoading ? (
                <p style={{ textAlign: 'center' }}> not found user </p>
            ) : null}

            {!isLoading && searchText && searchedUsers.length > 0 && (
                <>
                    < Table striped responsive className="text-center">
                        <thead>
                            <tr>
                                <th> # </th>
                                <th> email </th>
                                <th> username </th>
                                <th> mobile </th>
                                <th> update </th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <th scope="row">{index}</th>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                        {user.isAdmin ? 'isAdmin' : (
                                            <>
                                                <Button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="mx-3 my-1" color="dark"
                                                >delete</Button>
                                                <Button
                                                    onClick={() => handleAdmin(user._id)}
                                                    color="danger"
                                                >admin</Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <p>total {searchedUsers.length} found</p>
                </>
            )
            }

            {
                users.length > 0 && !searchText && !isLoading &&
                <>
                    < Table striped responsive className="text-center" >
                        <thead>
                            <tr>
                                <th> # </th>
                                <th> email </th>
                                <th> username </th>
                                <th> mobile </th>
                                <th> update </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user, index) => (
                                <tr key={user._id}>
                                    {/* later : admin thi xep trc */}
                                    <th scope="row">{index}</th>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                        {user.isAdmin ? 'isAdmin' : (
                                            <>
                                                <Button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="mx-3 my-1" color="dark"
                                                >delete</Button>
                                                <Button
                                                    onClick={() => handleAdmin(user._id)}
                                                    color="danger"
                                                >admin</Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <p>total <strong>{users.length}</strong> users found</p>
                    <p>page : {currentPage}</p>
                    <Paginator />
                </>
            }

            {
                !isLoading && searchText && searchedUsers.length <= 0 && (
                    <p style={{ textAlign: 'center' }}> not found user </p>
                )
            }

        </div >
    )

}

export default Users