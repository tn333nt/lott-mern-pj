
import { useEffect } from 'react';
import { UncontrolledAccordion, Button, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllResults, toggleModalAdd, setPickedResult, toggleModalUpdate, setResultsSearch, fetchPreviousResultsPage } from '../flux/slices/resultsSlice';
import { Search } from '../components/Search';
import { ResultForm } from '../components/Result/Form';
import { ResultDetail } from '../components/Result/Detail';
import Paginator from '../components/Paginator';
import MessageHandler from '../components/Handler/Message'
import ConfirmHandler from '../components/Handler/Confirm'
import Loader from './../components/Loader';
import { clearCurrentPage, fetchNextPage, fetchPreviousPage } from '../flux/slices/sharedSlice';
import { toggleIsAdmin } from '../flux/slices/authSlice';


const Results = () => {

    const dispatch = useDispatch()

    const { token, user, isAuthLoading, isAdmin } = useSelector(state => state.auth)
    const { results, paginatedResults, searchedResults,
        resultsSearch, isResultsLoading
    } = useSelector(state => state.results)

    const { searchText, currentPage } = useSelector(state => state.shared)
    const totalResults = results.length
    const lastPage = Math.ceil(totalResults / 9)

    const handleSearch = () => {
        dispatch(setResultsSearch(searchText))
    }

    const handleUpdate = resultId => {
        const updatingResult = results.find(result => {
            return result._id === resultId
        })

        dispatch(toggleModalUpdate())
        dispatch(setPickedResult(updatingResult))
    }

    const handlePrevious = () => {
        dispatch(fetchPreviousPage())
    }

    const handleNext = () => {
        dispatch(fetchNextPage())
    }

    // clear shared data everytime reload page
    useEffect(() => {
        dispatch(clearCurrentPage())
    }, [dispatch])


    useEffect(() => {
        dispatch(fetchAllResults({
            currentPage,
            searchText: resultsSearch,
            token: token
        }))
    }, [currentPage, resultsSearch, token, dispatch])


    // update temp state to fit with real role 
    useEffect(() => {
        // giai quyet triet de van de nay tot nhat la tach rieng results cho 2 role
        // va tach rieng ham switch cho both 2 case de ko bi loi navigate
        if (!isAdmin && user?.isAdmin!=='') {
            dispatch(toggleIsAdmin(user?.isAdmin))
            // -> auto true if reload
        } else {
            dispatch(toggleIsAdmin(isAdmin))
            // -> auto isAdmin ve F r
        }
        // isAdmin && dispatch(toggleIsAdmin(false))
        // !isAdmin && user?.isAdmin!==undefined && dispatch(toggleIsAdmin(user?.isAdmin))
    }, [dispatch, user, isAdmin])


    console.log(isAdmin, 89898)
    console.log(user?.isAdmin, 89898)

    return (
        <div className="container pt-5 mw-100">
            <MessageHandler />
            <ConfirmHandler />
            <ResultForm />
            {isAuthLoading ? (
                <Loader color="primary" />
            ) : (
                <>

                    <title className="row">
                        <div className="col-12 text-center text-primary fs-1 fw-bolder">
                            {/* {(user && isAdmin) ? (
                                <div> Results Management</div>
                            ) : (
                                <div className='text-uppercase'> lottery results </div>
                            )} */}
                            {user ? (
                                <>
                                    {user.isAdmin ? (
                                        <>
                                            {isAdmin ? (
                                                <div> Results Management</div>
                                            ) : (
                                                <div className='text-uppercase'> lottery results </div>
                                            ) }
                                        </>
                                    ) : (
                                        <div className='text-uppercase'> lottery results </div>
                                    )}
                                </>
                            ) : (
                                <div className='text-uppercase'> lottery results </div>
                            )}
                            <hr />
                        </div>
                    </title>

                    {/* later : dropdown => "pick the game" => custom showing details */}

                    <div
                        className="m-3 d-flex justify-content-between flex-wrap"
                        style={{ gap: '1rem' }}
                    >
                        {user && user.isAdmin && isAdmin && (
                            <Button
                                className="me-5 px-3 fs-6"
                                color="primary"
                                onClick={() => dispatch(toggleModalAdd())}
                            >
                                + New result
                            </Button>
                        )}
                        <Search placeholder='Type date ...' color="primary" handleSearch={handleSearch} />
                        {/* later :  search by date OR and AND game */}
                    </div>


                    {isResultsLoading && (
                        <Loader color="primary" />
                    )}

                    {results.length <= 0 && !isResultsLoading ? (
                        <p style={{ textAlign: 'center' }}> Not found result </p>
                    ) : null}

                    {!isResultsLoading && resultsSearch && searchedResults.length > 0 && (
                        <>
                            <UncontrolledAccordion
                                defaultOpen="0"
                                stayOpen
                                className="m-5 text-center"
                            >
                                {searchedResults.map((result, index) => (
                                    <AccordionItem
                                        key={result._id}
                                        className="col-12 mt-3"
                                    >
                                        <AccordionHeader targetId={result._id}  >
                                            <div className="d-flex flex-wrap justify-content-between w-100 px-5">
                                                <p className="fs-5"> Date : {result.date}</p>
                                                {user && user.isAdmin && isAdmin && (
                                                    <Button
                                                        className="px-3"
                                                        color="dark"
                                                        onClick={() => handleUpdate(result._id)}
                                                    >
                                                        Update
                                                    </Button>
                                                )}
                                            </div>
                                        </AccordionHeader>

                                        <AccordionBody accordionId={result._id}>
                                            <ResultDetail result={result} color="light" />
                                        </AccordionBody>
                                    </AccordionItem>
                                ))
                                }
                            </UncontrolledAccordion>
                            <p className="mx-md-5">Total <mark style={{ background: '#bcecf6' }}>{searchedResults.length}</mark> result(s) found</p>
                        </>
                    )}

                    {!resultsSearch && !isResultsLoading &&
                        <>
                            <UncontrolledAccordion
                                defaultOpen="0"
                                stayOpen
                                className="m-md-5 text-center"
                            >
                                {paginatedResults.map((result, index) => (
                                    <AccordionItem
                                        key={result._id}
                                        className="col-12 mt-3"
                                    >
                                        <AccordionHeader targetId={result._id} >
                                            <div className="d-flex flex-wrap justify-content-between align-items-center w-100 px-5 ">
                                                <p className="fs-5"> Date : {result.date}</p>

                                            </div>
                                        </AccordionHeader>

                                        <AccordionBody accordionId={result._id}>
                                            <ResultDetail result={result} color="light" />
                                            <div className="d-flex flex-wrap justify-content-end align-items-center w-100 px-5 ">
                                                {user && user.isAdmin && isAdmin && (
                                                    <Button
                                                        className="px-3"
                                                        color="primary"
                                                        onClick={() => handleUpdate(result._id)}
                                                    >
                                                        Update
                                                    </Button>
                                                )}
                                            </div>
                                        </AccordionBody>
                                    </AccordionItem>
                                ))}
                            </UncontrolledAccordion>

                            <p className="mx-md-5">Total <mark style={{ background: '#bcecf6' }}>{results.length}</mark> results found</p>
                            <p className="mx-md-5">Page : {currentPage}</p>

                            <Paginator
                                handlePrevious={handlePrevious}
                                handleNext={handleNext}
                                currentPage={currentPage}
                                lastPage={lastPage}
                            />
                        </>
                    }

                    {!isResultsLoading && resultsSearch && searchedResults.length <= 0 && (
                        <p style={{ textAlign: 'center' }}> Not found result </p>
                    )}
                </>
            )}

        </div>
    )

}

export default Results