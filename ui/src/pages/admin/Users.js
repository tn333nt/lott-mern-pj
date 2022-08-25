
import { useEffect } from 'react';
import { Button, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllUsers, setPickedUser, setAdmin } from '../../flux/slices/usersSlice';
import { Search } from '../../components/Search';
import Paginator from '../../components/Paginator';
import MessageHandler from '../../components/Handler/Message'
import ConfirmHandler from '../../components/Handler/Confirm'
import Loader from '../../components/Loader';
import {
    clearCurrentPage, clearSearchText,
    fetchNextPage, fetchPreviousPage,
    setConfirm, setMessage,
    setSearchText, toggleModal
} from '../../flux/slices/sharedSlice';


const Users = () => {
    const dispatch = useDispatch()

    const { token, isAuthLoading } = useSelector(state => state.auth)

    const {
        users, isUsersLoading,
        paginatedUsers, searchedUsers,
    } = useSelector(state => state.users)

    const { searchText, currentPage, message, confirm } = useSelector(state => state.shared)
    const totalUsers = users.length
    const perPage = 9
    const lastPage = Math.ceil(totalUsers / perPage)

    const handleSearch = () => {
        dispatch(setSearchText(searchText))
    }

    const handleDelete = userId => {
        const deletingUser = users.find(user => user._id === userId)
        const email = deletingUser.email
        const confirm = `delete user ${email} ?`

        dispatch(toggleModal())
        dispatch(setConfirm(confirm))
        dispatch(setPickedUser(deletingUser))
    }

    const handleAdmin = async (userId) => {
        const updatingUser = users.find(user => user._id === userId)

        const updatedUser = {
            ...updatingUser,
            isAdmin: true
        }

        const data = await dispatch(setAdmin({
            updatedUser,
            currentPage,
            token
        }))

        if (data.error) {
            dispatch(toggleModal())
            dispatch(setMessage(data.error.message))
            return
        }
    }

    const handlePrevious = () => {
        dispatch(fetchPreviousPage())
    }

    const handleNext = () => {
        dispatch(fetchNextPage())
    }


    useEffect(() => {
        dispatch(clearSearchText())
        dispatch(clearCurrentPage())
    }, [dispatch])


    useEffect(() => {
        dispatch(fetchAllUsers({
            currentPage,
            searchText,
            token
        }))
    }, [currentPage, searchText, token, dispatch])


    return (
        <div className="container pt-5 mw-100">
            {message !== '' && <MessageHandler message={message} />}
            {confirm !== '' && <ConfirmHandler confirm={confirm} />}

            {isAuthLoading ? (
                <Loader color="danger" />
            ) : (
                <>

                    <title className="row">
                        <div className="col-12 text-center text-danger fs-1 fw-bolder">
                            <div> Users Management</div>
                            <hr />
                        </div>
                    </title>

                    <div
                        className="m-3 d-flex justify-content-end flex-wrap"
                        style={{ gap: '1rem' }}
                    >
                        <Search placeholder='Type email' handleSearch={handleSearch} />
                    </div>


                    {isUsersLoading && (
                        <Loader color="danger" />
                    )}

                    {users.length <= 0 && !isUsersLoading ? (
                        <p style={{ textAlign: 'center' }}> Not fetched user </p>
                    ) : null}

                    {!isUsersLoading && searchText !== '' && searchedUsers.length > 0 && (
                        <>
                            < Table striped responsive className="text-center">
                                <thead>
                                    <tr>
                                        <th> # </th>
                                        <th> Email </th>
                                        <th> Username </th>
                                        <th> Mobile </th>
                                        <th> Update </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchedUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            <th scope="row">{+index + 1}</th>
                                            <td>{user.email}</td>
                                            <td>{user.username}</td>
                                            <td>{user.mobile}</td>
                                            <td>
                                                {user.isAdmin ? 'isAdmin' : (
                                                    <>
                                                        <Button
                                                            onClick={() => handleDelete(user._id)}
                                                            className="mx-3 my-1" color="dark"
                                                        >Delete</Button>
                                                        <Button
                                                            onClick={() => handleAdmin(user._id)}
                                                            color="danger"
                                                        >Admin</Button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <p>Total <mark style={{ background: '#eeb69b' }}>{searchedUsers.length}</mark> user(s) found</p>
                        </>
                    )
                    }

                    {
                        users.length > 0 && searchText === '' && !isUsersLoading &&
                        <>
                            < Table striped responsive className="text-center" >
                                <thead>
                                    <tr>
                                        <th> # </th>
                                        <th> Email </th>
                                        <th> Username </th>
                                        <th> Mobile </th>
                                        <th> Update </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            {/* later : admin thi xep trc */}
                                            <th scope="row">{+index + perPage * (currentPage - 1) + 1}</th>
                                            <td>{user.email}</td>
                                            <td>{user.username}</td>
                                            <td>{user.mobile}</td>
                                            <td>
                                                {user.isAdmin ? 'isAdmin' : (
                                                    <>
                                                        <Button
                                                            onClick={() => handleDelete(user._id)}
                                                            className="mx-3 my-1" color="dark"
                                                        >Delete</Button>
                                                        <Button
                                                            onClick={() => handleAdmin(user._id)}
                                                            color="danger"
                                                        >Admin</Button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <p>Total <mark style={{ background: '#eeb69b' }}>{users.length}</mark> users found</p>
                            <p>Page : {currentPage}</p>
                            <Paginator
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                                currentPage={currentPage}
                                lastPage={lastPage}
                            />
                        </>
                    }

                    {
                        !isUsersLoading && searchText !== '' && searchedUsers.length <= 0 && (
                            <p style={{ textAlign: 'center' }}> Not found user </p>
                        )
                    }
                </>
            )}

        </div >
    )

}

export default Users