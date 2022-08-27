
import { Button, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { setPaginatedHistory, setSearchedHistory } from '../../flux/slices/ticketsSlice';
import Paginator from './../Paginator';
import { Search } from './../Search';
import { clearCurrentPage, fetchNextPage, fetchPreviousPage, setConfirm, toggleModal } from '../../flux/slices/sharedSlice';
import { useEffect } from 'react';

const HistoryCheck = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { searchedHistory, paginatedHistory } = useSelector(state => state.tickets)

    const { searchText, currentPage } = useSelector(state => state.shared)
    const perPage = 15
    const totalChecks = user.historyCheck.length
    const lastPage = Math.ceil(totalChecks / perPage)


    const handleSearch = () => {
        // tim trong user.historyCheck
        const searchedHistory = searchText && user.historyCheck.filter(check => {
            if (searchText !== '') {
                const value = check.date.includes(searchText.trim().toString())
                return value
            }
        })

        dispatch(setSearchedHistory(searchedHistory))
    }

    const handleDeleteAll = async () => {
        const confirm = "Delete all checking history ?"
        dispatch(toggleModal())
        dispatch(setConfirm(confirm))
    }


    const handlePrevious = () => {
        dispatch(fetchPreviousPage())
        dispatch(setPaginatedHistory(paginatedHistory))
    }

    const handleNext = () => {
        dispatch(fetchNextPage())
        dispatch(setPaginatedHistory(paginatedHistory))
    }

    useEffect(() => {
        const ItemsOnePage = currentPage && user.historyCheck.filter((check, index) => {
            // items in prev page(s)
            const minAmount = (currentPage - 1) * perPage
            // items in prev page(s) + current page
            const maxAmount = currentPage * perPage
            
            const condition = minAmount <= index && index < maxAmount
            return condition
        })

        dispatch(setPaginatedHistory(ItemsOnePage))
    }, [dispatch, currentPage, user])


    useEffect(() => {
        dispatch(clearCurrentPage())
        dispatch(setSearchedHistory())
    }, [dispatch])


    // later : sort func
    return (
        <>
            <div className="row m-md-5">
                <div className="col-12 text-center text-danger fs-1 fw-bolder my-5">
                    <div> Checking history</div>
                </div>

                <div
                    className={!searchedHistory
                        ? "m-3 d-flex justify-content-between flex-wrap"
                        : "m-3 d-flex justify-content-end flex-wrap"
                    }
                    style={{ gap: '1rem' }}
                >
                    {!searchedHistory && (
                        <Button
                            className="mx-3 px-md-3"
                            color="dark"
                            onClick={handleDeleteAll}
                        >
                            Delete history
                        </Button>
                    )}
                    <Search placeholder='Type date ...' color="dark" handleSearch={handleSearch} />
                </div>

                {/* have searched but no result (data) found */}
                {(searchedHistory && searchedHistory.length <= 0) && (
                    <p style={{ textAlign: 'center' }}> Not found checked ticket with that value </p>
                )}
                {/* found result */}
                {searchedHistory && searchedHistory.length > 0 && (
                    < Table striped responsive className="text-center ">
                        <thead>
                            <tr>
                                <th> # </th>
                                <th> Date </th>
                                <th> Checking value</th>
                                <th> Won </th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedHistory.map((check, index) => (
                                <tr key={index}>
                                    <th scope="row">{+index + 1}</th>
                                    <td>{check.date}</td>
                                    <td>{check.value}</td>
                                    <td className="text-center">
                                        {check.wonPrizes.join(' , ')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                {/* prevent from case that going to the next page without data */}
                {(paginatedHistory && paginatedHistory.length <= 0) && (
                    <>
                        <p style={{ textAlign: 'center' }}> Not found ticket </p>
                        <p>Total {user ? user?.historyCheck?.length : '0'} found</p>
                        <p>Page : {currentPage} </p>
                        <Paginator
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                            currentPage={currentPage}
                            lastPage={lastPage}
                        />
                    </>
                )}

                {/* not search data => render normally */}
                {(!searchedHistory && paginatedHistory && paginatedHistory.length > 0) && (
                    <>
                        < Table striped responsive className="text-center ">
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
                                {paginatedHistory.map((check, index) => (
                                    <tr key={index}>
                                        <th scope="row">{+index + perPage * (currentPage - 1) + 1}</th>
                                        <td>{check.date}</td>
                                        <td>{check.value}</td>
                                        <td className="text-center">
                                            {check.wonPrizes.join(' , ')}
                                        </td>
                                        {/* <td>
                                            <Button onClick={handleDelete} className="mx-3 my-9" color="dark" >delete</Button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <p>Total <mark style={{ background: '#eeb69b' }}>{user ? user?.historyCheck?.length : '0'}</mark> checking found</p>
                        <p>Page : {currentPage} </p>
                        <Paginator
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                            currentPage={currentPage}
                            lastPage={lastPage}
                        />
                    </>
                )}
            </div>
        </>
    )

}

export default HistoryCheck