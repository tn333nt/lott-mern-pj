
import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';

import Messenger from '../../components/Messenger';
import CheckTicket from '../../components/Ticket/Checking';
import HistoryCheck from '../../components/Ticket/History';
import CheckedResult from '../../components/Result/Checked';
import { fetchAllResults } from '../../flux/slices/resultsSlice';
import { fetchAllUsers } from '../../flux/slices/usersSlice';

const Home = () => {

    // why can't i fetch it in here but can in <Results/> ???
    // lol thieu data
    // sao cu bat truyen cP : null moi dc vay ?
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllResults())
        dispatch(fetchAllUsers())
    }, [dispatch])
    // later : set specific result to fetch

    return (
        <div className="container pt-5 mw-100">
            <Messenger />

            <section>
                <Row>
                    <Col xs="12" md="6" className="d-flex justify-content-center">
                        <CheckTicket />
                    </Col>
                    <Col xs="12" md="6" className="d-flex flex-column align-content-stretch">
                        <CheckedResult />
                    </Col>
                </Row>
            </section>

            <hr className="mt-5" />

            <section>
                <HistoryCheck />
            </section>

        </div >
    )

}

export default Home