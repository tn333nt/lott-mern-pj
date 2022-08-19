
import { Col, Row } from 'reactstrap'
import { useSelector } from 'react-redux';

import CheckTicket from '../../components/Ticket/Checking';
import HistoryCheck from '../../components/Ticket/History';
import CheckedResult from '../../components/Result/Checked';
import MessageHandler from '../../components/Handler/Message'
import ConfirmHandler from '../../components/Handler/Confirm'

const Home = () => {

    const isAuth = useSelector(state => state.auth.isAuth)

    const {confirm} = useSelector(state => state.tickets)
    const {message} = useSelector(state => state.users)

    return (
        <div className="container pt-5 mw-100">
            {message !== '' && <MessageHandler message={message} />}
            {confirm !== '' && <ConfirmHandler confirm={confirm} />}

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
                    Login to save your checking history
                </h3>
            )}


        </div >
    )

}

export default Home