
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

    const isAuth = useSelector(state => state.auth.isAuth)

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

            {isAuth ? (
                <section>
                    <HistoryCheck />
                </section>
            ) : (
            <h3 className="text-center text-danger fs-1 fw-bolder my-5">
                login to save your checking history
            </h3>
            )}


        </div >
    )

}

export default Home