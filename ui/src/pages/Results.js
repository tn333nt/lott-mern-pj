
import { useEffect } from 'react';
import { UncontrolledAccordion, Spinner, Button, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllResults, toggleModalAdd, toggleModalMessage } from '../flux/resultsSlice';
import { Search } from '../components/Result/Search';
import { ResultForm } from '../components/Result/Form';
import { ResultDetail } from '../components/Result/Detail';
import Paginator from './../components/Paginator';
import Messenger from '../components/Messenger';
import '../index.css'

const Results = () => {

    const dispatch = useDispatch()

    const results = useSelector(state => state.results.results)
    const currentPage = useSelector(state => state.results.currentPage)

    const searchText = useSelector(state => state.results.searchText)

    const isLoading = useSelector(state => state.results.isLoading)

    const paginatedResults = useSelector(state => state.results.paginatedResults)
    const searchedResults = useSelector(state => state.results.searchedResults)

    const handleDeleteAll = () => {
        dispatch(toggleModalMessage("delete all results ?"))
    }

    useEffect(() => {
        dispatch(fetchAllResults({
            currentPage: currentPage,
            searchText: searchText
        }))
    }, [currentPage, searchText, dispatch])


    return (
        <div classdate="container pt-4 mw-100">
            <Messenger />
            <ResultForm />
            <title className="row">
                <div className="col-12 text-center text-secondary fs-1 fw-bolder mt-5">
                    <div> lottery results management</div>
                    <hr />
                </div>
            </title>

            <div
                className="m-3 d-flex justify-content-between flex-wrap"
                style={{ gap: '1rem' }}
            >
                <Button
                    className="me-5 px-3 "
                    onClick={() => dispatch(toggleModalAdd())}
                >
                    + add new result
                </Button>
                <Search placeholder='type date/game' />
                {/* later :  search by date OR and AND game */}
            </div>

            <Button
                className="mx-3 px-3"
                onClick={handleDeleteAll}
            >
                delete all results
            </Button>

            {isLoading && (
                <div className="m-3 d-flex justify-content-center" >
                    <Spinner
                        className="m-3"
                        color="secondary"
                    >
                        Loading...
                    </Spinner>
                </div>
            )}

            {results.length <= 0 && !isLoading ? (
                <p style={{ textAlign: 'center' }}> not found result </p>
            ) : null}

            {!isLoading && searchText && searchedResults.length > 0 && (
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
                                        <div >date :  <strong>{result.date}</strong></div>
                                        <div >game :  <strong>{result.game}</strong></div>
                                    </div>
                                </AccordionHeader>

                                <AccordionBody accordionId={result._id}>
                                    <ResultDetail result={result} />
                                </AccordionBody>
                            </AccordionItem>
                        ))
                        }
                    </UncontrolledAccordion>
                </>
            )}

            {!searchText && !isLoading &&
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
                                    <div className="d-flex flex-wrap justify-content-between w-100 px-5">
                                        <div >date :  <strong>{result.date}</strong></div>
                                        <div >game :  <strong>{result.game}</strong></div>
                                    </div>
                                </AccordionHeader>

                                <AccordionBody accordionId={result._id}>
                                    <ResultDetail result={result} />
                                </AccordionBody>
                            </AccordionItem>
                        ))}
                    </UncontrolledAccordion>
                    <Paginator />
                </>
            }

            {!isLoading && searchText && searchedResults.length <= 0 && (
                <p style={{ textAlign: 'center' }}> not found result </p>
            )}

        </div>
    )

}

export default Results