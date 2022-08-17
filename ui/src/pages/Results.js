
import { useEffect } from 'react';
import { UncontrolledAccordion, Spinner, Button, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllResults, toggleModalAdd, setResult, toggleModalUpdate } from '../flux/slices/resultsSlice';
import { Search } from '../components/Search';
import { ResultForm } from '../components/Result/Form';
import { ResultDetail } from '../components/Result/Detail';
import Paginator from '../components/Paginator';
import Messenger from '../components/Messenger';


const Results = () => {

    const dispatch = useDispatch()

    const { token, user, isAuthLoading } = useSelector(state => state.auth)

    const { results, paginatedResults, searchedResults,
        currentPage, searchText, isResultsLoading
    } = useSelector(state => state.results)


    const handleUpdate = resultId => {
        const updatingResult = results.find(result => {
            return result._id === resultId
        })

        dispatch(toggleModalUpdate())
        dispatch(setResult(updatingResult))

    }


    useEffect(() => {
        dispatch(fetchAllResults({
            currentPage: currentPage,
            searchText: searchText,
            token: token
        }))
    }, [currentPage, searchText, token, dispatch])


    return (
        <div className="container pt-5 mw-100">
            <Messenger />
            <ResultForm />
            {isAuthLoading ? (
                <div className="m-3 d-flex justify-content-center" >
                    <Spinner
                        className="m-3"
                        color="primary"
                    >
                        Loading...
                    </Spinner>
                </div>
            ) : (
                <>

                    <title className="row">
                        <div className="col-12 text-center text-primary fs-1 fw-bolder">
                            {user && user.isAdmin ? (
                                <div> Results Management</div>
                            ) : (
                                <div className='text-uppercase'> lottery results </div>
                            )}
                            <hr />
                        </div>
                    </title>

                    <div
                        className="m-3 d-flex justify-content-between flex-wrap"
                        style={{ gap: '1rem' }}
                    >
                        {user && user.isAdmin && (
                            <Button
                                className="me-5 px-3 fs-6"
                                color="primary"
                                onClick={() => dispatch(toggleModalAdd())}
                            >
                                + New result
                            </Button>
                        )}
                        <Search placeholder='Type date ...' color="primary" />
                        {/* later :  search by date OR and AND game */}
                    </div>


                    {isResultsLoading && (
                        <div className="m-3 d-flex justify-content-center" >
                            <Spinner
                                className="m-3"
                                color="primary"
                            >
                                Loading...
                            </Spinner>
                        </div>
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
                                                {user && user.isAdmin && (
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
                            <p className="mx-5">Total <mark style={{ background: '#bcecf6' }}>{searchedResults.length}</mark> result(s) found</p>
                        </>
                    )}

                    {!searchText && !isResultsLoading &&
                        <>
                            <UncontrolledAccordion
                                defaultOpen="0"
                                stayOpen
                                className="m-5 text-center"
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
                                                {user && user.isAdmin && (
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
                            <p className="mx-5">Total <mark style={{ background: '#bcecf6' }}>{results.length}</mark> results found</p>
                            <p className="mx-5">Page : {currentPage}</p>
                            <Paginator />
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

export default Results