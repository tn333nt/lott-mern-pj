
import { useEffect, useState } from 'react';
import { Alert, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { ResultDetail } from './Detail';
import { fetchAllResults } from '../../flux/slices/resultsSlice';

const CheckedResult = () => {

    const dispatch = useDispatch()

    const results = useSelector(state => state.results.results)
    const pickedResult = useSelector(state => state.results.pickedResult)
    console.log(results, 'results')
    console.log(pickedResult, 'pickedResult')
    console.log(pickedResult.date, 'pickedResult.date')

    const error = useSelector(state => state.tickets.error)
    const message = useSelector(state => state.tickets.message)

    console.log(results.length, 'results.length')

    return (
        <>
            <div style={{ marginRight: 21 }}>
                <h1 className="text-center fs-1 fw-bolder" style={{ color: '#084298' }}>
                    {pickedResult.date !== '' ? `result of ${pickedResult.date}` : 'latest result'}
                </h1>
                {error !== '' && <Alert color="danger">{error}</Alert>}
                {message !== '' && <Alert color="success">{message}</Alert>}
            </div>
            <div style={{ marginRight: 21 }}>
                {/* vi initial state of date is '' */}
                {pickedResult && pickedResult.date !== '' && (
                    <ResultDetail result={pickedResult} text="dark" />
                )}

                {pickedResult.date === '' && results.length > 0 && (
                    <>
                        <p>{results[0].date}</p>
                        <ResultDetail result={results[0]} text="dark" />
                    </>
                )}

                {results.length < 0 && pickedResult.date === '' && (
                    <div className="m-3 d-flex justify-content-center" >
                        <Spinner
                            className="m-3"
                            color="secondary"
                        >
                            Loading...
                        </Spinner>
                    </div>
                )}
            </div>
            <p>see all results <Link to="/results">results</Link></p>
        </ >
    )

}

export default CheckedResult