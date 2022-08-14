
import { Alert, Spinner } from 'reactstrap'
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { ResultDetail } from './Detail';

const CheckedResult = () => {

    const results = useSelector(state => state.results.results)
    const pickedResult = useSelector(state => state.results.pickedResult)

    const error = useSelector(state => state.tickets.error)
    const message = useSelector(state => state.tickets.message)
    const success = useSelector(state => state.tickets.success)

    return (
        <>
            <div style={{ marginRight: 21 }}>
                <h1 className="text-center fs-1 fw-bolder" style={{ color: '#084298' }}>
                    {!error && pickedResult.date !== '' && `Result of ${pickedResult.date}`}
                    {error && pickedResult.date !== '' && `Result of ${pickedResult.date}`}
                    {pickedResult.date === '' && results.length > 0 && `Latest result (${results[0].date})`}
                </h1>
                {error !== '' && <Alert color="danger">{error}</Alert>}
                {message !== '' && <Alert color="warning">{message}</Alert>}
                {success !== '' && <Alert color="success">{success}</Alert>}
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
            <p>See all results <Link to="/results">results</Link></p>
        </ >
    )

}

export default CheckedResult