
import { Alert } from 'reactstrap'
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { ResultDetail } from './Detail';
import Loader from './../Loader';

const CheckedResult = () => {

    const {results, pickedResult} = useSelector(state => state.results)
    const {error, failText, successText} = useSelector(state => state.tickets)

    console.log(successText, 'successText')

    return (
        <>
            <div style={{ marginRight: 21 }}>
                <h1 className="text-center fs-1 fw-bolder" style={{ color: '#084298' }}>
                    {!error && pickedResult.date !== '' && `Result of ${pickedResult.date}`}
                    {error && pickedResult.date !== '' && `Result of ${pickedResult.date}`}
                    {pickedResult.date === '' && results.length > 0 && `Latest result (${results[0].date})`}
                </h1>
                {error !== '' && <Alert color="danger">{error}</Alert>}
                {failText !== '' && <Alert color="warning">{failText}</Alert>}
                {successText !== '' && <Alert color="success">{successText}</Alert>}
            </div>
            <div style={{ marginRight: 21 }}>
                {/* vi initial state of date is '' */}
                {!error && pickedResult && pickedResult.date !== '' && (
                    <ResultDetail result={pickedResult} text="dark" />
                )}

                {!error && pickedResult.date === '' && results.length > 0 && (
                    <ResultDetail result={results[0]} text="dark" />
                )}

                {results.length < 0 && pickedResult.date === '' && (
                    <Loader color="successText" />
                )}
            </div>
            <p>See all results <Link to="/results">results</Link></p>
        </ >
    )

}

export default CheckedResult