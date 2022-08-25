
import { Alert } from 'reactstrap'
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { ResultDetail } from './Detail';
import Loader from './../Loader';

const CheckedResult = () => {

    const {results, pickedResult} = useSelector(state => state.results)
    const {message, failText, successText} = useSelector(state => state.tickets)

    return (
        <>
            <div style={{ marginRight: 21 }}>
                <h1 className="text-center fs-1 fw-bolder" style={{ color: '#084298' }}>
                    {!message && pickedResult.date !== '' && `Result of ${pickedResult.date}`}
                    {message && pickedResult.date !== '' && `Result of ${pickedResult.date}`}
                    {pickedResult.date === '' && results.length > 0 && `Latest result (${results[0].date})`}
                </h1>
                {message !== '' && <Alert color="danger">{message}</Alert>}
                {failText !== '' && <Alert color="warning">{failText}</Alert>}
                {successText !== '' && <Alert color="success">{successText}</Alert>}
            </div>
            <div style={{ marginRight: 21 }}>
                {/* vi initial state of date is '' */}
                {!message && pickedResult && pickedResult.date !== '' && (
                    <ResultDetail result={pickedResult} text="dark" />
                )}

                {!message && pickedResult.date === '' && results.length > 0 && (
                    <ResultDetail result={results[0]} text="dark" />
                )}

                {results.length < 0 && pickedResult.date === '' && (
                    <Loader color="success" />
                )}
            </div>
            <p>See all results <Link to="/results">results</Link></p>
        </ >
    )

}

export default CheckedResult