
import { useEffect } from 'react';
import { Spinner, Button, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllUsers, toggleModalMessage, setUser, updateUser } from '../../flux/slices/usersSlice';
import { Search } from '../../components/Search';
import Paginator from '../../components/Paginator';
import Messenger from '../../components/Messenger';


const Users = () => {

    const dispatch = useDispatch()

    const users = useSelector(state => state.users.users)
    const paginatedUsers = useSelector(state => state.users.paginatedUsers)
    const searchedUsers = useSelector(state => state.users.searchedUsers)
    const user = useSelector(state => state.users.user)

    const currentPage = useSelector(state => state.users.currentPage)

    const searchText = useSelector(state => state.users.searchText)

    const isLoading = useSelector(state => state.users.isLoading)


    const handleDeleteAll = () => {
        dispatch(toggleModalMessage("delete all users ?"))
    }

    const handleDelete = userId => {
        const deletingUser = users.find(user => user._id === userId)

        const username = deletingUser.username

        const confirm = `delete user ${username} ?`

        dispatch(toggleModalMessage(confirm))
        dispatch(setUser(deletingUser))

    }

    const handleAdmin = userId => {
        const updatingUser = users.find(user => user._id === userId)
        dispatch(setUser(updatingUser))

        const updatedUser = {
            ...user,
            isAdmin: true
        }

        dispatch(updateUser({
            updatedUser: updatedUser,
            currentPage: currentPage
        }))
    }


    useEffect(() => {
        dispatch(fetchAllUsers({
            currentPage: currentPage,
            searchText: searchText
        }))
    }, [currentPage, searchText, dispatch])


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
                <Search placeholder='type name/mail' />
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
                                <tr key={user}>
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
                                <tr key={user}>
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