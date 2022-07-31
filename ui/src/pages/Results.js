
import { useState } from 'react';
import dateFormat from 'dateformat'
import { UncontrolledAccordion, Spinner, Button, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

// import { results } from '../util/data'
import { setSearchText, toggleModalAdd } from '../flux/resultsSlice';
import { Search } from '../components/Search';
import { ResultForm } from '../components/Result/Form';
import { ResultDetail } from '../components/Result/Detail';
import Paginator from './../components/Paginator';
import ErrorHandler from './../components/ErrorHandler';

const Results = () => {

    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.results.isLoading)
    const error = useSelector(state => state.results.error)

    const results = useSelector(state => state.results.results)
    const searchText = useSelector(state => state.results.searchText)

    const searchedResults = results.filter(result => { // filter data include searchText
        if (searchText === '') { // no search text => return all results
            return result;
        } else {
            const date = result.date.includes(searchText)
            const game = result.game.includes(searchText.trim())
            return date || game
        }
    })

    const handleSearch = () => {
        searchText && dispatch(setSearchText(searchText))
    }

    return (
        <div classdate="container pt-4 mw-100">
            <ErrorHandler />
            <ResultForm />
            <title className="row">
                <div className="col-12 text-center text-primary fs-1 fw-bolder m-3">
                    <div>result management</div>
                    <hr />
                </div>
            </title>

            <div
                className="m-3 mb-5 d-flex justify-content-between flex-wrap"
                style={{ gap: '1rem' }}
            >
                <Button
                    className="me-5 px-3 "
                    onClick={() => dispatch(toggleModalAdd())}
                >
                    + add new result
                </Button>
                <Search placeholder='type date/game' handleSearch={handleSearch} />
                {/* later :  search by date OR and AND game */}
            </div>

            {isLoading && (
                <Spinner
                    className="m-3 text-center"
                    color="secondary"
                >
                    Loading...
                </Spinner>
            )}

            {results.length <= 0 && !isLoading ? (
                <p style={{ textAlign: 'center' }}> not found result </p>
            ) : null}

            {!isLoading && (
                <>
                    <UncontrolledAccordion
                        defaultOpen="0"
                        stayOpen
                        className="m-5 text-center"
                    >
                        {searchedResults ?
                            searchedResults.map((result, index) => (
                                <AccordionItem
                                    key={result._id.toString()}
                                    className="col-12 mt-3"
                                >
                                    <AccordionHeader targetId={result._id.toString()} >
                                        <div className="d-flex justify-content-between w-100 px-5">
                                            <div >date :  <strong>{dateFormat(result.date, "dd - mm - yyyy")}</strong></div>
                                            <div >game :  <strong>{result.game}</strong></div>
                                        </div>
                                    </AccordionHeader>

                                    <AccordionBody accordionId={result._id.toString()}>
                                        <ResultDetail result={result} />
                                    </AccordionBody>
                                </AccordionItem>
                            )) : (
                                results.map((result, index) => (
                                    <AccordionItem
                                        key={result._id.toString()}
                                        className="col-12 mt-3"
                                    >
                                        <AccordionHeader targetId={result._id.toString()} >
                                            <div className="d-flex justify-content-between w-100 px-5">
                                                <div >date :  <strong>{dateFormat(result.date, "dd - mm - yyyy")}</strong></div>
                                                <div >game :  <strong>{result.game}</strong></div>
                                            </div>
                                        </AccordionHeader>

                                        <AccordionBody accordionId={result._id.toString()}>
                                            <ResultDetail result={result} />
                                        </AccordionBody>
                                    </AccordionItem>
                                ))
                            )}
                    </UncontrolledAccordion>
                    <Paginator />
                </>
            )}

            {!isLoading && searchText && searchedResults !== [] && (
                <p style={{ textAlign: 'center' }}> not found result </p>
            )}
        </div>
    )

}

export default Results