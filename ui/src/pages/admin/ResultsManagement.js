
import { useEffect } from 'react';
import { UncontrolledAccordion, Button, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { setPickedResult, toggleModalAdd, toggleModalUpdate } from '../../flux/slices/resultsSlice';
import { 
    clearCurrentPage, clearSearchText, 
    fetchNextPage, fetchPreviousPage, 
    setMessage, setSearchText 
} from '../../flux/slices/sharedSlice';
import MessageHandler from './../../components/Handler/Message';
import ConfirmHandler from './../../components/Handler/Confirm';
import { ResultForm } from './../../components/Result/Form';
import Loader from './../../components/Loader';
import { Search } from './../../components/Search';
import { ResultDetail } from './../../components/Result/Detail';
import Paginator from './../../components/Paginator';


const ResultsManagement = () => {
    const dispatch = useDispatch()

    const { isAuthLoading } = useSelector(state => state.auth)
    const {
        results, isResultsLoading,
        paginatedResults, searchedResults,
    } = useSelector(state => state.results)

    const { searchText, currentPage, message, confirm } = useSelector(state => state.shared)
    const totalResults = results.length
    const lastPage = Math.ceil(totalResults / 9)

    const handleSearch = () => {
        dispatch(setSearchText(searchText))
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
        dispatch(clearSearchText())
        dispatch(clearCurrentPage())
    }, [dispatch])

    useEffect(() => {
        dispatch(setMessage(message))
    }, [dispatch, message])


    return (
        <div className="container pt-5 mw-100">
            {message!=='' && <MessageHandler message={message}/>}
            {confirm!=='' && <ConfirmHandler confirm={confirm}/>}

            <ResultForm />
            
            {isAuthLoading ? (
                <Loader color="primary" />
            ) : (
                <>

                    <title className="row">
                        <div className="col-12 text-center text-primary fs-1 fw-bolder">
                            <div> Results Management</div>
                            <hr />
                        </div>
                    </title>

                    {/* later : dropdown => "pick the game" => custom showing details */}

                    <div
                        className="m-3 d-flex justify-content-between flex-wrap"
                        style={{ gap: '1rem' }}
                    >
                        <Button
                            className="me-5 px-3 fs-6"
                            color="primary"
                            onClick={() => dispatch(toggleModalAdd())}
                        >
                            + New result
                        </Button>
                        <Search
                            placeholder='Type date ...'
                            color="primary"
                            handleSearch={handleSearch}
                            searchText={searchText}
                        />
                    </div>


                    {isResultsLoading && (
                        <Loader color="primary" />
                    )}

                    {results.length <= 0 && !isResultsLoading ? (
                        <p style={{ textAlign: 'center' }}> Not found result </p>
                    ) : null}

                    {!isResultsLoading && searchText && searchedResults.length > 0 && (
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
                                                <Button
                                                    className="px-3"
                                                    color="dark"
                                                    onClick={() => handleUpdate(result._id)}
                                                >
                                                    Update
                                                </Button>
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

                    {!searchText && !isResultsLoading &&
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
                                                <Button
                                                    className="px-3"
                                                    color="primary"
                                                    onClick={() => handleUpdate(result._id)}
                                                >
                                                    Update
                                                </Button>
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

                    {!isResultsLoading && searchText && searchedResults.length <= 0 && (
                        <p style={{ textAlign: 'center' }}> Not found result </p>
                    )}
                </>
            )}

        </div>
    )

}

export default ResultsManagement